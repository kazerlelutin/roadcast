module.exports = [
  ...require("./broadcast.route"),
  require("./push.route"),
  require("./public.route"),
  require("./sw.route"),
  require("./assets.route"),
  require("./home.route")
];
