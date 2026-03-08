
export const ABOUT_CONTAINER_ID = 'about-container';
export const ABOUT_ITEMS_CONTAINER_ID = 'about-items-container';

export const ABOUT_ITEM_TEMPLATE_ID = 'about-item-template';

export const aboutTitle = {
  fr: 'À propos',
  en: 'About',
  ko: '약간'
}

export const aboutContent = [
  {
    title: {
      fr: 'Qui suis-je ?',
      en: 'Who am I ?',
      ko: '나는 누구인가?'
    },
    content: {
      fr: 'Je suis Benoist Bouteiller, créateur de jeux, animateur pixel art et développeur d\'applications. Passionné par l\'apprentissage des langues et les technologies éducatives, j\'ai créé AnkiSpeak pour faciliter la création de cartes Anki avec des voix.',
      en: 'I am Benoist Bouteiller, game creator, pixel art animator and app developer. Passionate about language learning and educational technologies, I created AnkiSpeak to facilitate the creation of Anki cards with voices.',
      ko: '저는 게임 제작자, 픽셀 아트 애니메이터, 앱 개발자인 Benoist Bouteiller입니다. 언어 학습과 교육 기술에 대한 열정으로 AnkiSpeak을 만들어 음성이 포함된 Anki 카드 생성을 용이하게 했습니다.'
    },
    link: "http://bouteiller.contact/",
    linkText: {
      fr: 'Me contacter',
      en: 'Contact me',
      ko: '연락하기'
    }
  },
  {
    title: {
      fr: 'Concept AnkiSpeak',
      en: 'AnkiSpeak Concept',
      ko: 'AnkiSpeak 컨셉'
    },
    content: {
      fr: 'AnkiSpeak transforme la création de cartes Anki en une expérience automatisée et efficace. Générez automatiquement des cartes classiques ou des textes à trous avec des voix, puis exportez un ZIP contenant les médias audio et le fichier CSV à importer dans Anki.',
      en: 'AnkiSpeak transforms Anki card creation into an automated and efficient experience. Automatically generate classic cards or cloze deletion cards with voices, then export a ZIP containing audio media and CSV file to import into Anki.',
      ko: 'AnkiSpeak은 Anki 카드 생성을 자동화되고 효율적인 경험으로 바꿉니다. 음성이 포함된 클래식 카드나 빈칸 채우기 카드를 자동으로 생성한 다음, Anki에 가져올 오디오 미디어와 CSV 파일이 포함된 ZIP을 내보냅니다.'
    }
  },
  {
    title: {
      fr: 'Objectif : Créer, pas stocker',
      en: 'Goal: Create, not store',
      ko: '목표: 저장이 아닌 창조'
    },
    content: {
      fr: 'L\'objectif n\'est pas de sauvegarder vos données mais de permettre aux utilisateurs de générer rapidement des cartes Anki avec voix. Vos fichiers CSV sont traités temporairement et supprimés après génération. Ne partagez pas d\'informations sensibles.',
      en: 'The goal is not to save your data but to let users quickly generate Anki cards with voices. Your CSV files are processed temporarily and deleted after generation. Do not share sensitive information.',
      ko: '목표는 데이터를 저장하는 것이 아니라 사용자가 음성이 포함된 Anki 카드를 빠르게 생성할 수 있도록 하는 것입니다. CSV 파일은 임시로 처리되고 생성 후 삭제됩니다. 민감한 정보를 공유하지 마세요.'
    }
  },
  {
    title: {
      fr: 'Technologie',
      en: 'Technology',
      ko: '기술'
    },
    content: {
      fr: 'AnkiSpeak est développé avec Vanilla JavaScript/TypeScript, HTML et CSS. Hébergé sur CapRover, l\'application utilise Bun comme runtime et gTTS pour la synthèse vocale. Aucun framework lourd, juste du code simple et efficace.',
      en: 'AnkiSpeak is developed with Vanilla JavaScript/TypeScript, HTML and CSS. Hosted on CapRover, the app uses Bun as runtime and gTTS for speech synthesis. No heavy framework, just simple and efficient code.',
      ko: 'AnkiSpeak은 Vanilla JavaScript/TypeScript, HTML, CSS로 개발되었습니다. CapRover에서 호스팅되며, 앱은 런타임용 Bun과 음성 합성을 위한 gTTS를 사용합니다. 무거운 프레임워크 없이, 단순하고 효율적인 코드만 사용합니다.'
    },
    link: "https://github.com/kazerlelutin/AnkiSpeak",
    linkText: {
      fr: 'Code source',
      en: 'Source code',
      ko: '소스 코드'
    }
  },
  {
    title: {
      fr: 'Soutenez le projet',
      en: 'Support the project',
      ko: '프로젝트 지원하기'
    },
    content: {
      fr: 'Si vous aimez AnkiSpeak et souhaitez soutenir son développement, vous pouvez m\'offrir un café ! Chaque contribution aide à maintenir et améliorer l\'application.',
      en: 'If you like AnkiSpeak and want to support its development, you can buy me a coffee! Every contribution helps maintain and improve the application.',
      ko: 'AnkiSpeak을 좋아하고 개발을 지원하고 싶다면, 저에게 커피를 사주실 수 있습니다! 모든 기여는 애플리케이션을 유지하고 개선하는 데 도움이 됩니다.'
    },
    link: "https://ko-fi.com/kazerlelutin",
    linkText: {
      fr: 'Offrir un café',
      en: 'Buy me a coffee',
      ko: '커피 사주기'
    }
  },
  {
    title: {
      fr: 'Mentions légales',
      en: 'Legal notices',
      ko: '법적 고지'
    },
    content: {
      fr: 'Les cartes générées sont à titre indicatif, aucune garantie de résultat. Vos données CSV sont traitées temporairement et supprimées après génération. En cas de problème technique, vos données pourraient rester temporairement mais seraient effacées. Ne partagez pas d\'informations sensibles. Aucun cookie n\'est utilisé sur ce site.',
      en: 'Generated cards are for informational purposes only, no guarantee of results. Your CSV data is processed temporarily and deleted after generation. In case of technical issues, your data might remain temporarily but would be deleted. Do not share sensitive information. No cookies are used on this site.',
      ko: '생성된 카드는 참고용이며, 결과에 대한 보장은 없습니다. CSV 데이터는 임시로 처리되고 생성 후 삭제됩니다. 기술적 문제가 발생할 경우 데이터가 일시적으로 남을 수 있지만 삭제됩니다. 민감한 정보를 공유하지 마세요. 이 사이트에서는 쿠키를 사용하지 않습니다.'
    }
  }
]