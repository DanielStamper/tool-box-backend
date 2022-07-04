require("dotenv").config();
// console.log(process.env); // remove this after you've confirmed it working
// import typeDefs from "./app/graphql/types";
// import resolvers from "./app/graphql/resolvers";
const typeDefs = require("./app/graphql/types");
const resolvers = require("./app/graphql/resolvers");

const { ApolloServer } = require("apollo-server");

// const knexHandle = require("knex")({
//   client: "pg",
//   connection: process.env.PG_CONNECTION_STRING,
//   searchPath: ["knex", "public"],
// });

const knexHandle = require("knex")({
  client: "pg",
  version: "7.2",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});

const createContext = async (args) => {
  return {
    ...args,
    db: knexHandle,
  };
};

// knex({ a: 'table', b: 'table' })
//   .select({
//     aTitle: 'a.title',
//     bTitle: 'b.title'
//   })
//   .whereRaw('?? = ??', ['a.column_1', 'b.column_2'])

// const createContext = async (args) => {
//   return await createAppContext({
//     ...args,
//     // tokenSecret: appSettings.tokenSecret,
//     db,
//     cores,
//     // log: logger.log,
//   });
// };

const apolloServer = new ApolloServer({
  typeDefs,
  context: createContext,
  debug: true,
});

// await apolloServer.start();
apolloServer.listen().then(() => {
  console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000
    📭  Query at https://studio.apollographql.com/dev
`);
  const result = knexHandle("users").select("*").where({ name: "Dave" });

  console.log(result);
});
