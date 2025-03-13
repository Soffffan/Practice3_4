const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type Product {
    id: ID!
    name: String!
    price: Float!
    description: String
    categories: [String]!
  }
  type Query {
    products(fields: [String]): [Product]
  }
`);
