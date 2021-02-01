const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const cors = require('cors');
const {
  errorHandler,
  notFoundHandler,
} = require("./middlewares/errorMiddlewares");

dotenv.config();

const app = express();
app.use(bodyParser.json({ extended: false }));
app.use(cors());

connectDB();

app.get("/", (req, res) => {
  res.send("Api is working fine");
});

app.use("/api/v1/products", require("./routes/products"));
app.use("/api/v1/users", require("./routes/users"));
app.use("/api/v1/orders", require("./routes/orders"));

app.get("/api/v1/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// error middlewares
app.use(errorHandler);
app.use(notFoundHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} on PORT ${PORT}`.yellow.bold
  )
);
