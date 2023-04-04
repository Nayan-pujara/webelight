const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");

dotenv.config({ path: "./.env" });

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Webelight api working.");
});

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(process.env.NODE_ENV);
  console.log(`Server running on port ${port}`);
});
