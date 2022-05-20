const express = require("express");
const app = express();
const mongoose = require('mongoose');

const cors = require('cors');
app.use(cors());

const {graphqlHTTP} = require("express-graphql");
const schema = require("./schema/schema");

mongoose.connect('mongodb+srv://apoorv123:lifeanddeath@devconnector.zjpww.mongodb.net/graphql?retryWrites=true&w=majority')
mongoose.connection.once('open',()=>{
  console.log('Database connected');
})

app.use('/graphql',graphqlHTTP({
  schema:schema,
  graphiql:true
}));

app.get('/',(req,res)=>{
  res.send('Server started');
})

app.listen(4000, () => {
  console.log("App Started on Port 4000");
});
