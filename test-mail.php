<?php
/* ============================================================
   GSC COPRONET — Test d'envoi e-mail (TEMPORAIRE)
   ------------------------------------------------------------
   But : vérifier, UNE FOIS déployé sur l'hébergeur, que PHP
   parvient bien à envoyer un e-mail à l'adresse de réception.

   Utilisation :
     1. Déposez ce fichier à la racine du site sur l'hébergeur.
     2. Ouvrez https://www.gsc-copronet.com/test-mail.php
     3. Lisez le diagnostic + vérifiez la boîte de réception
        (ET le dossier indésirables / spam).
     4. SUPPRIMEZ ce fichier de l'hébergeur une fois le test fait.

   Note : aucun paramètre n'est accepté (destinataire et contenu
   sont fixes) pour éviter tout détournement.
   ============================================================ */

declare(strict_types=1);
header('Content-Type: text/html; charset=utf-8');

$recipient = 'a.arnaud@gsc-copronet.com';
$fromEmail = 'no-reply@gsc-copronet.com';
$fromName  = 'Test GSC Copronet';

$subject = '=?UTF-8?B?' . base64_encode('[TEST] Envoi depuis le site GSC Copronet') . '?=';
$body    = "Ceci est un e-mail de test envoyé depuis test-mail.php.\r\n\r\n"
         . "S'il vous parvient, l'envoi via PHP mail() fonctionne sur cet hébergeur.\r\n"
         . 'Envoyé le ' . date('d/m/Y à H:i:s') . "\r\n";

$headers = implode("\r\n", [
    'From: =?UTF-8?B?' . base64_encode($fromName) . "?= <{$fromEmail}>",
    'Reply-To: ' . $fromEmail,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: PHP/' . phpversion(),
]);

$sent = @mail($recipient, $subject, $body, $headers, '-f' . $fromEmail);

$sendmailPath = ini_get('sendmail_path') ?: '(non défini)';
$ok = $sent ? 'OUI ✅' : 'NON ❌';
$color = $sent ? '#2F6E54' : '#A33A2B';
?>
<!doctype html>
<html lang="fr">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Test e-mail — GSC Copronet</title>
<body style="font-family:system-ui,-apple-system,sans-serif;max-width:42rem;margin:3rem auto;padding:0 1.25rem;color:#0E1A15;line-height:1.6">
  <h1 style="font-size:1.5rem">Test d'envoi e-mail</h1>

  <p style="font-size:1.1rem">
    <code>mail()</code> a renvoyé&nbsp;:
    <strong style="color:<?php echo $color; ?>"><?php echo $ok; ?></strong>
  </p>

  <p>Destinataire&nbsp;: <code><?php echo htmlspecialchars($recipient); ?></code><br>
     Expéditeur&nbsp;: <code><?php echo htmlspecialchars($fromEmail); ?></code></p>

  <?php if ($sent): ?>
    <p style="background:#E4F0EA;border:1px solid #2F6E54;padding:14px 18px;border-radius:8px">
      ✅ L'envoi a été accepté par le serveur. <strong>Vérifiez maintenant la boîte de réception
      <?php echo htmlspecialchars($recipient); ?></strong> — pensez à regarder aussi le dossier
      <strong>indésirables / spam</strong>.
    </p>
  <?php else: ?>
    <p style="background:#FBEAE5;border:1px solid #A33A2B;padding:14px 18px;border-radius:8px">
      ❌ Le serveur a refusé l'envoi. Causes fréquentes sur un hébergement mutualisé&nbsp;:
    </p>
    <ul>
      <li>la fonction <code>mail()</code> est désactivée par l'hébergeur&nbsp;;</li>
      <li>l'adresse expéditrice <code><?php echo htmlspecialchars($fromEmail); ?></code>
          n'existe pas encore (créez l'alias dans votre webmail / cPanel)&nbsp;;</li>
      <li>l'hébergeur impose un relais SMTP authentifié (dans ce cas on passera par PHPMailer).</li>
    </ul>
  <?php endif; ?>

  <hr style="margin:2rem 0;border:none;border-top:1px solid #E7ECE9">
  <p style="font-size:.9rem;color:#59685F">
    Diagnostic&nbsp;: PHP <?php echo phpversion(); ?> · sendmail_path =
    <code><?php echo htmlspecialchars($sendmailPath); ?></code>
  </p>
  <p style="font-size:.9rem;color:#A33A2B"><strong>⚠️ Pensez à supprimer ce fichier
     (<code>test-mail.php</code>) de l'hébergeur une fois le test terminé.</strong></p>
</body>
</html>
