/* ============================================================
   GSC COPRONET — Contenu des pages de service
   ============================================================ */

(() => {
  'use strict';

  const services = {
    'parties-communes': {
      title: 'Nettoyage de copropriétés & parties communes',
      category: 'Copropriétés & syndics',
      image: 'assets/services/parties-communes.jpg',
      alt: 'Résidence entretenue par GSC Copronet',
      lead: 'Un entretien régulier et attentif pour préserver le confort des résidents et la valeur de votre immeuble.',
      heading: 'Des espaces communs propres, accueillants et suivis dans la durée.',
      paragraphs: [
        'GSC Copronet mobilise les moyens humains nécessaires pour assurer la continuité des prestations, quelle que soit la taille de votre résidence. Le cahier des charges est établi avec vous, selon les usages de l’immeuble et la fréquence de passage souhaitée.',
        'Au-delà du nettoyage courant, nos équipes peuvent prendre en charge les besoins complémentaires qui simplifient la vie d’une copropriété : manipulation des conteneurs, petite maintenance, relamping ou enlèvement d’encombrants.'
      ],
      items: [
        'Entretien des halls, escaliers et zones de circulation',
        'Nettoyage de la vitrerie et protection des sols',
        'Lavage et désinfection des locaux à ordures ménagères',
        'Manipulation, lavage et désinfection des conteneurs',
        'Nettoyage des surfaces de parking et enlèvement des graffitis',
        'Petite maintenance, relamping et évacuation d’encombrants'
      ],
      related: ['vitrerie', 'parkings', 'evacuation-encombrants']
    },
    'milieu-medical': {
      title: 'Nettoyage médical & bio-nettoyage',
      category: 'Santé & médico-social',
      image: 'assets/services/milieu-medical.jpg',
      alt: 'Salle d’imagerie médicale propre et entretenue',
      lead: 'Des protocoles adaptés aux environnements sensibles, avec une attention constante portée à l’hygiène et à la régularité.',
      heading: 'Une propreté maîtrisée pour vos espaces de soins.',
      paragraphs: [
        'Cabinets médicaux et infirmiers, centres d’imagerie, cliniques dentaires, laboratoires, pharmacies ou centres de santé : chaque site demande une organisation rigoureuse et des techniques adaptées.',
        'Nos équipes utilisent des fournitures d’hygiène et des produits écolabellisés lorsque cela est possible, tout en respectant les exigences propres à vos locaux.'
      ],
      items: [
        'Nettoyage régulier des locaux et du mobilier',
        'Entretien des sols et désinfection des espaces sanitaires',
        'Lavage de la vitrerie et essuyage des encadrements',
        'Mise en place des consommables d’hygiène',
        'Organisation adaptée aux contraintes de votre activité'
      ],
      related: ['bureaux-tertiaire', 'vitrerie', 'milieu-alimentaire']
    },
    'milieu-alimentaire': {
      title: 'Nettoyage alimentaire & hygiène HACCP',
      category: 'Industrie agroalimentaire',
      image: 'assets/services/milieu-alimentaire.jpg',
      alt: 'Zone de production agroalimentaire',
      lead: 'Des interventions organisées autour des exigences d’hygiène propres aux cuisines, laboratoires et zones de production.',
      heading: 'Un nettoyage précis pour les environnements alimentaires.',
      paragraphs: [
        'Les sites alimentaires nécessitent des méthodes adaptées aux surfaces, aux équipements et aux rythmes de production. Nous construisons un programme d’intervention clair, en cohérence avec vos procédures internes.',
        'Nos équipes assurent le nettoyage courant comme les opérations techniques ponctuelles, avec une attention particulière portée aux zones sensibles et aux supports fortement sollicités.'
      ],
      items: [
        'Entretien des sols et surfaces de production',
        'Dégraissage des zones techniques',
        'Nettoyage et désinfection des espaces sensibles',
        'Interventions ponctuelles ou programmées',
        'Organisation compatible avec vos contraintes d’exploitation'
      ],
      related: ['ateliers-usines', 'remise-en-etat', 'vitrerie']
    },
    'vitrerie': {
      title: 'Vitrerie professionnelle & accès difficiles',
      category: 'Propreté professionnelle',
      image: 'assets/services/vitrerie.jpg',
      alt: 'Façade vitrée d’un bâtiment professionnel',
      lead: 'Fenêtres, baies, vitrines, miroirs ou verrières : une prestation soignée, adaptée à la configuration de vos bâtiments.',
      heading: 'Des surfaces vitrées nettes, jusque dans les détails.',
      paragraphs: [
        'La vitrerie participe directement à l’image de vos locaux. GSC Copronet intervient sur les surfaces intérieures et extérieures avec les équipements adaptés à vos accès et à vos contraintes.',
        'La prestation peut être intégrée à un contrat d’entretien régulier ou planifiée ponctuellement, notamment pour les devantures commerciales, les bureaux et les parties communes.'
      ],
      items: [
        'Fenêtres, baies vitrées et miroirs',
        'Vitrines, devantures et enseignes',
        'Verrières, façades et surfaces difficiles d’accès',
        'Essuyage des encadrements',
        'Interventions régulières ou ponctuelles'
      ],
      related: ['espaces-de-vente', 'bureaux-tertiaire', 'parties-communes']
    },
    'espaces-de-vente': {
      title: 'Nettoyage commerces, boutiques & vitrines',
      category: 'Commerce & espaces de vente',
      image: 'assets/services/espaces-de-vente.jpg',
      alt: 'Autolaveuse utilisée dans un espace de vente',
      lead: 'Un environnement impeccable avant l’ouverture, du sol à la vitrine, pour accueillir vos clients dans les meilleures conditions.',
      heading: 'Valorisez votre image de marque dès le premier regard.',
      paragraphs: [
        'Boutiques, showrooms et surfaces commerciales imposent des horaires précis et une grande discrétion. Nos équipes organisent leurs interventions pour respecter votre activité et maintenir un niveau de propreté constant.',
        'Nous prenons en charge l’entretien courant comme les opérations plus techniques sur les devantures, les stores, les enseignes et les sols fortement sollicités.'
      ],
      items: [
        'Nettoyage régulier des magasins et espaces sanitaires',
        'Lavage des vitrines, baies et miroirs',
        'Nettoyage des devantures, enseignes et stores',
        'Lavage haute pression des façades et trottoirs',
        'Enlèvement des chewing-gums et graffitis'
      ],
      related: ['vitrerie', 'remise-en-etat', 'bureaux-tertiaire']
    },
    'remise-en-etat': {
      title: 'Remise en état & fin de chantier',
      category: 'Interventions ponctuelles',
      image: 'assets/services/remise-en-etat.jpg',
      alt: 'Sol remis en état par une intervention professionnelle',
      lead: 'Après des travaux, un sinistre ou une période d’inoccupation, nous préparons vos locaux pour une reprise sereine.',
      heading: 'Retrouvez des locaux propres, prêts à être utilisés.',
      paragraphs: [
        'Certaines situations demandent davantage qu’un entretien courant. Nos équipes interviennent avec du matériel professionnel pour traiter les surfaces en profondeur et restituer un espace propre, sain et accueillant.',
        'Chaque remise en état commence par une visite du site afin de choisir les techniques adaptées aux matériaux, au niveau d’encrassement et à votre calendrier.'
      ],
      items: [
        'Nettoyage de fin de chantier',
        'Remise en état avant emménagement ou restitution',
        'Décapage et traitement des sols',
        'Nettoyage approfondi des surfaces et équipements',
        'Interventions ponctuelles après sinistre'
      ],
      related: ['traitement-sols', 'vitrerie', 'ateliers-usines']
    },
    'traitement-sols': {
      title: 'Traitement & rénovation des sols',
      category: 'Interventions techniques',
      image: 'assets/services/remise-en-etat-2.jpg',
      alt: 'Rénovation technique d’un revêtement de sol',
      lead: 'Décapage, cristallisation, protection ou rénovation : nous adaptons la méthode au matériau et à l’usage de vos locaux.',
      heading: 'Redonnez à vos sols professionnels leur aspect et leur résistance.',
      paragraphs: [
        'Les sols fortement sollicités demandent une intervention précise. GSC Copronet analyse le support, son niveau d’encrassement et les contraintes d’exploitation avant de sélectionner la technique la plus adaptée.',
        'Nous intervenons sur les revêtements thermoplastiques, la pierre naturelle ou reconstituée, la terre cuite, le béton, les carreaux de ciment, les parquets et les moquettes. La prestation peut être ponctuelle ou intégrée à un programme d’entretien.'
      ],
      items: [
        'Décapage, lavage mécanisé et remise en état approfondie',
        'Cristallisation et protection des sols en pierre',
        'Rénovation de la terre cuite, du béton et des carreaux de ciment',
        'Entretien et protection des parquets',
        'Nettoyage des moquettes à sec ou par injection-extraction',
        'Visite technique et choix de la méthode adaptée au support'
      ],
      related: ['remise-en-etat', 'ateliers-usines', 'parkings']
    },
    'maintenance-immobiliere': {
      title: 'Maintenance immobilière & petits travaux',
      category: 'Multi-services',
      image: 'assets/services/maintenance-immobiliere.jpg',
      alt: 'Travaux de peinture réalisés dans un bâtiment',
      lead: 'Une équipe polyvalente pour assurer le bon fonctionnement et l’esthétique de vos bâtiments au quotidien.',
      heading: 'La petite maintenance qui simplifie la gestion de vos sites.',
      paragraphs: [
        'GSC Copronet complète l’entretien de vos locaux par une gamme de prestations de maintenance immobilière. Nos agents polyvalents interviennent avec réactivité pour les travaux courants et les besoins ponctuels.',
        'Cette approche vous permet de centraliser vos demandes auprès d’un interlocuteur unique, qui connaît vos bâtiments et suit vos priorités.'
      ],
      items: [
        'Petits travaux de peinture et finitions',
        'Relamping et remplacement d’équipements courants',
        'Menuiserie, serrurerie et réparations simples',
        'Contrôles visuels et signalement des anomalies',
        'Interventions planifiées ou à la demande'
      ],
      related: ['factotum', 'reamenagement-bureaux', 'parties-communes']
    },
    'espaces-verts': {
      title: 'Espaces verts',
      category: 'Multi-services',
      image: 'assets/services/espaces-verts.jpg',
      alt: 'Espace vert entretenu autour d’un bâtiment',
      lead: 'Un entretien régulier ou ponctuel pour garder des extérieurs nets, agréables et maîtrisés toute l’année.',
      heading: 'Des extérieurs soignés au fil des saisons.',
      paragraphs: [
        'GSC Copronet met à votre disposition une équipe formée pour l’entretien des espaces verts de vos résidences, entreprises et ensembles immobiliers.',
        'Les calendriers d’intervention sont définis avec vous pour tenir compte des saisons, de la végétation et de la fréquentation de vos extérieurs.'
      ],
      items: [
        'Tonte des pelouses',
        'Taille des arbres et des arbustes',
        'Débroussaillage et désherbage',
        'Ramassage des feuilles',
        'Arrosage des plantations',
        'Installation de clôtures'
      ],
      related: ['parties-communes', 'maintenance-immobiliere', 'evacuation-encombrants']
    },
    'manutention-transport': {
      title: 'Manutention & transport',
      category: 'Multi-services',
      image: 'assets/services/manutention-transport-propre.jpg',
      alt: 'Transport professionnel d’une charge lourde',
      lead: 'Des moyens adaptés pour déplacer mobilier, archives, équipements et charges lourdes en toute sérénité.',
      heading: 'Vos équipements déplacés avec méthode et précaution.',
      paragraphs: [
        'GSC Copronet intervient pour vos déménagements internes, transferts de bureaux et besoins de manutention ponctuels. Chaque opération est préparée selon les volumes, les accès et les contraintes du site.',
        'Nos équipes prennent également en charge le transport de charges lourdes ou encombrantes, avec une organisation adaptée à la nature des biens déplacés.'
      ],
      items: [
        'Déménagement et réaménagement de bureaux',
        'Transport de mobilier et d’objets encombrants',
        'Déplacement d’archives, documents et dossiers',
        'Transport de charges lourdes',
        'Manutention ponctuelle sur site'
      ],
      related: ['reamenagement-bureaux', 'evacuation-encombrants', 'factotum']
    },
    'evacuation-encombrants': {
      title: 'Évacuation d’encombrants',
      category: 'Multi-services',
      image: 'assets/services/evacuation-encombrants.jpg',
      alt: 'Évacuation d’encombrants par une équipe professionnelle',
      lead: 'Ramassage, tri et évacuation : une intervention claire pour libérer vos espaces sans perdre de temps.',
      heading: 'Débarrassez caves, locaux et bureaux avec un interlocuteur unique.',
      paragraphs: [
        'Nos équipes prennent en charge les encombrants de vos immeubles, locaux professionnels et espaces de stockage. L’intervention est organisée selon le volume, les accès et la nature des éléments à évacuer.',
        'Nous accordons une attention particulière au tri afin d’orienter les déchets vers les filières adaptées lorsque cela est possible.'
      ],
      items: [
        'Ramassage d’encombrants',
        'Tri sélectif des éléments évacués',
        'Débarras de caves, greniers et locaux techniques',
        'Évacuation de mobilier et matériel obsolète',
        'Acheminement vers les filières adaptées'
      ],
      related: ['manutention-transport', 'parties-communes', 'remise-en-etat']
    },
    'factotum': {
      title: 'Services factotum',
      category: 'Multi-services',
      image: 'assets/services/factotum.jpg',
      alt: 'Outils utilisés pour de petites réparations',
      lead: 'Un service polyvalent pour traiter les petits travaux qui facilitent le quotidien de vos équipes et de vos occupants.',
      heading: 'Une réponse pratique pour vos demandes courantes.',
      paragraphs: [
        'Le factotum est l’allié des sites qui veulent résoudre rapidement les petits besoins d’entretien et d’aménagement. GSC Copronet met à votre disposition des agents organisés, autonomes et polyvalents.',
        'Le service peut être mobilisé ponctuellement ou intégré à une organisation récurrente selon le volume de demandes de votre site.'
      ],
      items: [
        'Pose de tableaux, étagères et signalétique',
        'Montage et déplacement de mobilier',
        'Petites réparations courantes',
        'Remplacement d’équipements simples',
        'Interventions ponctuelles ou programmées'
      ],
      related: ['maintenance-immobiliere', 'reamenagement-bureaux', 'manutention-transport']
    },
    'courrier-coursier': {
      title: 'Courrier & coursier',
      category: 'Multi-services',
      image: 'assets/locaux-gsc.jpg',
      alt: 'Locaux de GSC Copronet à Avignon',
      lead: 'Un appui logistique de proximité pour vos plis, documents et distributions internes.',
      heading: 'Une organisation simple pour vos besoins de courrier.',
      paragraphs: [
        'Pour compléter les services assurés sur vos sites, GSC Copronet peut organiser la distribution interne et l’acheminement de vos plis selon vos contraintes.',
        'La prestation est définie avec vous afin de respecter les fréquences, les points de collecte et les règles de confidentialité nécessaires.'
      ],
      items: [
        'Distribution interne de courrier',
        'Collecte et dépôt de plis',
        'Acheminement de documents',
        'Organisation adaptée à vos circuits internes'
      ],
      related: ['factotum', 'manutention-transport', 'maintenance-immobiliere']
    },
    'bureaux-tertiaire': {
      title: 'Nettoyage de bureaux & locaux tertiaires',
      category: 'Espaces de travail',
      image: 'assets/services/bureaux-tertiaire.jpg',
      alt: 'Bureau professionnel propre et rangé',
      lead: 'Un cadre de travail soigné pour vos bureaux, sièges sociaux, établissements scolaires et infrastructures administratives.',
      heading: 'Des locaux propres pour accueillir vos équipes et vos visiteurs.',
      paragraphs: [
        'GSC Copronet s’engage dans une relation de confiance durable. La fidélisation de nos agents permet de mettre à votre disposition des compétences adaptées et une qualité de prestation régulière.',
        'Le programme d’entretien est construit selon la configuration des locaux, leur fréquentation et vos priorités : espaces de travail, sanitaires, sols, vitrerie ou opérations techniques ponctuelles.'
      ],
      items: [
        'Dépoussiérage du mobilier et entretien des sols',
        'Détartrage et désinfection des espaces sanitaires',
        'Lavage de la vitrerie',
        'Traitement et protection des sols',
        'Nettoyage des moquettes'
      ],
      related: ['vitrerie', 'milieu-medical', 'reamenagement-bureaux']
    },
    'ateliers-usines': {
      title: 'Nettoyage industriel : ateliers, usines & sols techniques',
      category: 'Industrie',
      image: 'assets/services/ateliers-usines.jpg',
      alt: 'Zone industrielle entretenue',
      lead: 'Des prestations adaptées à vos ateliers, équipements et rythmes de production.',
      heading: 'Un entretien industriel construit autour de vos contraintes.',
      paragraphs: [
        'Nous intervenons dans votre établissement en respectant les plans de prévention établis ou en collaborant avec vous pour les mettre en place.',
        'Grâce à des équipes qualifiées et à des équipements techniques adaptés, nous organisons des prestations régulières ou ponctuelles selon les exigences de votre activité.'
      ],
      items: [
        'Balayage et lavage mécanisés des sols',
        'Remise en état de sols fortement encrassés',
        'Dépoussiérage des parois, machines et structures',
        'Dégraissage des machines et chaînes de production',
        'Entretien de la vitrerie, y compris en hauteur'
      ],
      related: ['milieu-alimentaire', 'remise-en-etat', 'parkings']
    },
    'parkings': {
      title: 'Nettoyage de parkings professionnels',
      category: 'Propreté professionnelle',
      image: 'assets/services/parkings.jpg',
      alt: 'Parking souterrain propre et éclairé',
      lead: 'Un nettoyage ponctuel ou périodique pour vos parkings aériens et souterrains.',
      heading: 'Des accès et surfaces entretenus avec du matériel adapté.',
      paragraphs: [
        'Les parkings demandent une organisation spécifique et des équipements capables de traiter des surfaces étendues. Nos agents interviennent pour maintenir les accès, les circulations et les zones sensibles dans un état constant.',
        'La prestation peut être programmée régulièrement ou déclenchée pour une remise en état approfondie.'
      ],
      items: [
        'Balayage mécanisé ou manuel',
        'Entretien des accès routiers et piétonniers',
        'Vidage et nettoyage des réceptacles à déchets',
        'Nettoyage haute pression et récurage mécanisé',
        'Enlèvement des chewing-gums, graffitis et encombrants'
      ],
      related: ['parties-communes', 'remise-en-etat', 'evacuation-encombrants']
    },
    'reamenagement-bureaux': {
      title: 'Réaménagement de bureaux',
      category: 'Multi-services',
      image: 'assets/services/reamenagement-bureaux.jpg',
      alt: 'Réaménagement d’un espace de bureaux',
      lead: 'Des interventions coordonnées pour faire évoluer vos espaces de travail avec le moins de perturbations possible.',
      heading: 'Adaptez vos bureaux à vos nouveaux usages.',
      paragraphs: [
        'GSC Copronet met à votre disposition son expérience, ses agents qualifiés et son réseau d’entreprises partenaires pour vos projets d’aménagement et de réorganisation.',
        'Nous vous accompagnons dans les opérations courantes de transfert et d’adaptation de vos espaces professionnels.'
      ],
      items: [
        'Déplacement et création de cloisons',
        'Pose et dépose de faux plafonds',
        'Pose et dépose de revêtements de sol',
        'Pose de stores et films adhésifs',
        'Déplacement de mobilier et remise en place'
      ],
      related: ['manutention-transport', 'factotum', 'bureaux-tertiaire']
    },
    'collectivites': {
      title: 'Services publics & collectivités',
      category: 'Collectivités',
      image: 'assets/services/bureaux-tertiaire.jpg',
      alt: 'Locaux administratifs entretenus',
      lead: 'Une continuité de service adaptée aux établissements scolaires, infrastructures administratives et équipements publics.',
      heading: 'Des locaux accueillants pour les usagers et les équipes.',
      paragraphs: [
        'Les bâtiments publics et établissements scolaires accueillent des flux importants et des usages variés. Nous définissons avec vous un programme d’entretien lisible, régulier et adapté à la fréquentation des lieux.',
        'Nos équipes interviennent dans le respect de vos contraintes horaires et des modalités propres à chaque site.'
      ],
      items: [
        'Entretien régulier des locaux et circulations',
        'Nettoyage des sanitaires et espaces d’accueil',
        'Lavage des sols et de la vitrerie',
        'Interventions adaptées aux horaires du site',
        'Suivi régulier des prestations'
      ],
      related: ['bureaux-tertiaire', 'vitrerie', 'parties-communes']
    },
    'secteur-coproprietes-syndics': {
      title: 'Copropriétés & syndics',
      category: 'Secteur accompagné',
      image: 'assets/services/parties-communes.jpg',
      alt: 'Résidence entretenue par GSC Copronet',
      lead: 'Un accompagnement suivi pour préserver la propreté, le confort et la valeur de vos immeubles au quotidien.',
      heading: 'Un interlocuteur unique pour l’entretien courant et les besoins ponctuels de votre résidence.',
      paragraphs: [
        'GSC Copronet accompagne les syndics et copropriétés avec une organisation définie selon la taille de l’immeuble, la fréquentation des espaces et le cahier des charges établi ensemble. L’objectif est de maintenir des parties communes accueillantes et de garantir la continuité des interventions.',
        'Parce que la vie d’une résidence ne se limite pas au nettoyage des halls et des escaliers, nos équipes peuvent aussi coordonner des réponses complémentaires : entretien des parkings, manipulation des conteneurs, enlèvement d’encombrants, relamping ou petite maintenance.'
      ],
      items: [
        'Entretien régulier des parties communes et de la vitrerie',
        'Suivi des locaux à ordures ménagères et des conteneurs',
        'Entretien ponctuel ou périodique des parkings',
        'Enlèvement d’encombrants et remise en état',
        'Petite maintenance et relamping selon vos besoins'
      ],
      related: ['parties-communes', 'parkings', 'maintenance-immobiliere']
    },
    'secteur-sante-medico-social': {
      title: 'Santé & médico-social',
      category: 'Secteur accompagné',
      image: 'assets/services/milieu-medical.jpg',
      alt: 'Salle d’imagerie médicale propre et entretenue',
      lead: 'Une organisation rigoureuse pour les établissements qui accueillent patients, résidents, professionnels de santé et visiteurs.',
      heading: 'Des services adaptés aux contraintes particulières des environnements de soin.',
      paragraphs: [
        'Cabinets médicaux et infirmiers, centres d’imagerie, cliniques dentaires, centres de rééducation, laboratoires, pharmacies ou établissements médico-sociaux : chaque site possède ses usages, ses rythmes et ses zones sensibles.',
        'GSC Copronet privilégie une relation durable, des équipes fidélisées et des méthodes claires. Le programme est construit autour de vos locaux et peut intégrer l’entretien régulier, la vitrerie, les sanitaires ainsi que la fourniture des consommables d’hygiène nécessaires au quotidien.'
      ],
      items: [
        'Organisation adaptée aux zones sensibles et à vos horaires',
        'Nettoyage médical régulier et interventions ponctuelles',
        'Entretien des sols, sanitaires, mobiliers et surfaces vitrées',
        'Mise en place des produits et consommables d’hygiène',
        'Suivi régulier avec un interlocuteur de proximité'
      ],
      related: ['milieu-medical', 'vitrerie', 'bureaux-tertiaire']
    },
    'secteur-commerce-espaces-de-vente': {
      title: 'Commerce & espaces de vente',
      category: 'Secteur accompagné',
      image: 'assets/services/espaces-de-vente.jpg',
      alt: 'Nettoyage professionnel d’un espace de vente',
      lead: 'Des espaces nets et accueillants pour valoriser votre image de marque avant même l’arrivée de vos clients.',
      heading: 'Une organisation discrète et réactive, adaptée aux contraintes des lieux de vente.',
      paragraphs: [
        'Boutiques, magasins, showrooms et espaces d’accueil doivent rester impeccables sans perturber l’activité. GSC Copronet adapte les horaires, la fréquence des passages et les moyens engagés à la configuration de votre site.',
        'L’accompagnement peut associer l’entretien courant des locaux à des opérations ciblées sur les vitrines, devantures, enseignes, stores, façades ou trottoirs. Vous disposez ainsi d’une réponse lisible pour les espaces intérieurs comme extérieurs.'
      ],
      items: [
        'Entretien régulier des magasins et espaces d’accueil',
        'Lavage de la vitrerie, des miroirs et des devantures',
        'Nettoyage des enseignes, stores, façades et trottoirs',
        'Remise en état et traitement des sols sollicités',
        'Interventions organisées selon vos horaires d’ouverture'
      ],
      related: ['espaces-de-vente', 'vitrerie', 'remise-en-etat']
    },
    'secteur-industrie': {
      title: 'Industrie',
      category: 'Secteur accompagné',
      image: 'assets/services/ateliers-usines.jpg',
      alt: 'Zone industrielle entretenue par GSC Copronet',
      lead: 'Des moyens humains et techniques adaptés aux ateliers, aux usines et aux contraintes propres à votre production.',
      heading: 'Une organisation construite autour de votre site, de vos équipements et de vos impératifs.',
      paragraphs: [
        'Les environnements industriels demandent une préparation précise. GSC Copronet intervient dans le respect des plans de prévention existants ou vous accompagne pour définir les modalités adaptées à votre établissement.',
        'Selon les besoins, les équipes assurent l’entretien régulier des sols et des surfaces, des remises en état approfondies ou des interventions techniques sur les machines, les chaînes de production, les parois et les accès difficiles.'
      ],
      items: [
        'Programme d’intervention compatible avec votre production',
        'Balayage et lavage mécanisés des surfaces',
        'Dépoussiérage des parois, machines et structures',
        'Dégraissage et nettoyage technique ponctuel',
        'Traitement des sols, vitrerie et accès en hauteur'
      ],
      related: ['ateliers-usines', 'traitement-sols', 'vitrerie']
    },
    'secteur-agroalimentaire': {
      title: 'Agroalimentaire',
      category: 'Secteur accompagné',
      image: 'assets/services/milieu-alimentaire.jpg',
      alt: 'Zone de production agroalimentaire',
      lead: 'Des prestations organisées autour des exigences d’hygiène des professionnels de l’alimentation et de leurs locaux.',
      heading: 'Une réponse adaptée aux rythmes de production, de stockage et de manutention des denrées.',
      paragraphs: [
        'GSC Copronet accompagne les professionnels de l’industrie alimentaire, les producteurs ainsi que les entreprises de logistique, de stockage et de manutention de denrées. L’organisation est définie selon les contraintes propres à chaque site.',
        'Les produits et méthodes sont choisis en cohérence avec les exigences applicables aux locaux alimentaires. L’entretien courant peut être complété par le dégraissage, la désinfection, le lavage des zones de production, le traitement des sols ou la fourniture des consommables d’hygiène.'
      ],
      items: [
        'Organisation adaptée aux protocoles et aux rythmes du site',
        'Nettoyage et désinfection des surfaces sensibles',
        'Dégraissage et lavage des zones de production',
        'Entretien des sanitaires, de la vitrerie et des sols',
        'Fourniture des produits d’hygiène et d’accueil'
      ],
      related: ['milieu-alimentaire', 'ateliers-usines', 'traitement-sols']
    },
    'secteur-bureaux-tertiaire': {
      title: 'Bureaux & tertiaire',
      category: 'Secteur accompagné',
      image: 'assets/services/bureaux-tertiaire.jpg',
      alt: 'Bureau professionnel propre et rangé',
      lead: 'Un cadre de travail propre, fonctionnel et agréable pour vos équipes, vos clients et vos visiteurs.',
      heading: 'Des services ajustés à la fréquentation et aux usages de vos locaux professionnels.',
      paragraphs: [
        'Bureaux, sièges sociaux, espaces partagés, infrastructures culturelles ou administratives : GSC Copronet construit un programme lisible selon la configuration des lieux, les horaires et vos priorités.',
        'La stabilité des équipes favorise une qualité régulière. En complément du nettoyage courant, nous pouvons mobiliser des prestations de vitrerie, de traitement des sols, de maintenance légère, de factotum ou de réaménagement de bureaux.'
      ],
      items: [
        'Entretien régulier des espaces de travail et sanitaires',
        'Lavage de la vitrerie et entretien des moquettes',
        'Traitement et protection des sols',
        'Factotum et maintenance immobilière courante',
        'Réaménagement et manutention de mobilier'
      ],
      related: ['bureaux-tertiaire', 'factotum', 'reamenagement-bureaux']
    },
    'secteur-services-publics-collectivites': {
      title: 'Services publics & collectivités',
      category: 'Secteur accompagné',
      image: 'assets/services/bureaux-tertiaire.jpg',
      alt: 'Locaux administratifs entretenus par GSC Copronet',
      lead: 'Une continuité de service adaptée aux lieux qui accueillent quotidiennement des usagers, des agents et des publics variés.',
      heading: 'Un programme clair pour entretenir durablement vos bâtiments et équipements.',
      paragraphs: [
        'Établissements scolaires, bâtiments administratifs, infrastructures culturelles et équipements publics connaissent des niveaux de fréquentation et des usages très différents. GSC Copronet adapte les passages, les méthodes et le suivi à la réalité de chaque site.',
        'L’accompagnement peut réunir l’entretien régulier, la vitrerie, le traitement des sols, les remises en état ponctuelles et certains services associés. Cette approche permet de conserver un interlocuteur de proximité pour des besoins variés.'
      ],
      items: [
        'Entretien des locaux, circulations et espaces d’accueil',
        'Nettoyage des sanitaires, sols et surfaces vitrées',
        'Organisation adaptée aux horaires et à la fréquentation',
        'Remise en état ponctuelle et traitement des sols',
        'Suivi régulier des prestations'
      ],
      related: ['collectivites', 'bureaux-tertiaire', 'remise-en-etat']
    }
  };

  const serviceEnhancements = {
    'parties-communes': {
      images: [
        ['assets/services/parties-communes.jpg', 'Résidence entretenue par GSC Copronet'],
        ['assets/services/parties-communes-2.jpg', 'Remplacement d’un éclairage dans les parties communes']
      ],
      paragraphs: [
        'Selon les besoins de votre immeuble, la prestation peut intégrer des opérations plus techniques : brossage mécanisé des sols, nettoyage des moquettes, entretien des parkings, débouchage des conduits de vide-ordures ou lavage de façade. Un même interlocuteur peut ainsi suivre l’entretien courant et les demandes ponctuelles.'
      ],
      items: [
        'Brossage mécanisé des sols et nettoyage des moquettes',
        'Débouchage et désinfection des conduits de vide-ordures',
        'Lavage de façade et arrosage de la végétation ornementale'
      ]
    },
    'milieu-medical': {
      images: [
        ['assets/services/milieu-medical.jpg', 'Salle d’imagerie médicale propre et entretenue'],
        ['assets/services/milieu-medical-2.jpg', 'Intervention de nettoyage dans un environnement médical']
      ],
      paragraphs: [
        'Notre expérience dans ces environnements nous permet de travailler avec les protocoles et les normes propres au milieu médical. La fidélisation de nos agents contribue également à maintenir des méthodes régulières et une connaissance précise de votre site.',
        'Nous pouvons fournir et installer les consommables nécessaires au quotidien : papier hygiénique, essuie-mains, savon, désodorisant et désinfectant.'
      ],
      items: [
        'Fourniture et installation des produits d’hygiène',
        'Protocoles adaptés aux cabinets, laboratoires et centres de santé'
      ]
    },
    'milieu-alimentaire': {
      images: [
        ['assets/services/milieu-alimentaire.jpg', 'Zone de production agroalimentaire'],
        ['assets/services/milieu-alimentaire-2.jpg', 'Nettoyage professionnel dans un environnement alimentaire']
      ],
      paragraphs: [
        'Nous accompagnons les producteurs, les professionnels de l’industrie alimentaire ainsi que les entreprises de logistique, de stockage et de manutention de denrées. Les détergents employés sont choisis en conformité avec les exigences légales et la méthodologie HACCP appliquée dans les locaux alimentaires.',
        'La prestation peut comprendre le traitement des chaînes de production, la fourniture des consommables d’accueil et la protection des sols, en complément du nettoyage régulier.'
      ],
      items: [
        'Dégraissage, désinfection et lavage des chaînes de production',
        'Fourniture et installation des produits d’hygiène et d’accueil',
        'Traitement et protection de tous types de sols'
      ]
    },
    'espaces-de-vente': {
      images: [
        ['assets/services/espaces-de-vente.jpg', 'Nettoyage d’une devanture commerciale'],
        ['assets/services/espaces-de-vente-2.jpg', 'Autolaveuse utilisée dans un espace de vente'],
        ['assets/services/espaces-de-vente-3.jpg', 'Nettoyage de luminaires en hauteur']
      ],
      paragraphs: [
        'Notre expérience des zones urbaines et des secteurs à forte concentration commerciale nous permet d’adapter les horaires, les moyens techniques et la fréquence des passages. L’objectif est simple : intervenir efficacement sans perturber l’accueil de vos clients.',
        'Les opérations extérieures peuvent inclure les stores bannes, auvents, bâches, enseignes lumineuses ou non, façades et trottoirs de devanture.'
      ],
      items: [
        'Entretien des stores bannes, auvents et bâches',
        'Nettoyage des enseignes lumineuses ou non',
        'Traitement des trottoirs de devanture et salissures diverses'
      ]
    },
    'remise-en-etat': {
      images: [
        ['assets/services/remise-en-etat.jpg', 'Sol remis en état par une intervention professionnelle'],
        ['assets/services/remise-en-etat-2.jpg', 'Rénovation technique d’un revêtement de sol']
      ],
      paragraphs: [
        'Nous intervenons dans le neuf comme dans l’ancien avec des moyens techniques adaptés et du personnel formé. Cela permet de traiter aussi bien une fin de chantier qu’un dégât des eaux, un incendie, un local insalubre ou un espace occupé après un squat.',
        'Les travaux peuvent également comprendre l’arrachage d’anciens revêtements et la rénovation de supports variés : terre cuite, carreaux de ciment, pierre, béton ou parquet.'
      ],
      items: [
        'Nettoyage après incendie, dégât des eaux ou autre sinistre',
        'Traitement de locaux insalubres ou occupés après un squat',
        'Arrachage de moquette, sisal, jonc de mer ou linoléum',
        'Rénovation de la terre cuite, de la pierre, du béton et du parquet'
      ]
    },
    'traitement-sols': {
      images: [
        ['assets/services/remise-en-etat-2.jpg', 'Rénovation technique d’un revêtement de sol'],
        ['assets/services/remise-en-etat.jpg', 'Sol professionnel remis en état']
      ],
      paragraphs: [
        'Une visite technique permet de choisir une méthode cohérente avec votre objectif : décrassage approfondi, remise à niveau esthétique, protection du support ou préparation avant restitution des locaux.'
      ],
      items: [
        'Programme ponctuel ou périodique selon la fréquentation des locaux'
      ]
    },
    'maintenance-immobiliere': {
      images: [
        ['assets/services/maintenance-immobiliere.jpg', 'Travaux de peinture réalisés dans un bâtiment'],
        ['assets/services/maintenance-immobiliere-2.jpg', 'Installation et contrôle d’un détecteur de fumée']
      ],
      paragraphs: [
        'Les interventions couvrent plusieurs corps de métier : plomberie, peinture, petite maçonnerie, serrurerie, menuiserie, revêtements de sol et électricité légère. Nos agents sont formés et habilités pour assurer une réponse polyvalente, réactive et suivie.',
        'Vous pouvez ainsi centraliser les demandes courantes, depuis un débouchage ou un raccord de peinture jusqu’au montage de mobilier, au remplacement d’un éclairage ou à la pose de plinthes et de carrelage.'
      ],
      items: [
        'Plomberie : débouchage, entretien et remplacement des équipements sanitaires',
        'Peinture : raccords, rebouchage et revêtements muraux',
        'Petite maçonnerie : cloisons, murs, plinthes et carrelage',
        'Électricité légère : remplacement d’éclairage et réparations courantes'
      ]
    },
    'espaces-verts': {
      images: [
        ['assets/services/espaces-verts.jpg', 'Espace vert entretenu autour d’un bâtiment'],
        ['assets/services/espaces-verts-2.jpg', 'Débroussaillage d’un espace extérieur'],
        ['assets/services/espaces-verts-3.jpg', 'Entretien paysager d’une copropriété'],
        ['assets/services/espaces-verts-4.jpg', 'Taille et entretien d’un espace arboré']
      ],
      paragraphs: [
        'Nos agents sont compétents, organisés et autonomes. Ils interviennent dans le respect du calendrier défini avec vous, que la demande soit ponctuelle ou périodique.',
        'Cette organisation permet de conserver des extérieurs agréables pour les résidents, les collaborateurs et les visiteurs, tout en tenant compte des saisons.'
      ],
      items: []
    },
    'factotum': {
      images: [
        ['assets/services/factotum.jpg', 'Outils utilisés pour de petites réparations'],
        ['assets/services/factotum-2.jpg', 'Intervention de maintenance légère sur un site']
      ],
      paragraphs: [
        'Historiquement chargé du bon fonctionnement technique d’une maison, le factotum répond aujourd’hui aux besoins très concrets des immeubles et locaux professionnels. Nos agents polyvalents prennent en charge une grande variété de demandes avec autonomie.',
        'Le service peut aussi couvrir le transport et la destruction d’archives, les déménagements entre sites, la pose de films occultants ou solaires, les moustiquaires, les racks à vélo et l’approvisionnement en produits d’hygiène.'
      ],
      items: [
        'Transport et destruction d’archives',
        'Pose de films solaires, films occultants et moustiquaires',
        'Remplacement de vitres cassées, serrures et luminaires',
        'Pose de racks à vélo et approvisionnement en produits d’hygiène'
      ]
    },
    'reamenagement-bureaux': {
      images: [
        ['assets/services/reamenagement-bureaux.jpg', 'Réaménagement d’un espace de bureaux'],
        ['assets/services/reamenagement-bureaux-2.jpg', 'Travaux d’adaptation dans des bureaux']
      ],
      paragraphs: [
        'Les opérations peuvent inclure l’isolation, les cloisons, faux plafonds, sols, stores, films adhésifs, éclairages, revêtements muraux et travaux de peinture. Nous coordonnons également le montage, le démontage et le transport du mobilier.',
        'L’objectif est de créer un environnement de travail sain et fonctionnel. Nous nous appuyons pour cela sur une écoute attentive, des agents autonomes et un réseau d’entreprises partenaires.'
      ],
      items: [
        'Isolation et adaptation des cloisons',
        'Optimisation de l’éclairage et remplacement par des solutions LED',
        'Rebouchage, peinture et pose de revêtements muraux',
        'Montage, démontage, manutention et transport du mobilier'
      ]
    },
    'manutention-transport': {
      images: [
        ['assets/services/manutention-transport-propre.jpg', 'Transport d’une charge lourde dans un escalier'],
        ['assets/services/manutention-transport-2.jpg', 'Déplacement professionnel d’un coffre-fort']
      ],
      paragraphs: [
        'Photocopieurs, coffres-forts, distributeurs, matériel informatique, électroménager ou archives : nous préparons chaque opération en fonction des accès et du poids des éléments à déplacer.',
        'Nos équipes apportent des conseils adaptés, interviennent rapidement lorsque la situation l’exige et ajustent leurs horaires à vos contraintes. Le matériel employé est choisi pour préserver la sécurité des personnes, des locaux et des équipements.'
      ],
      items: [
        'Manutention administrative : archives, documents et dossiers',
        'Transport de photocopieurs, coffres-forts et distributeurs',
        'Conseil personnalisé et adaptation aux contraintes horaires',
        'Matériel approprié pour une intervention sécurisée'
      ]
    },
    'evacuation-encombrants': {
      images: [
        ['assets/services/evacuation-encombrants.jpg', 'Évacuation d’encombrants par une équipe professionnelle'],
        ['assets/services/evacuation-encombrants-2.jpg', 'Tri et enlèvement de déchets encombrants']
      ],
      paragraphs: [
        'L’intervention peut concerner une résidence, un bureau ou un local commercial, en centre-ville comme en périphérie. Nos équipes assurent la continuité des prestations et s’adaptent au volume comme aux contraintes d’accès.',
        'Nous pouvons également intervenir pour des manifestations culturelles, salons et festivals afin de ramasser, trier et évacuer les déchets générés par l’événement.'
      ],
      items: [
        'Débarrassage et assainissement des caves',
        'Interventions dans les résidences, bureaux et commerces',
        'Ramassage et tri lors de salons, festivals et manifestations'
      ]
    },
    'bureaux-tertiaire': {
      images: [
        ['assets/services/bureaux-tertiaire.jpg', 'Bureau professionnel propre et rangé'],
        ['assets/services/bureaux-tertiaire-2.jpg', 'Entretien professionnel d’un espace de travail'],
        ['assets/services/bureaux-tertiaire-3.jpg', 'Illustration de l’engagement environnemental GSC Copronet']
      ],
      paragraphs: [
        'Nous intervenons également dans les infrastructures culturelles et administratives, les universités, lycées, collèges et écoles. La stabilité des équipes favorise une relation de confiance durable et une qualité constante.',
        'Au-delà du nettoyage régulier, nous proposons le traitement des sols thermoplastiques, des pierres naturelles ou reconstituées, des parquets et des moquettes, selon les méthodes adaptées à chaque matériau.'
      ],
      items: [
        'Entretien des sols thermoplastiques',
        'Protection des pierres naturelles, pierres reconstituées et parquets',
        'Nettoyage des moquettes à sec ou par injection-extraction'
      ]
    },
    'ateliers-usines': {
      images: [
        ['assets/services/ateliers-usines.jpg', 'Zone industrielle entretenue'],
        ['assets/services/ateliers-usines-2.jpg', 'Nettoyage technique de grilles d’aération']
      ],
      paragraphs: [
        'Nos équipes interviennent avec les moyens humains et techniques nécessaires pour assurer la continuité des prestations. Lorsque cela est nécessaire, nous travaillons dans le cadre d’un plan de prévention existant ou élaboré avec votre établissement.',
        'Les interventions techniques peuvent comprendre le lessivage de parois, y compris en hauteur, le dégraissage des machines et chaînes de production ou encore le nettoyage à la vapeur sous pression.'
      ],
      items: [
        'Protection des sols par des traitements adaptés',
        'Lessivage des parois et structures en hauteur',
        'Nettoyage à la vapeur sous pression'
      ]
    },
    'parkings': {
      images: [
        ['assets/services/parkings.jpg', 'Parking souterrain propre et éclairé'],
        ['assets/services/parkings-2.jpg', 'Entretien professionnel d’un parking']
      ],
      paragraphs: [
        'Nos agents sont formés et habilités à utiliser le matériel adapté aux parkings aériens comme souterrains. Ils peuvent intervenir de manière ponctuelle ou selon une périodicité définie avec vous.',
        'L’entretien porte aussi sur les accès routiers et piétonniers, les réceptacles à déchets, les zones sensibles et les surfaces de contact.'
      ],
      items: [
        'Désinfection des zones sensibles et surfaces de contact'
      ]
    }
  };

  const sectorEnhancementSources = {
    'secteur-coproprietes-syndics': 'parties-communes',
    'secteur-sante-medico-social': 'milieu-medical',
    'secteur-commerce-espaces-de-vente': 'espaces-de-vente',
    'secteur-industrie': 'ateliers-usines',
    'secteur-agroalimentaire': 'milieu-alimentaire',
    'secteur-bureaux-tertiaire': 'bureaux-tertiaire',
    'secteur-services-publics-collectivites': 'bureaux-tertiaire'
  };

  Object.entries(sectorEnhancementSources).forEach(([sectorSlug, serviceSlug]) => {
    serviceEnhancements[sectorSlug] = {
      images: serviceEnhancements[serviceSlug]?.images
    };
  });

  const params = new URLSearchParams(window.location.search);
  const routes = window.GSC_SERVICE_ROUTES || {};
  const slug = document.body.dataset.serviceSlug || params.get('service');
  const service = services[slug] || services['parties-communes'];
  const enhancement = serviceEnhancements[slug] || {};
  const route = routes[slug];
  const isSector = route?.kind === 'sector';
  const serviceHref = serviceSlug => routes[serviceSlug]?.path || `service.html?service=${serviceSlug}`;

  const setText = (selector, text) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = text;
  };

  setText('[data-service-category]', service.category);
  setText('[data-service-title]', route?.h1 || service.title);
  setText('[data-service-lead]', service.lead);
  setText('[data-service-heading]', service.heading);
  setText('[data-detail-back-label]', isSector ? 'Retour aux secteurs' : 'Retour aux services');
  setText('[data-detail-copy-eyebrow]', isSector ? 'Un accompagnement adapté' : 'Une réponse sur mesure');
  setText('[data-detail-list-title]', isSector ? 'Réponses adaptées à votre secteur' : 'Prestations proposées');

  const detailBack = document.querySelector('[data-detail-back]');
  if (detailBack) detailBack.href = isSector ? 'index.html#secteurs' : 'index.html#prestations';

  const gallery = document.querySelector('[data-service-gallery]');
  if (gallery) {
    gallery.setAttribute('aria-label', isSector ? 'Photos du secteur' : 'Photos de la prestation');
    const images = enhancement.images || [[service.image, service.alt]];
    gallery.dataset.count = images.length;

    const photos = images.map(([src, alt]) => {
      const figure = document.createElement('figure');
      figure.className = 'detail-hero__photo';

      const image = document.createElement('img');
      image.src = src;
      image.alt = alt;
      image.loading = 'eager';
      image.decoding = 'async';

      figure.appendChild(image);
      gallery.appendChild(figure);

      return { figure, image };
    });
    let galleryObserver;

    const createRow = rowPhotos => {
      const row = document.createElement('div');
      row.className = 'detail-hero__row';
      row.append(...rowPhotos.map(photo => photo.figure));
      return row;
    };

    const layoutGallery = () => {
      if (!photos.every(photo => photo.image.naturalWidth)) return;

      photos.forEach(photo => {
        photo.ratio = photo.image.naturalWidth / photo.image.naturalHeight;
        photo.figure.style.setProperty('--photo-ratio', photo.ratio);
      });

      gallery.replaceChildren();
      gallery.classList.remove('detail-hero__gallery--portrait-stack');
      galleryObserver?.disconnect();

      const portrait = photos.find(photo => photo.ratio < .95);
      if (portrait && photos.length >= 3) {
        const stackedPhotos = photos.filter(photo => photo !== portrait);
        const stackedColumn = document.createElement('div');
        const portraitColumn = document.createElement('div');
        const stackedHeightRatio = stackedPhotos.reduce((total, photo) => total + (1 / photo.ratio), 0);

        stackedColumn.className = 'detail-hero__column detail-hero__column--stack';
        portraitColumn.className = 'detail-hero__column detail-hero__column--portrait';
        stackedColumn.append(...stackedPhotos.map(photo => photo.figure));
        portraitColumn.append(portrait.figure);
        gallery.classList.add('detail-hero__gallery--portrait-stack');
        gallery.append(stackedColumn, portraitColumn);

        const fitColumns = () => {
          const gap = parseFloat(getComputedStyle(gallery).gap) || 0;
          const stackedGaps = gap * (stackedPhotos.length - 1);
          const stackedWidth = (
            gallery.clientWidth - gap - (portrait.ratio * stackedGaps)
          ) / (1 + (portrait.ratio * stackedHeightRatio));

          stackedColumn.style.flex = `0 0 ${stackedWidth}px`;
        };

        galleryObserver = new ResizeObserver(fitColumns);
        galleryObserver.observe(gallery);
        fitColumns();
        return;
      }

      if (photos.length === 3) {
        gallery.append(createRow([photos[0]]), createRow(photos.slice(1)));
        return;
      }

      for (let index = 0; index < photos.length; index += 2) {
        gallery.append(createRow(photos.slice(index, index + 2)));
      }
    };

    photos.forEach(photo => photo.image.addEventListener('load', layoutGallery));
    layoutGallery();
  }

  const description = document.querySelector('[data-service-description]');
  if (description) {
    [...service.paragraphs, ...(enhancement.paragraphs || [])].forEach(text => {
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      description.appendChild(paragraph);
    });
  }

  const list = document.querySelector('[data-service-list]');
  if (list) {
    [...service.items, ...(enhancement.items || [])].forEach(text => {
      const item = document.createElement('li');
      item.textContent = text;
      list.appendChild(item);
    });
  }

  const related = document.querySelector('[data-related-services]');
  if (related) {
    service.related.forEach(relatedSlug => {
      const relatedService = services[relatedSlug];
      const link = document.createElement('a');
      link.className = 'detail-related__card';
      link.href = serviceHref(relatedSlug);

      const label = document.createElement('span');
      label.textContent = relatedService.category;

      const title = document.createElement('h3');
      title.textContent = relatedService.title;

      const arrow = document.createElement('b');
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '→';

      link.append(label, title, arrow);
      related.appendChild(link);
    });
  }

  document.title = route?.title || `${service.title} | GSC Copronet`;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.content = route?.description || service.lead;
})();
