import FullReload from 'vite-plugin-full-reload'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [FullReload(['**/*.html'])],
  server: {
    proxy: {
      '/api': 'http://localhost:3000', // Redirige les requêtes de /api vers le serveur Hapi,
      '/uploads': 'http://localhost:3000' // Redirige les requêtes de /uploads vers le serveur Hapi
    }
  },
  public: './public',
  root: './front',
  preserveSymlinks: true
})
