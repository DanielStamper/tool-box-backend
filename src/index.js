const { ApolloServer } = require("apollo-server");
const typeDefs = require("./graphql/types/userTypes");

const pg = require("knex")({
  client: "pg",
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: ["knex", "public"],
});

const knex = require("knex")({
  client: "pg",
  version: "7.2",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "daniel",
    password: "abc123",
    database: "toolbox",
  },
});

// knex({ a: 'table', b: 'table' })
//   .select({
//     aTitle: 'a.title',
//     bTitle: 'b.title'
//   })
//   .whereRaw('?? = ??', ['a.column_1', 'b.column_2'])

// const mocks = {
//   Query: () => ({
//     tracksForHome: () => [...new Array(9)],
//   }),
//   Track: () => ({
//     id: () => "track_01",
//     title: () => "Astro Kitty, Space Explorer",
//     author: () => {
//       return {
//         name: "Grumpy Cat",
//         photo:
//           "https://res.cloudinary.com/dety84pbu/image/upload/v1606816219/kitty-veyron-sm_mctf3c.jpg",
//       };
//     },
//     thumbnail: () =>
//       "https://res.cloudinary.com/dety84pbu/image/upload/v1598465568/nebula_cat_djkt9r.jpg",
//     length: () => 1210,
//     modulesCount: () => 6,
//   }),
// };
const createContext = async (args) => {
  const db = new Database({ knexHandle, schema: appSettings.dbSchema });
  return await createAppContext({
    ...args,
    // tokenSecret: appSettings.tokenSecret,
    db,
    cores,
    // log: logger.log,
  });
};

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
});
