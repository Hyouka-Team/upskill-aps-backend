const neo4j = require("neo4j-driver");

const server = async () => {
  //loading database
  return neo4j.driver(
    "bolt://127.0.0.1:7687",
    neo4j.auth.basic("neo4j", "admin1234")
  );
};

module.exports = {
  server,
};
