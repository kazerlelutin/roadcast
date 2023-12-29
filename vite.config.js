export default {
  server: {
    proxy: {
      "/api": "http://localhost:3000", // Redirige les requêtes de /api vers le serveur Hapi
    },
  },
  public: "./public",
  root: './front',
}
