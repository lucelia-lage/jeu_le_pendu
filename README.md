# Jeu du Pendu

Un jeu du pendu classique développé en JavaScript avec une interface graphique SVG et une connexion à une API de mots français.

## Fonctionnalités

- Interface utilisateur facile avec alphabet cliquable
- Animation SVG du pendu qui se dessine progressivement
- Récupération automatique de mots français via API
- Système de fallback avec liste de mots locale
- Fonction de redémarrage pour rejouer

## Comment jouer

1. Un mot français aléatoire est sélectionné
2. Cliquez sur les lettres de l'alphabet pour deviner le mot
3. Chaque erreur ajoute une partie du corps au pendu
4. Vous avez 6 erreurs maximum avant de perdre
5. Trouvez toutes les lettres pour gagner !

## Installation et utilisation

## API utilisée

Le jeu utilise l'API [Random Word API](https://random-word-api.herokuapp.com/) pour récupérer des mots français aléatoirement. En cas d'indisponibilité de l'API, le jeu bascule automatiquement sur une liste de mots français prédéfinie.

## Améliorations possibles

- Ajout de niveaux de difficulté
- Système de score et statistiques
- Sauvegarde des parties
- Mode multijoueur
- Thèmes visuels personnalisables
- Support des caractères accentués
- Animations CSS avancées
