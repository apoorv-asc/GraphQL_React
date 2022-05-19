const express = require("express");
const app = express();

const {graphqlHTTP} = require("express-graphql");

const schema = require("./schema/schema");

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
