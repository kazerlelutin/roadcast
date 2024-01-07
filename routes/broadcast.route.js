const Joi = require("joi");
const { getXInfo } = require("../services/get-x--info");
const { createBroadcastHistory } = require("../services/broadcast-history.service");
const { getBroadcastById, createBroadcast } = require("../services/broadcasts.service");
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
      const { userId } = getXInfo(req);

      if(!userId) {
        return h
          .response({
            error: "Missing user id",
          })
          .code(400)
          .type("json");
      }

      const payload = JSON.parse(req.payload);

      const schema = Joi.object({
        // eviter les injections XSS
        name: Joi.string().trim().pattern(/^[^<>]*$/).required()
      });

      try {
        const { value } = schema.validate(payload);
        const broadcastId = await createBroadcast({ ...value });

        await createBroadcastHistory(broadcastId, userId);
        const broadcast = await getBroadcastById(broadcastId);

        console.log(broadcast);

        return h
          .response({
            editor: broadcast.editor,
          })
          .code(201)
          .type("json");
      } catch (error) {
        return h
          .response({
            error: error.message,
          })
          .code(400)
          .type("json");
      }
    },
  },
];
