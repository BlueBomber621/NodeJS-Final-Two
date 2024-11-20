require("dotenv").config();

const expressLayouts = require("express-ejs-layouts");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

const connectDB = require("./server/config/db.js");
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(expressLayouts);
app.use(express.static("public"));
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app
  .use(cors())
  .use(express.json())
  .use((req, res, next) => {
    res.setHeader("Access-Allow-Control-Origin", "*");
    next();
  })
  .use("/", require("./server/routes/objects.js"));

app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`);
});
