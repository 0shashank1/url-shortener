const User = require("../models/user");
const crypto = require("crypto");
const nodemailer = require("nodemailer");


async function sendEmail(email, password) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "pikaa3955@gmail.com",      
      pass: "jjjz rghr duts xrno",        
    },
  });

  const mailOptions = {
    from: "pikaa3955@gmail.com",
    to: email,       
    subject: "your password",
    text: "your password is " + password,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("email sent sucess");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}


async function handleUserSignup(req, res) {
  let { name, email, password } = req.body;
  email = email.toLowerCase();
  const user = await User.findOne({ email: email });
  if(user){
    return res.render("signup", {
    error: "email already exists",
    });
  }
  
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
    const user = await User.findOne({ email });
    const name = user.name;
    return res.cookie("token", token).
                cookie("email", req.body.email).
                cookie("name", name).
                redirect("/");
  } catch (error) {
    return res.render("login", {
      error: "Incorrect Email or Password",
    });
  }
}

const handleLogout = (req, res) => {   res.clearCookie("token").redirect("/");  }

const handleEditProfile = (req,res) => {
 
  return res.render("editprofile", {
    name: req.cookies.name
  });
}



const handleUpdateUserName = async (req, res) => {
  if(!req.body || !req.body.username ) {
    return res.render("editprofile", {
      name: req.cookies.name,
      error: "please enter username",
    });
  }
  await User.updateOne({ email: req.cookies.email }, { $set: { name: req.body.username } });
  req.user = {
    ...req.user,
    name: req.body.username,
  }
  req.cookies.name = req.body.username;
  return res.render("editprofile", {
    name: req.body.username,
  });  

}


const handleupdateUserPassword = async (req, res) => {
  const email = req.cookies.email;
  const newPassword = req.body.password;
  try {
    const message = await User.changePassword(email, newPassword);
    return res.render("editprofile", {
      name: req.cookies.name,
    }); 
  } catch (err) {
      console.log(err);
  }
}



const handleResetPassword = async (req, res) => {
  try {
    if(req.body && req.body.email){
      let email = req.body.email;
      email = email.toLowerCase();
      const user = await User.findOne({ email });
      if (!user){
         // throw new Error("User not found");
         return res.render("reset", {
          error: "user not found"
         });

      } 
      const newPassword = crypto.randomBytes(10)
                          .toString("base64")
                          .replace(/[^a-zA-Z0-9]/g, '') 
                          .slice(0, 10);      
      try {
        const message = await User.changePassword(email, newPassword);
        await sendEmail(email, newPassword);
        return res.render("reset", {
            message: "reset sucess"
          });

      } catch (err) {
          return res.render("reset", {
            error: "error in reset"
          });
      }

  }
}
catch(err){
  console.log("error");
}
}



module.exports = {
  handleUserSignup,
  handleUserLogin,
  handleLogout,
  handleEditProfile,
  handleUpdateUserName,
  handleupdateUserPassword,
  handleResetPassword
};