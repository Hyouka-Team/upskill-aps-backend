// npm install --save neo4j-driver
// node example.js
const { application } = require("express");
const express = require("express");
const { server: db } = require("./db/db");
const schema = require("./schema/schema.js");
const { Neo4jGraphQL } = require("@neo4j/graphql");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { toGraphQLTypeDefs } = require("@neo4j/introspector");
console.log(schema);
// middleware
const app = express();
let PORT = 3000;
let driver;
const start = async (hi) => {
  try {
    driver = await db();
    await driver.getServerInfo();

    const neoSchema = new Neo4jGraphQL({ driver, typeDefs: schema });
    const server = new ApolloServer({
      schema: await neoSchema.getSchema(),
    });

    const { url } = await startStandaloneServer(server, {
      context: async ({ req }) => ({ req }),
      listen: { port: 4000 },
    });

    console.log(`🚀 Server ready at ${url}`);
    // app.use("/graphql",(req, res, next)=> {
    //   req.neo4j = driver
    //   next()
    // },   graphqlHTTP((req,res,graphQLParams)=>{
    //   return {}
    //   schema: buildSchema(`
    //   type Movie {
    //       title: String,
    //   }    type Person {
    //       name: String,
    //   `),
    //   rootValue:   {
    //     Movie: async (obj,args) => {
    //       await driver.executeQuery(`MATCH (a:Movie {title:${args.id}})`)
    //     return "Hello world!"
    //   },}
    //   graphiql: true,
    // }))
    app.listen(PORT || 4001, () => {
      console.log("The server running on port:", PORT);
    });
    console.log(hi);
  } catch (error) {
    console.log(error);
  }
};
const hi = async (driver) => {
  let session = driver.session({ database: "neo4j" });
  try {
    return session;
  } catch (err) {
    console.log(err);
  }
};
start(hi);
