const Joi = require("joi");
const { createChronicle, updateChronicle } = require("../services/chronicles.service");
const { getXInfo } = require("../services/get-x--info");

module.exports = [
  {
    /**
    * create a chronicle     
    **/
    method: "POST",
    path: "/api/chronicle",
    handler: async (req, h) => {
      const { editor } = getXInfo(req);

      const schema = Joi.object({
        position: Joi.number().required(),
      });

      try {
        const { value } = schema.validate(JSON.parse(req.payload));

        const chronicles = await createChronicle({
          editor,
          ...value,
        });
        return h.response(chronicles).type("json").code(201);
      } catch (e) {
        console.log("create chronicle: ", e);
        return h
          .response({
            error: "Error creating chronicle",
          })
          .code(500)
          .type("json");
      }
      //TODO brancher les SOCKETS
    },
  },
  {
    /**
    * update a chronicle     
    **/
    method: "PUT",
    path: "/api/chronicle/{id}",
    handler: async (req, h) => {
      const {id} = req.params;
      const { editor } = getXInfo(req);
      const schema = Joi.object({
        position: Joi.number(),
        content: Joi.string(),
        title: Joi.string(),
        source: Joi.string(),

      });

      try {
        const { value } = schema.validate(JSON.parse(req.payload));

        console.log("value", {...value});
        await updateChronicle(id, editor, {...value});
        return h.response({message:'ok'}).type("json").code(200);
      } catch (e) {
        console.log("update chronicle: ", e);
        return h
          .response({
            error: "Error updating chronicle",
          })
          .code(500)
          .type("json");
      }
      //TODO brancher les SOCKETS
    },
  },
];
