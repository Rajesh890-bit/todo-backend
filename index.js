const express = require("express");
const cors = require("cors");

const { connection } = require("./db");

const { userRouter } = require("./routes/User.routes");
var jwt = require("jsonwebtoken");

require("dotenv").config();

const { auth } = require("./middleware/auth.middleware");
const { noteRouter } = require("./routes/Notes.routes");

const app = express();

app.use(cors());

app.use(express.json());
app.use("/users", userRouter);

//protected
app.use(auth); // below this line routes are protected

app.use("/notes", noteRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`Connected to the DB ${process.env.port}`);
  } catch (error) {
    console.log(error);
    console.log("Cannot Connect to the DB");
  }
});
