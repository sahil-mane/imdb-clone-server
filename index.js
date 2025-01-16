const express = require('express');
const connectDB = require("./libs/db");
const router = require("./routes/UserRoutes");
const cors = require("cors");
const { createAdminAccount } = require('./libs/setup');
const MovieRouter = require('./routes/MovieRoutes');
const app = express();
require("dotenv").config();
const port = 3000;

app.use(express.json())
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use("/api/auth",router);
app.use("/movies",MovieRouter)

createAdminAccount();
//connection to db
connectDB();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
      