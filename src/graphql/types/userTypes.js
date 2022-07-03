const { gql } = require("apollo-server");

/**
 * Note that I am just using a single schema file with everything for now
 */
const typeDefs = gql`
  type Query {
    "Return a list of Users"
    users: [User]
    # "Return a list of Products"
    # products: [Product]
  }

  "A user in the System, currently only Seller or Buyer"
  type User {
    id: ID!
    name: String!
    address: String #Change to object later
    reputation: Int
    "User type: Buyer (Producer) 1, Seller (Consumer) 2"
    usertype: Int
  }

  input UserInput {
    name: String
    address: String
    reputation: Int
  }

  input UserFilter {
    id: [ID]
    keyword: String
  }

  type Mutation {
    userCreate(params: UserInput): User
    userUpdate(id: ID!, params: UserInput): User
    userRemove(id: ID!): User
    userRemoveMany(id: [ID!]!): User
  }

  # enum AllowedUom {
  #   KG
  #   LB
  #   Oz
  #   L
  #   ml
  #   Bushel
  # }

  # "A product that can be sold from a Producer to a Buyer in a contract"
  # type Product @key(fields: "id") {
  #   "Batch ID for "
  #   id: ID!
  #   owner: User
  #   description: String
  #   "unit of measure (i.e. KG, LB, L, ..."
  #   uom: String!
  #   "Total quantity of a given product in inventory"
  #   batchQty: Float!
  #   "Quality of a product"
  #   batchQuality: String!
  # }

  # input ProductInput {
  #   description: String
  #   uom: AllowedUom
  #   batchQty: Float
  #   batchQuality: String
  # }

  # "An agreement for a specific quantity of a single product"
  # type Contract @key(fields: "id") {
  #   id: ID!
  #   product: Product!
  #   "Unit of measure of product for contract"
  #   uom: String!
  #   qty: Int!
  #   price: Float!
  # }

  # "An Order is a collection of contracts between buyer and seller"
  # type Order @key(fields: "id") {
  #   id: ID!
  #   "Optional description for the contract"
  #   description: String
  #   "List of individual contracts in the order"
  #   contracts: [Contract]
  #   buyer: User!
  #   seller: User!
  #   review: OrderReview
  #   "OrderState: sellerAgrees 1, buyerAgrees 2, completed 4, problem 8"
  #   state: String!
  #   notes: String
  #   # orderDate:
  #   # completionDate
  # }

  # "The Reviews for an Order from the relevant Buyer and Seller. Maybe the key should be order?"
  # type OrderReview @key(fields: "id") {
  #   id: ID!
  #   order: Order!
  #   reviewFromBuyer: String
  #   reviewFromSeller: String
  #   ratingFromBuyer: Int
  #   ratingFromSeller: Int
  # }
`;

module.exports = typeDefs;
