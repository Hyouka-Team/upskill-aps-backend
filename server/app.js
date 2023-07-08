const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");

// cross origin
const cors = require("cors");

//enviroment variables
require("dotenv").config();

// database
let uri = process.env.DB_URI.replace(
  "<username>",
  process.env.DB_USERNAME
).replace("<password>", encodeURIComponent(process.env.DB_PASSWORD));

const mongoose = require("mongoose");
mongoose.connect(uri);
mongoose.connection.once("open", () => {
  console.log("The database is ready to use");
});

// express app
const app = express();
app.use(cors());

// bind express with graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("now listening for requests on port 4000");
});
