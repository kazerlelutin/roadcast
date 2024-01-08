module.exports = {
  getXInfo(req) {
    const decodeHeader = (value) => {
      try {
        return decodeURIComponent(value.replace(/\+/g, " "));
      } catch (e) {
        console.error("Erreur de décodage:", e);
        return value;
      }
    };

    const userId = decodeHeader(req.headers["x-user-id"]);
    const editor = decodeHeader(req.headers["x-editor-id"]);
    const reader = decodeHeader(req.headers["x-reader-id"]);

    return {
      userId,
      editor,
      reader,
    };
  },
};
