Feature: Préparer une chronique Roadcast

  Scenario: Exécuter Roadcast v2 sans application historique
    Given le dépôt Roadcast v2
    When je construis l’application de production
    Then le code archivé legacy v1 n’est pas présent et Roadcast v2 reste fonctionnel

  Scenario: Ouvrir un roadcast sans contenu de démonstration
    Given un roadcast nouvellement créé
    When j’ouvre son espace d’édition
    Then une seule chronique vide est présente, sans texte ni chroniqueur prérempli
  En tant que chroniqueur
  Je veux écrire, diffuser et partager une chronique depuis le même espace
  Afin de garder une présentation fluide et accessible.

  Scenario: Créer un roadcast depuis l'accueil
    Given la page d'accueil Roadcast
    When je saisis le titre de mon roadcast
    Then je peux accéder à son espace d'écriture avec ce titre et une chronique initiale vide

  Scenario: Choisir un contraste adapté depuis l'accueil
    Given la page d'accueil Roadcast est en mode sombre
    When je bascule vers le mode clair
    Then l'accueil reste lisible, utilise la même icône de thème que l'espace Roadcast et le choix est conservé

  Scenario: Préparer une chronique avec le contraste choisi
    Given une chronique ouverte dans un roadcast
    When je choisis le mode clair ou sombre
    Then l'arbre, l'éditeur et l'aperçu restent lisibles

  Scenario: Ouvrir un lien direct vers un roadcast
    Given le lien de modification /mon-roadcast
    When je l'ouvre dans le navigateur
    Then l'arbre et l'éditeur de la chronique sont affichés

  Scenario: Estimer la durée pendant l'écriture
    Given une chronique ouverte en mode concentration
    When je modifie le texte de la chronique
    Then son estimation de temps est mise à jour

  Scenario: Envoyer un média vers un slider
    Given un média intégré à une chronique
    When je choisis le slider Bravo depuis sa fenêtre d'actions
    Then le slider Bravo affiche ce média en aperçu

  Scenario: Diffuser une vidéo YouTube sans commandes spectateur
    Given une URL YouTube ajoutée à une chronique
    When je sélectionne cette vidéo et la diffuse vers le slider Alpha
    Then le slider Alpha lit automatiquement la vidéo sans afficher ses commandes

  Scenario: Importer une image distante
    Given le menu d’ajout de média dans une chronique
    When je fournis une URL HTTPS vers une image autorisée
    Then limage est téléchargée, conservée lorsque le stockage est disponible et ajoutée à la chronique

  Scenario: Utiliser l’espace de travail sur mobile
    Given un écran de largeur mobile
    When j’ouvre l’espace de travail et le menu d’ajout
    Then je peux ajouter un média, accéder aux actions de sauvegarde, à l’arbre et à l’aperçu en faisant défiler la page

  Scenario: Diffuser rapidement une vidéo depuis son bloc
    Given une vidéo YouTube dans une chronique ouverte
    When j’active le bouton Diffuser en haut à droite de cette vidéo
    Then la fenêtre de diffusion s’ouvre avec cette seule vidéo sélectionnée

  Scenario: Parcourir tout l’espace de travail sur un écran mobile
    Given un écran de largeur mobile et une chronique longue
    When je fais défiler l’espace de travail
    Then je peux atteindre le bas de l’éditeur, l’arbre des chroniques et l’aperçu du slider

  Scenario: Partager une lecture asynchrone
    Given le slider Alpha est interactif
    When une personne ajoute un élément à son résumé
    Then elle peut télécharger son résumé à la fin de la présentation

  Scenario: Partager le bon accès au roadcast
    Given un roadcast ouvert dans l’espace d’écriture
    When j’ouvre le partage et choisis Écrire, Lire ou Diffuser
    Then le lien correspondant est affiché et peut être copié

  Scenario: Garder un aperçu lisible sans diffusion
    Given aucun média n’est envoyé vers le slider Alpha
    When je consulte son aperçu
    Then un encart au ratio 16:9 indique qu’aucune diffusion n’est en cours et son lien peut être copié

  Scenario: Lire clairement un texte diffusé dans l’aperçu
    Given une sélection de texte diffusée vers le slider Alpha
    When je consulte son aperçu dans l’espace de travail
    Then la composition reprend la sortie du slider avec un zoom adapté au cadre de prévisualisation

  Scenario: Enregistrer un roadcast avec des médias
    Given une chronique contenant une image volumineuse
    When sa sauvegarde automatique se déclenche
    Then ses chroniques et ses liens de lecture et slider sont conservés dans PostgreSQL sans faire échouer l’éditeur

  Scenario: Adapter le contenu à une sortie fixe
    Given une sélection contenant du texte et plusieurs médias
    When elle est diffusée vers un slider
    Then l’aperçu, le slider et le PiP conservent leur cadre sans défilement et adaptent le contenu à l’espace disponible

  Scenario: Organiser les chroniques avec les chroniqueurs
    Given un roadcast contenant des chroniques de plusieurs auteurs
    When je crée ou sélectionne un chroniqueur et filtre les chroniques
    Then seules les chroniques correspondantes sont affichées et je peux créer une nouvelle chronique depuis l’arbre

  Scenario: Conserver une version d’une chronique
    Given une chronique modifiée dans l’éditeur
    When j’enregistre une version puis choisis une version antérieure
    Then son contenu est restauré, seules les dernières versions sont conservées dans la table des versions et l’état indique si la saisie correspond à la dernière version enregistrée

  Scenario: Retrouver la saisie courante sans choisir une version
    Given une chronique a été enregistrée automatiquement
    When je recharge l’espace d’édition
    Then le document courant réapparaît avec ses versions sans que je doive en sélectionner une, l’état indique qu’il est sauvegardé et aucune action Recharger ne m’est proposée

  Scenario: Nettoyer les versions d’une chronique
    Given une chronique contient des versions enregistrées
    When je confirme le nettoyage de son historique
    Then ses versions sont supprimées de la base et le contenu courant est conservé

  Scenario: Mettre à niveau la base au démarrage du conteneur
    Given une image Roadcast et une base PostgreSQL configurée
    When un ou plusieurs conteneurs démarrent
    Then les migrations manquantes sont appliquées une seule fois avant l’ouverture du serveur

  Scenario: Limiter les roadcasts récents au navigateur
    Given des roadcasts créés par plusieurs personnes
    When j’ouvre l’accueil depuis mon navigateur
    Then seuls les roadcasts créés ou ouverts dans mon stockage local sont listés

  Scenario: Éviter les envois de sauvegarde en boucle
    Given la saisie courante est déjà enregistrée
    When l’éditeur émet plusieurs mises à jour identiques
    Then aucun nouvel envoi n’est effectué et une erreur ne déclenche pas de nouvelle tentative sans modification

  Scenario: Signaler une mise à jour à un autre collaborateur
    Given deux collaborateurs ont ouvert le même roadcast
    When le premier enregistre une modification
    Then le second voit une action Recharger pour récupérer l’espace à jour

  Scenario: Consulter la rétention et les limites d’un roadcast
    Given un roadcast en plan gratuit
    When je consulte son arbre de chroniques
    Then je vois sa date de suppression prévue après 45 jours d’inactivité ainsi que les jauges globales de caractères et de taille média, limitée à 100 Mo

  Scenario: Diffuser une sélection depuis l’éditeur
    Given une chronique contenant du texte sélectionné et une image
    When j’ouvre la commande Diffuser de la bubble et choisis un slider dans la fenêtre de confirmation
    Then seule ma sélection est envoyée vers le slider choisi

  Scenario: Insérer depuis la gouttière de l’éditeur
    Given une chronique contenant plusieurs blocs
    When je survole un bloc et choisis une insertion dans la gouttière
    Then le menu est aligné sur ce bloc et le nouvel élément est ajouté avant lui

  Scenario: Annuler l’ajout d’un média depuis la gouttière
    Given le menu d’insertion est ouvert sur un bloc
    When j’annule le sélecteur de fichiers
    Then le menu se ferme et le bouton d’insertion reste disponible sur ce bloc

  Scenario: Supprimer une chronique
    Given un roadcast contenant plusieurs chroniques
    When je confirme la suppression d’une chronique depuis l’arbre
    Then la chronique et ses versions disparaissent et une chronique restante est sélectionnée

  Scenario: Verrouiller une chronique en cours d’édition
    Given deux personnes ont renseigné leur nom dans le même roadcast
    When la première modifie une chronique pendant plus de 400 millisecondes
    Then la seconde voit son nom et ne peut pas modifier cette chronique tant que le verrou est actif

  Scenario: Initialiser une session de collaboration de manière sûre
    Given un navigateur sans API Web Crypto
    When il initialise les verrous de chroniques
    Then l’initialisation s’arrête avec une erreur explicite au lieu de générer un identifiant prévisible

  Scenario: Collaborer depuis le serveur de développement
    Given deux navigateurs ouverts sur le serveur de développement
    When l’un modifie une chronique et qu’un verrou est émis
    Then l’autre reçoit le verrou et les mises à jour via le WebSocket de collaboration

  Scenario: Mettre à jour un slider ouvert en direct
    Given le lien du slider Bravo est ouvert dans OBS
    When une sélection est diffusée vers Bravo depuis un autre navigateur
    Then le slider reçoit cette sélection sans rechargement de page

  Scenario: Ouvrir un slider dans une fenêtre PiP
    Given l’aperçu du slider Alpha
    When j’ouvre l’image dans l’image
    Then une fenêtre PiP affiche la sortie du slider et reçoit les diffusions suivantes

  Scenario: Lire un roadcast sans pouvoir le modifier
    Given le jeton de lecture distinct du jeton d’édition d’un roadcast
    When je consulte une chronique
    Then son contenu est affiché sans commande d’édition

  Scenario: Choisir la mesure d’audience
    Given ma première visite sur Roadcast
    When je refuse la mesure d’audience
    Then aucun script de mesure n’est chargé et mon choix reste modifiable

  Scenario: Consulter les informations légales
    Given la page d’accueil Roadcast
    When j’ouvre les mentions légales ou la page confidentialité
    Then les informations d’édition, d’hébergement et de consentement sont disponibles
