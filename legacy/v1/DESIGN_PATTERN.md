# DESIGN PATTERN - ENTITY

Ce modèle est centré sur les entités. 

Organisations des dossiers

La philosophie est d'avoir à disposition un fichier qui décrit l'entité et ses comportements. 


## entities

Ce dossier regroupe toutes les entités. 
Chaque entité est constitué d'un dossier par entité:

    | styles
    | sous composants
    | tests
    | [entity].tsx

### le fichier entity décrit tous les comportement de l'entité. 
 - Les types directement liés à l'entité
 - le context avec un getter / setter
 - les routes API avec toutes les méthodes
 - le hooks de gestion de l'état. Ce sera le seul autoriser à mettre à jour l'état de l'entité. Tous les composant voulant modifier l'entité devront utiliser ce Hook.

## UI
Ne comporte que des composants sans logique, il doivent pouvoir fonctioner seul, sans aucune dépendance (hormis les librairies externes)

## pages related

Comporte uniquement les composant définissant une page. 