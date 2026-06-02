<?php
/* ============================================================
   GSC COPRONET — Traitement du formulaire de devis
   ------------------------------------------------------------
   Reçoit les demandes envoyées depuis index.html (multipart,
   photos jointes possibles) et les transmet par e-mail.

   Deux modes d'envoi (clé 'transport') :
     - 'mail' : fonction PHP mail() — pour un hébergement mutualisé
                (OVH, o2switch, Ionos…) où le serveur mail est branché.
     - 'smtp' : envoi SMTP authentifié — pour tester en local, ou
                pour un hébergeur sans mail() / exigeant un relais SMTP.

   Les identifiants SMTP ne sont PAS dans ce fichier : créez un
   fichier "contact.config.local.php" (non versionné) à partir de
   "contact.config.local.example.php". Voir ce dernier pour les détails.

   Aucune dépendance externe (client SMTP intégré, pur PHP).
   ============================================================ */

declare(strict_types=1);

/* ---------- Compatibilité (installs PHP minimales) ---------- */
// Polyfill pour PHP < 8.0
if (!function_exists('str_contains')) {
    function str_contains(string $haystack, string $needle): bool {
        return $needle === '' || strpos($haystack, $needle) !== false;
    }
}
// Troncature UTF-8 sûre, même si l'extension mbstring est absente
function gsc_truncate(string $value, int $max): string {
    return function_exists('mb_substr') ? mb_substr($value, 0, $max) : substr($value, 0, $max);
}

$config = [
    // Destinataire des demandes
    'recipient' => 'a.arnaud@gsc-copronet.com',

    // Expéditeur technique (mode 'mail'). DOIT appartenir au domaine.
    'from_email' => 'no-reply@gsc-copronet.com',
    'from_name'  => 'Formulaire GSC Copronet',

    'subject_prefix' => '[Site] Demande de devis',

    // Transport : 'mail' (hébergeur) ou 'smtp' (test local / SMTP authentifié)
    'transport' => 'mail',
    // Affiche le détail technique d'une erreur d'envoi dans la réponse
    'debug'     => false,
    // Paramètres SMTP (remplis via contact.config.local.php)
    'smtp' => [
        'host'   => '',
        'port'   => 587,
        'secure' => 'tls', // 'tls' (587), 'ssl' (465) ou 'none'
        'user'   => '',
        'pass'   => '',
    ],

    // Limites pour les pièces jointes
    'max_files'        => 6,
    'max_file_bytes'   => 5 * 1024 * 1024,   // 5 Mo par photo
    'max_total_bytes'  => 20 * 1024 * 1024,  // 20 Mo au total
    'allowed_mime'     => ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'],

    // Page de remerciement (repli sans JavaScript)
    'success_url' => 'merci.html',
];

// Surcharge locale (identifiants SMTP) — fichier non versionné s'il existe
$localConfigFile = __DIR__ . '/contact.config.local.php';
if (is_file($localConfigFile)) {
    $override = require $localConfigFile;
    if (is_array($override)) {
        if (isset($override['smtp']) && is_array($override['smtp'])) {
            $override['smtp'] = array_merge($config['smtp'], $override['smtp']);
        }
        $config = array_merge($config, $override);
    }
}

// Libellés humains pour les valeurs de <select>
$serviceLabels = [
    'remise-en-etat'         => 'Remise en état / fin de chantier',
    'nettoyage-medical'      => 'Nettoyage médical',
    'nettoyage-industriel'   => 'Nettoyage industriel',
    'nettoyage-alimentaire'  => 'Nettoyage alimentaire / HACCP',
    'vitrerie-hauteur'       => 'Vitrerie en hauteur',
    'traitement-sols'        => 'Traitement / rénovation des sols',
    'entretien-copropriete'  => 'Entretien de copropriété',
    'nettoyage-bureaux'      => 'Nettoyage bureaux / tertiaire',
    'nettoyage-commerces'    => 'Nettoyage commerces',
    'nettoyage-parkings'     => 'Nettoyage de parkings',
    'multiservices'          => 'Multiservices / maintenance',
    'autre'                  => 'Autre',
];

/* ---------- Détection du type de réponse attendu ---------- */
$wantsJson = (
    (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower((string) $_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest')
    || (isset($_SERVER['HTTP_ACCEPT']) && str_contains((string) $_SERVER['HTTP_ACCEPT'], 'application/json'))
);

/**
 * Renvoie la réponse adaptée puis stoppe.
 */
function respond(bool $ok, string $message, array $config, bool $wantsJson, array $errors = [])
{
    if ($wantsJson) {
        header('Content-Type: application/json; charset=utf-8');
        http_response_code($ok ? 200 : 422);
        echo json_encode(
            ['ok' => $ok, 'message' => $message, 'errors' => $errors],
            JSON_UNESCAPED_UNICODE
        );
    } elseif ($ok) {
        header('Location: ' . $config['success_url']);
    } else {
        http_response_code(422);
        header('Content-Type: text/html; charset=utf-8');
        echo '<!doctype html><html lang="fr"><meta charset="utf-8">'
           . '<meta name="viewport" content="width=device-width, initial-scale=1">'
           . '<title>Demande non envoyée</title>'
           . '<body style="font-family:system-ui,sans-serif;max-width:38rem;margin:4rem auto;padding:0 1.25rem;color:#0E1A15;line-height:1.6">'
           . '<h1 style="font-size:1.4rem">Votre demande n\'a pas pu être envoyée</h1>'
           . '<p>' . htmlspecialchars($message, ENT_QUOTES, 'UTF-8') . '</p>';
        foreach ($errors as $field => $err) {
            echo '<p><strong>' . htmlspecialchars((string) $field, ENT_QUOTES, 'UTF-8') . '</strong> : '
               . htmlspecialchars((string) $err, ENT_QUOTES, 'UTF-8') . '</p>';
        }
        echo '<p><a href="index.html#devis" style="color:#2F6E54">‹ Revenir au formulaire</a></p>'
           . '</body></html>';
    }
    exit;
}

/**
 * Envoi via SMTP authentifié (client minimal, sans dépendance).
 * $rawMessage doit contenir les en-têtes + une ligne vide + le corps.
 */
function sendViaSmtp(string $to, string $rawMessage, string $envelopeFrom, array $smtp, ?string &$error = null): bool
{
    $host   = (string) ($smtp['host'] ?? '');
    $port   = (int) ($smtp['port'] ?? 587);
    $secure = (string) ($smtp['secure'] ?? 'tls');

    if ($host === '' || ($smtp['user'] ?? '') === '') {
        $error = 'Configuration SMTP incomplète (host / user).';
        return false;
    }

    $target = ($secure === 'ssl') ? "ssl://{$host}:{$port}" : "tcp://{$host}:{$port}";
    $ctx = stream_context_create(['ssl' => ['verify_peer' => true, 'verify_peer_name' => true, 'SNI_enabled' => true]]);

    $fp = @stream_socket_client($target, $errno, $errstr, 15, STREAM_CLIENT_CONNECT, $ctx);
    if (!$fp) {
        $error = "Connexion SMTP impossible : {$errstr} ({$errno}).";
        return false;
    }
    stream_set_timeout($fp, 15);

    $read = static function () use ($fp): string {
        $data = '';
        while (($line = fgets($fp, 600)) !== false) {
            $data .= $line;
            if (strlen($line) < 4 || $line[3] !== '-') break; // dernière ligne d'une réponse multi-lignes
        }
        return $data;
    };
    $send = static function (string $cmd) use ($fp, $read): string {
        fwrite($fp, $cmd . "\r\n");
        return $read();
    };
    $expect = static function (string $resp, array $codes) use (&$error): bool {
        $code = substr(ltrim($resp), 0, 3);
        if (!in_array($code, $codes, true)) {
            $error = 'Réponse SMTP inattendue : ' . trim($resp);
            return false;
        }
        return true;
    };

    $ehlo = 'gsc-copronet.com';
    try {
        if (!$expect($read(), ['220'])) return false;
        if (!$expect($send("EHLO {$ehlo}"), ['250'])) return false;

        if ($secure === 'tls') {
            if (!$expect($send('STARTTLS'), ['220'])) return false;
            $crypto = stream_socket_enable_crypto(
                $fp, true,
                STREAM_CRYPTO_METHOD_TLS_CLIENT | STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT | STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT
            );
            if ($crypto !== true) { $error = 'Échec du chiffrement STARTTLS.'; return false; }
            if (!$expect($send("EHLO {$ehlo}"), ['250'])) return false;
        }

        if (!$expect($send('AUTH LOGIN'), ['334'])) return false;
        if (!$expect($send(base64_encode((string) $smtp['user'])), ['334'])) return false;
        if (!$expect($send(base64_encode((string) ($smtp['pass'] ?? ''))), ['235'])) return false;

        if (!$expect($send("MAIL FROM:<{$envelopeFrom}>"), ['250'])) return false;
        if (!$expect($send("RCPT TO:<{$to}>"), ['250', '251'])) return false;
        if (!$expect($send('DATA'), ['354'])) return false;

        // Point-stuffing (RFC 5321) : une ligne ne doit pas commencer par "."
        $body = preg_replace('/^\./m', '..', $rawMessage);
        fwrite($fp, $body . "\r\n.\r\n");
        if (!$expect($read(), ['250'])) return false;

        $send('QUIT');
    } finally {
        fclose($fp);
    }

    return true;
}

/* ---------- Méthode ---------- */
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    respond(false, 'Méthode non autorisée.', $config, $wantsJson);
}

/* ---------- Anti-spam : honeypot ---------- */
if (trim((string) ($_POST['website'] ?? '')) !== '') {
    respond(true, 'Merci, votre demande a bien été envoyée.', $config, $wantsJson);
}

/* ---------- Nettoyage des champs texte ---------- */
$clean = static function (string $key, int $max = 2000): string {
    $value = trim((string) ($_POST[$key] ?? ''));
    $value = str_replace("\0", '', $value);
    return gsc_truncate($value, $max);
};

$name      = $clean('name', 120);
$company   = $clean('company', 160);
$email     = $clean('email', 180);
$phone     = $clean('phone', 40);
$service   = $clean('service', 60);
$surface   = $clean('surface', 12);
$height    = $clean('height', 12);
$buildings = $clean('buildings', 12);
$city      = $clean('city', 120);
$frequency = $clean('frequency', 120);
$timeline  = $clean('timeline', 120);
$message   = $clean('message', 5000);
$consent   = isset($_POST['consent']);

/* ---------- Validation ---------- */
$errors = [];

if ($name === '') {
    $errors['name'] = 'Merci d’indiquer votre nom.';
}
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Merci d’indiquer une adresse e-mail valide.';
}
if ($service === '') {
    $errors['service'] = 'Merci de sélectionner votre besoin.';
}
if (!$consent) {
    $errors['consent'] = 'Le consentement est nécessaire pour traiter votre demande.';
}
// Protection contre l'injection d'en-têtes e-mail (CRLF)
foreach (['name' => $name, 'email' => $email, 'phone' => $phone] as $key => $value) {
    if (preg_match('/[\r\n]/', $value)) {
        $errors[$key] = 'Caractères non autorisés.';
    }
}

if ($errors) {
    respond(false, 'Certains champs doivent être corrigés.', $config, $wantsJson, $errors);
}

/* ---------- Traitement des photos jointes ---------- */
$attachments = []; // [name, mime, data]
$totalBytes  = 0;

if (!empty($_FILES['photos']) && is_array($_FILES['photos']['name'] ?? null)) {
    $files     = $_FILES['photos'];
    $fileCount = count($files['name']);

    if ($fileCount > $config['max_files']) {
        respond(false, 'Vous pouvez joindre au maximum ' . $config['max_files'] . ' photos.', $config, $wantsJson);
    }

    for ($i = 0; $i < $fileCount; $i++) {
        $err = $files['error'][$i] ?? UPLOAD_ERR_NO_FILE;

        if ($err === UPLOAD_ERR_NO_FILE) continue;
        if ($err === UPLOAD_ERR_INI_SIZE || $err === UPLOAD_ERR_FORM_SIZE) {
            respond(false, 'Une photo dépasse la taille autorisée par le serveur. Réduisez sa résolution et réessayez.', $config, $wantsJson);
        }
        if ($err !== UPLOAD_ERR_OK) {
            respond(false, 'L’envoi d’une photo a échoué (code ' . (int) $err . ').', $config, $wantsJson);
        }

        $tmp  = (string) ($files['tmp_name'][$i] ?? '');
        $size = (int) ($files['size'][$i] ?? 0);
        $orig = (string) ($files['name'][$i] ?? 'photo');

        if (!is_uploaded_file($tmp)) {
            respond(false, 'Fichier rejeté pour des raisons de sécurité.', $config, $wantsJson);
        }
        if ($size > $config['max_file_bytes']) {
            respond(false, 'Une photo dépasse ' . (int) ($config['max_file_bytes'] / 1024 / 1024) . ' Mo. Réduisez sa résolution et réessayez.', $config, $wantsJson);
        }

        $totalBytes += $size;
        if ($totalBytes > $config['max_total_bytes']) {
            respond(false, 'Le total des photos dépasse ' . (int) ($config['max_total_bytes'] / 1024 / 1024) . ' Mo. Merci d’en envoyer moins.', $config, $wantsJson);
        }

        // Validation du type : MIME réel via fileinfo si dispo, sinon repli par extension
        $ext = strtolower((string) pathinfo($orig, PATHINFO_EXTENSION));
        if (function_exists('finfo_open') && ($finfo = finfo_open(FILEINFO_MIME_TYPE))) {
            $mime = (string) finfo_file($finfo, $tmp);
            finfo_close($finfo);
            if (!in_array($mime, $config['allowed_mime'], true)) {
                respond(false, 'Seules les photos (JPEG, PNG, WEBP, HEIC) sont acceptées.', $config, $wantsJson);
            }
        } else {
            if (!in_array($ext, ['jpg', 'jpeg', 'png', 'webp', 'heic', 'heif'], true)) {
                respond(false, 'Seules les photos (JPEG, PNG, WEBP, HEIC) sont acceptées.', $config, $wantsJson);
            }
            $mime = 'application/octet-stream';
        }

        $data = file_get_contents($tmp);
        if ($data === false) {
            respond(false, 'Impossible de lire une des photos jointes.', $config, $wantsJson);
        }

        $base = preg_replace('/[^A-Za-z0-9._-]/', '_', pathinfo($orig, PATHINFO_FILENAME) ?: 'photo');
        $safeName = gsc_truncate((string) $base, 60) . ($ext !== '' ? '.' . preg_replace('/[^A-Za-z0-9]/', '', $ext) : '');

        $attachments[] = [
            'name' => $safeName,
            'mime' => $mime,
            'data' => $data,
        ];
    }
}

/* ---------- Expéditeur ---------- */
// En SMTP authentifié, l'expéditeur doit correspondre au compte authentifié
$transport = $config['transport'] ?? 'mail';
$fromEmail = $config['from_email'];
if ($transport === 'smtp' && !empty($config['smtp']['user'])) {
    $fromEmail = (string) $config['smtp']['user'];
}

/* ---------- Construction de l'e-mail ---------- */
$serviceLabel = $serviceLabels[$service] ?? $service;

$lines = [
    'Nouvelle demande depuis le site GSC Copronet',
    str_repeat('-', 46),
    'Nom        : ' . $name,
    'Société    : ' . ($company !== '' ? $company : '—'),
    'E-mail     : ' . $email,
    'Téléphone  : ' . ($phone !== '' ? $phone : '—'),
    '',
    'Besoin     : ' . $serviceLabel,
];
if ($surface   !== '') $lines[] = 'Surface    : ' . $surface . ' m²';
if ($height    !== '') $lines[] = 'Hauteur    : ' . $height . ' m';
if ($buildings !== '') $lines[] = 'Bâtiments  : ' . $buildings;
if ($city      !== '') $lines[] = 'Ville      : ' . $city;
if ($frequency !== '') $lines[] = 'Fréquence  : ' . $frequency;
if ($timeline  !== '') $lines[] = 'Délai      : ' . $timeline;
$lines[] = '';
$lines[] = 'Message :';
$lines[] = $message !== '' ? $message : '(aucun message)';
$lines[] = '';
if ($attachments) {
    $lines[] = count($attachments) . ' photo(s) jointe(s).';
    $lines[] = '';
}
$lines[] = str_repeat('-', 46);
$lines[] = 'Reçu le ' . date('d/m/Y à H:i');

$body = implode("\r\n", $lines);

$subject         = $config['subject_prefix'] . ($serviceLabel !== '' ? ' — ' . $serviceLabel : '');
$encodedSubject  = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$encodedFromName = '=?UTF-8?B?' . base64_encode($config['from_name']) . '?=';

$headers = [
    'From: ' . $encodedFromName . ' <' . $fromEmail . '>',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
    'MIME-Version: 1.0',
];

if ($attachments) {
    $boundary  = '----=_GSC_' . bin2hex(random_bytes(8));
    $headers[] = 'Content-Type: multipart/mixed; boundary="' . $boundary . '"';

    $mailBody  = "--{$boundary}\r\n";
    $mailBody .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $mailBody .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $mailBody .= $body . "\r\n";

    foreach ($attachments as $att) {
        $encoded   = chunk_split(base64_encode($att['data']));
        $mailBody .= "--{$boundary}\r\n";
        $mailBody .= 'Content-Type: ' . $att['mime'] . '; name="' . $att['name'] . "\"\r\n";
        $mailBody .= "Content-Transfer-Encoding: base64\r\n";
        $mailBody .= 'Content-Disposition: attachment; filename="' . $att['name'] . "\"\r\n\r\n";
        $mailBody .= $encoded . "\r\n";
    }

    $mailBody .= "--{$boundary}--\r\n";
} else {
    $headers[] = 'Content-Type: text/plain; charset=UTF-8';
    $headers[] = 'Content-Transfer-Encoding: 8bit';
    $mailBody  = $body;
}

/* ---------- Envoi ---------- */
$smtpError = null;

if ($transport === 'smtp') {
    $raw = 'Date: ' . date('r') . "\r\n"
         . 'To: ' . $config['recipient'] . "\r\n"
         . 'Subject: ' . $encodedSubject . "\r\n"
         . implode("\r\n", $headers) . "\r\n\r\n"
         . $mailBody;
    $sent = sendViaSmtp($config['recipient'], $raw, $fromEmail, $config['smtp'] ?? [], $smtpError);
} else {
    $sent = @mail(
        $config['recipient'],
        $encodedSubject,
        $mailBody,
        implode("\r\n", $headers),
        '-f' . $fromEmail
    );
}

if ($sent) {
    respond(
        true,
        'Merci, votre demande a bien été envoyée. Nous revenons vers vous sous 48 h ouvrées.',
        $config,
        $wantsJson
    );
}

// Trace pour diagnostic dans le journal d'erreurs PHP
error_log('[GSC contact.php] Échec de l’envoi vers ' . $config['recipient'] . ($smtpError ? ' — ' . $smtpError : ''));

$failMessage = 'L’envoi a échoué. Merci de réessayer ou de nous appeler au 04 90 80 05 05.';
if (!empty($config['debug']) && $smtpError) {
    $failMessage .= ' [debug : ' . $smtpError . ']';
}

respond(false, $failMessage, $config, $wantsJson);
