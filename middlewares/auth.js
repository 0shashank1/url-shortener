const { validateToken } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  const token = req.cookies?.token;

  if (!token) return res.redirect("/login");
  const user = validateToken(token);

  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const token = req.cookies?.token;

  const user = validateToken(token);

  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};