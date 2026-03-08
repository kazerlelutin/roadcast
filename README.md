# AnkiSpeak

Générateur de cartes Anki avec synthèse vocale. Créez automatiquement des cartes Anki classiques ou des textes à trous avec des voix, puis exportez un ZIP contenant les médias audio et le fichier CSV à importer dans Anki.

## 🚀 Lancement

### Version exécutable (recommandée)

```bash
./ankispeak.exe
```

### Mode développement

```bash
# Installation des dépendances
bun install

# Lancement en mode développement
bun run dev
```

L'application sera accessible sur `http://localhost:3000`

## 📋 Format CSV

### Structure du fichier CSV

Le fichier CSV doit contenir les colonnes suivantes (séparées par `,` ou `;`) :

1. **Langue source** : Le texte dans votre langue maternelle
2. **Langue cible** : Le texte à apprendre (avec la traduction)
3. **Tags** (optionnel) : Tags pour organiser vos cartes dans Anki
4. **Infos additionnelles** (optionnel) : Informations supplémentaires qui apparaîtront au verso de la carte (utile pour les textes à trous notamment)

### Exemple de fichier CSV

```csv
Bonjour,Hello,tags:greetings,Formal greeting
Comment allez-vous ?,How are you ?,tags:greetings,Polite question
```

Ou avec en-têtes :

```csv
Source,Target,Tags,Additional Info
Bonjour,Hello,tags:greetings,Formal greeting
Comment allez-vous ?,How are you ?,tags:greetings,Polite question
```

### Format détaillé

- **Séparateurs** : `,` (virgule) ou `;` (point-virgule)
- **Guillemets** : Les valeurs peuvent être entourées de guillemets simples `'` ou doubles `"`
- **En-têtes** : Optionnels, mais si présents, la première ligne sera ignorée si la 3ème colonne s'appelle "Tags"

### Infos additionnelles

Les **infos additionnelles** (4ème colonne) sont particulièrement utiles pour :

- Les textes à trous : ajouter des explications, des exemples ou des notes contextuelles
- Les cartes classiques : ajouter des informations complémentaires au verso

Ces informations apparaîtront au verso de la carte, après la traduction et le fichier audio.

## 🎯 Types de cartes

### Cartes classiques

Les cartes classiques affichent :

- **Recto** : La traduction (langue cible) + fichier audio
- **Verso** : Le texte source (langue source) + infos additionnelles (si présentes)

### Textes à trous (Cloze deletion)

Pour chaque mot de la traduction, une carte est créée avec :

- **Recto** : Le texte avec un mot masqué (format Anki `{{c1::mot}}`) + le texte source
- **Verso** : Le fichier audio + les infos additionnelles (si présentes)

## 🌍 Langues supportées

Sélectionnez la langue cible pour la synthèse vocale. Les langues disponibles dépendent de votre système TTS.

## 📦 Export

Après traitement, un fichier ZIP est généré contenant :

- `cards.csv` : Fichier à importer dans Anki
- `medias/` : Dossier contenant tous les fichiers audio MP3
- `README.txt` : Instructions d'importation

### Importation dans Anki

1. Ouvrez Anki
2. Fichier > Importer
3. Sélectionnez le fichier `cards.csv` du ZIP
4. Choisissez votre paquet
5. Importez

## 🏗️ Architecture

- **Backend** : Serveur Bun avec API REST et WebSocket
- **Frontend** : Interface SPA avec router côté client
- **TTS** : Synthèse vocale pour générer les fichiers audio
- **Communication** : WebSocket pour le suivi de progression en temps réel

## 🎨 Fonctionnalités

- ✅ Génération automatique de cartes Anki
- ✅ Synthèse vocale (TTS) pour chaque carte
- ✅ Cartes classiques
- ✅ Textes à trous (cloze deletion)
- ✅ Infos additionnelles au verso
- ✅ Tags personnalisés
- ✅ Export ZIP avec médias
- ✅ Interface multilingue (FR, EN, KO)
- ✅ Suivi de progression en temps réel
- ✅ Glisser-déposer de fichiers CSV
- ✅ Collage direct (Ctrl+V)

## 🔧 Développement

**Technologies utilisées :**

- Bun (runtime JavaScript)
- TypeScript
- WebSocket
- TTS (Text-to-Speech)
- Vanilla JavaScript/HTML/CSS

## 📝 Notes

- Les fichiers CSV sont traités temporairement et supprimés après génération
- Les fichiers audio sont générés à la volée et inclus dans le ZIP
- Aucune donnée n'est stockée de manière permanente
- Ne partagez pas d'informations sensibles

## 👤 Auteur

Benoist "Kazerlelutin" Bouteiller

- Site : https://kazerlelutin.space
- Contact : bento@ik.me
- GitHub : https://github.com/kazerlelutin/AnkiSpeak

## 💝 Soutien

Si vous aimez AnkiSpeak, vous pouvez soutenir le projet :

- [Offrir un café](https://ko-fi.com/kazerlelutin)
