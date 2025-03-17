const User = require("../models/user");

async function handleUserSignup(req, res) {
  let { name, email, password } = req.body;
  email = email.toLowerCase();
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  let { email, password } = req.body;
  email = email.toLowerCase();
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);

    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("login", {
      error: "Incorrect Email or Password",
    });
  }
}

const handleLogout = (req, res) => {   res.clearCookie("token").redirect("/");  }

module.exports = {
  handleUserSignup,
  handleUserLogin,
  handleLogout,
};