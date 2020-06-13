const { GraphQLServer } = require('graphql-yoga');


const resolvers = require('./resolvers/resolvers');
const PORT = process.env.PORT ||3000;

const servidor = new GraphQLServer({
  typeDefs: __dirname + '/schema.graphql',
  resolvers,
});

servidor.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


servidor.start({port:PORT}, () => console.log('El servidor se está ejecutando en http://localhost:' + PORT));