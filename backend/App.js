const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const ArtistsData = require("./Models/ArtistsData");
const givenData = require("./Files/data.json");
const { getData, updatePaymentStatus, addArtist } = require("./graphql/Resolver");
const { buildSchema } = require("graphql");
const Schema = require("./graphql/Schema");

/**
 * Checking if data exists or not and populating Table with the existing data
 */

ArtistsData.sync()
  .then(() => {
    ArtistsData.findAll()
      .then((data) => {
        if (data.length == 0) {
          ArtistsData.bulkCreate(givenData.data)
            .then((data) => {})
            .catch((err) => {
              console.log(err.message);
            });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  })
  .catch((err) => {
    console.log(err.message);
  });


const typeDefs = Schema;



const resolvers = {
  Query: {
    getData: getData,
  },
  Mutation: {
    updatePaymentStatus: updatePaymentStatus,
    addArtist:addArtist
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server, { listen: { port: 5000 } }).then(({ url }) => {
  console.log(url);
});
