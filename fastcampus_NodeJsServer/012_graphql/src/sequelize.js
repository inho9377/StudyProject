const { ApolloServer, gql } = require('apollo-server')
const { sequelize, User, City } = require('./sequelize')

//!는 Not Null
const typeDefs = gql`
type User { 
  id: Int!
  name: String!
  age: Int!
  city: City
}

type City {
  id: Int!,
  name: String!
}

type Query {
  users: [User]
}
`


/**
 * @type {import('apollo-server').IResolver}
 */
const resolvers = {
  Query: {
    users: async () => {
      return Users.FindAll()
    }, 
  },

  User: {
    city: async(user) => { //user는 결과에 매핑될 객체부분
      return City.findOne({
        where: {
          id: user.cityId
        }
      })
    },
  },

  City: {
    users: async (city) => {
      return User.findAll({
        where: {
          cityId: city.id,
        },
      })
    },
  }

}

const {
  ApolloServerPluginLandingPageLocalDefault,
} = require('apollo-server-core')


async function main() {

  await sequelize.sync({force: true})
  const seoul = await City.build({
    name: 'Seoul'
  }).save()

  await User.build({
    age: 26,
    name: 'Coco',
    cityId: seoul.getDataValue('id')
  }).save()

  await User.build({
    age: 30,
    name: 'Eco',
    cityId: seoul.getDataValue('id')
  }).save()

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  })


server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})

}

main()
