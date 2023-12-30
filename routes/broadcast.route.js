
module.exports = [
    {
        method: "GET",
        path: "/api/broadcasts/last",
        handler: async (req, h) =>  {
            //TODO ici on gère les last broadcasts
            return h.response([]).type('json');
        }
       
      }
]
  