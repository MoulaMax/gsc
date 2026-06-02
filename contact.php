<?php
/* ============================================================
   GSC COPRONET — Traitement du formulaire de devis
   ------------------------------------------------------------
   Reçoit les demandes envoyées depuis index.html (multipart,
   photos jointes possibles) et les transmet par e-mail à
   l'adresse définie dans $config['recipient'].

   Fonctionne sur tout hébergement supportant PHP (OVH,
   o2switch, Ionos, Hostinger…). Aucune dépendance externe.

   ➜ Avant la mise en ligne :
     1. Vérifier $config['recipient'] (destinataire).
     2. Créer un alias e-mail "no-reply@gsc-copronet.com"
        chez votre hébergeur — utilisé comme expéditeur
        technique pour éviter d'être marqué comme spam.
   ============================================================ */

declare(strict_types=1);

$config = [
    // Destinataire des demandes
    'recipient' => 'a.arnaud@gsc-copronet.com',

    // Expéditeur technique. DOIT appartenir au domaine du site
    // pour passer SPF/DKIM. Créez l'alias chez votre hébergeur.
    'from_email' => 'no-reply@gsc-copronet.com',
    'from_name'  => 'Formulaire GSC Copronet',

    // Préfixe du sujet
    'subject_prefix' => '[Site] Demande de devis',

    // Limites pour les pièces jointes
    'max_files'        => 6,
    'max_file_bytes'   => 5 * 1024 * 1024,   // 5 Mo par photo
    'max_total_bytes'  => 20 * 1024 * 1024,  // 20 Mo au total
    'allowed_mime'     => ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'],

    // Page de remerciement (repli sans JavaScript)
    'success_url' => 'merci.html',
];

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
function respond(bool $ok, string $message, array $config, bool $wantsJson, array $errors = []): never
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
            echo '<p><strong>' . htmlspecialchars($field, ENT_QUOTES, 'UTF-8') . '</strong> : '
               . htmlspecialchars($err, ENT_QUOTES, 'UTF-8') . '</p>';
        }
        echo '<p><a href="index.html#devis" style="color:#2F6E54">‹ Revenir au formulaire</a></p>'
           . '</body></html>';
    }
    exit;
}

/* ---------- Méthode ---------- */
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    respond(false, 'Méthode non autorisée.', $config, $wantsJson);
}

/* ---------- Anti-spam : honeypot ---------- */
if (trim((string) ($_POST['website'] ?? '')) !== '') {
    // Faux succès : on n'envoie rien mais on ne révèle pas le blocage
    respond(true, 'Merci, votre demande a bien été envoyée.', $config, $wantsJson);
}

/* ---------- Nettoyage des champs texte ---------- */
$clean = static function (string $key, int $max = 2000): string {
    $value = trim((string) ($_POST[$key] ?? ''));
    $value = str_replace("\0", '', $value);
    return mb_substr($value, 0, $max);
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

        // Validation du type MIME (pas juste l'extension)
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mime  = $finfo ? (string) finfo_file($finfo, $tmp) : '';
        if ($finfo) finfo_close($finfo);

        if (!in_array($mime, $config['allowed_mime'], true)) {
            respond(false, 'Seules les photos (JPEG, PNG, WEBP, HEIC) sont acceptées.', $config, $wantsJson);
        }

        $data = file_get_contents($tmp);
        if ($data === false) {
            respond(false, 'Impossible de lire une des photos jointes.', $config, $wantsJson);
        }

        // Nom sûr (alphanumérique + extension)
        $ext  = pathinfo($orig, PATHINFO_EXTENSION);
        $base = preg_replace('/[^A-Za-z0-9._-]/', '_', pathinfo($orig, PATHINFO_FILENAME) ?: 'photo');
        $safeName = mb_substr((string) $base, 0, 60) . ($ext !== '' ? '.' . preg_replace('/[^A-Za-z0-9]/', '', $ext) : '');

        $attachments[] = [
            'name' => $safeName,
            'mime' => $mime,
            'data' => $data,
        ];
    }
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

$subject        = $config['subject_prefix'] . ($serviceLabel !== '' ? ' — ' . $serviceLabel : '');
$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$encodedFromName = '=?UTF-8?B?' . base64_encode($config['from_name']) . '?=';

$headers = [
    'From: ' . $encodedFromName . ' <' . $config['from_email'] . '>',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
    'MIME-Version: 1.0',
];

if ($attachments) {
    // Mail multipart : 1 partie texte + N pièces jointes
    $boundary = '----=_GSC_' . bin2hex(random_bytes(8));
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

$sent = @mail(
    $config['recipient'],
    $encodedSubject,
    $mailBody,
    implode("\r\n", $headers),
    '-f' . $config['from_email']
);

if ($sent) {
    respond(
        true,
        'Merci, votre demande a bien été envoyée. Nous revenons vers vous sous 48 h ouvrées.',
        $config,
        $wantsJson
    );
}

respond(
    false,
    'L’envoi a échoué. Merci de réessayer ou de nous appeler au 04 90 80 05 05.',
    $config,
    $wantsJson
);
