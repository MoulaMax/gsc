<?php
/* ============================================================
   GSC COPRONET — Exemple de configuration locale d'envoi
   ------------------------------------------------------------
   1. COPIEZ ce fichier en "contact.config.local.php"
      (le vrai fichier n'est PAS versionné : vos identifiants
       restent sur votre machine, jamais sur GitHub).
   2. Renseignez vos identifiants SMTP ci-dessous.
   3. Lancez le site en local (voir README) et testez le
      formulaire de devis.

   ➜ Repère du serveur SMTP selon le fournisseur de VOTRE boîte
     a.arnaud@gsc-copronet.com (à confirmer auprès de l'hébergeur) :

       OVH        : ssl0.ovh.net        port 587 (tls)  ou 465 (ssl)
       Gandi      : mail.gandi.net      port 587 (tls)
       IONOS      : smtp.ionos.fr       port 587 (tls)  ou 465 (ssl)
       Hostinger  : smtp.hostinger.com  port 465 (ssl)
       o2switch   : (votre serveur cPanel) port 465 (ssl)
       Gmail/Workspace : smtp.gmail.com  port 587 (tls)  — mot de passe d'application requis
       Microsoft 365   : smtp.office365.com port 587 (tls)

   ============================================================ */

return [
    // Active l'envoi par SMTP authentifié (au lieu de la fonction mail())
    'transport' => 'smtp',

    // Affiche le détail d'une erreur SMTP dans la réponse (pratique en test).
    // À repasser à false en production.
    'debug' => true,

    'smtp' => [
        'host'   => 'ssl0.ovh.net',                 // ⬅️ serveur d'envoi de votre messagerie
        'port'   => 587,                            // 587 (tls) ou 465 (ssl)
        'secure' => 'tls',                          // 'tls' pour 587, 'ssl' pour 465
        'user'   => 'a.arnaud@gsc-copronet.com',    // = votre adresse complète
        'pass'   => 'VOTRE_MOT_DE_PASSE_ICI',       // ⬅️ mot de passe de la boîte mail
    ],

    // (facultatif) forcer le destinataire des tests :
    // 'recipient' => 'a.arnaud@gsc-copronet.com',
];
