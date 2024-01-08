const Joi = require("joi");
const { getXInfo } = require("../services/get-x--info");
const {
  createBroadcastHistory,
  getBroadcastsHistoryByUserId,
  findOrCreateHistory,
} = require("../services/broadcast-history.service");
const {
  getBroadcastById,
  createBroadcast,
  getBroadcastByEditor,
  getBroadcastByReader,
  updateBroadcast,
} = require("../services/broadcasts.service");
const { getEditorsByBroacastId } = require("../services/editors.service");
module.exports = [
  {
    /**
     * Get all broadcasts for an user
     */
    method: "GET",
    path: "/api/broadcasts/last",
    handler: async (req, h) => {
      const { userId } = getXInfo(req);
      const broadcasts = await getBroadcastsHistoryByUserId(userId);
      return h.response(broadcasts).type("json");
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

      if (!userId) {
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
        name: Joi.string()
          .trim()
          .pattern(/^[^<>]*$/)
          .required(),
      });

      try {
        const { value } = schema.validate(payload);
        const broadcastId = await createBroadcast({ ...value });

        await createBroadcastHistory(broadcastId, userId);
        const broadcast = await getBroadcastById(broadcastId);

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
  {
    /**
     * Get all broadcasts for an user
     */
    method: "GET",
    path: "/api/broadcast",
    handler: async (req, h) => {
      const { userId, editor, reader } = getXInfo(req);

      if (editor) {
        const broadcast = await getBroadcastByEditor(editor);
        if (!broadcast.id)
          h.response({ message: "not found" }).type("json").code(404);
        await findOrCreateHistory(broadcast.id, userId);
        const editors = await getEditorsByBroacastId(broadcast.id);
        return h.response({ broadcast, editors }).type("json");
      }

      if (reader) {
        const broadcast = await getBroadcastByReader(editor);
        if (broadcast.id) await findOrCreateHistory(broadcast.id, userId);
        return h.response({ broadcast }).type("json");
      }
      return h.response({ message: "not found" }).type("json").code(404);
    },
  },
  {
    /**
     * update a broadcast
     */
    method: "PUT",
    path: "/api/broadcast",
    handler: async (req, h) => {
      const { editor } = getXInfo(req);
      if (!editor)
        return h.response({ message: "not found" }).type("json").code(404);
      const body = JSON.parse(req.payload);

      const schema = Joi.object({
        // eviter les injections XSS
        name: Joi.string()
          .trim()
          .pattern(/^[^<>]*$/)
          .required(),
      });

      try {
        const { value } = schema.validate(body);
        await updateBroadcast(value, editor);
        return h.response({}).type("json");
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
