module.exports = [
  {
    /**
     * Get all broadcasts for an user
     */
    method: "GET",
    path: "/api/broadcasts/last",
    handler: async (req, h) => {
      //TODO ici on gère les last broadcasts
      return h.response([]).type("json");
    },
  },
  {
    /**
     * Create a broadcast
     */
    method: "POST",
    path: "/api/broadcast",
    handler: async (req, h) => {
      //TODO ici on créé un broadcast
      return h.response({
        editor: "123456789",
      }).type("json");
    },
  },
];
