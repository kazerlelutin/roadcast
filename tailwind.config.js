module.exports = {
  darkMode: 'class',
  content: [
    './public/*.css',
    './front/pages/*.html',
    './front/templates/**/*.html',
    './front/ctrl/**/*.js',
    './front/index.html',
    './libs/*.js',
    './front/utils/**/*.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Inter', 'sans-serif'],
        mono: ['Inter', 'sans-serif']
      },
      colors: {
        rc: {
          bg: '#1f253d',
          'bg-dark': '#121523',
          'card-bg': '#50597b',
          card: '#394264',
          'card-dark': '#363f61',
          text: '#fff',
          'text-invert': '#ffffff',
          highlight: '#11a8ab',
          'highlight-dark': '#0a888a',
          warning: '#cc324b',
          'warning-light': '#e64c65',
          light: '#fcb150',
          info: '#1a4e95',
          'info-light': '#3468af'
        },
        light: {
          bg: '#f7f6f3',
          'bg-dark': '#bec0c7',
          text: '#121523',
          'text-invert': '#fff',
          'highlight-dark': '#015657',
          card: '#d4dadd',
          'card-dark': '#8690b3'
        },

        twitch: {
          primary: '#5c16c5'
        },
        canvas: {
          default: '#121523'
        }
      }
    }
  },
  plugins: []
}
