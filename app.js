require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connect");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");
const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();
const PORT = process.env.PORT || 8001;
connectToMongoDB(process.env.MONGODB ).then(() =>
  console.log("Mongodb connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);


//everyone can access becasuse this route redirects
app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  return res.redirect(entry.redirectURL);
  // const url = entry.redirectURL;
  //const isvalid = url.startsWith("https://");
  // if(isvalid){
  //     return res.redirect(entry.redirectURL);
  // }
    // else{
    //   return res.render("home", {
    //   user: req.user,
    //   PORT: process.env.PORT,
    //   err: "invalid URL"
    //   });
    // }

      return res.render("home", {
      user: req.user,
      PORT: process.env.PORT,
      err: "invalid URL"
      });

});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));


