module.exports = {
  getXInfo(req) {
    const userId = req.headers["x-user-id"];
    const editor = req.headers["x-editor-id"];
    const reader = req.headers["x-reader-id"];
    return {
      userId,
      editor,
      reader,
    };
  },
};
