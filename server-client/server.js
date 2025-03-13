const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const path = require("path");
const schema = require("./graphql-schema");
const resolvers = require("./resolvers");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "../client")));

app.use("/graphql", graphqlHTTP({ schema, rootValue: resolvers, graphiql: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.listen(3000, () => console.log("Client server running at http://localhost:3000"));
