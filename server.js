const express = require("express");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const app = express();
const axios = require("axios");
const schema = buildSchema(`
    type user{
        firstName : String
        lastName : String
        college : String
        age : Int
    }
    type Posts {
        userId : Int
        id :  Int
        title : String
        body : String
    }
    type Query{
        hello : String
        welcomeMessage(name : String!, day : String!) : String
        getUser : user
        getDataFromAPI : [Posts]
    }
`);

const root = {
  hello: () => {
    return "Hello world";
  },
  welcomeMessage: (args) => {
    console.log(args);
    return `Hi, there ${args.name}, today is ${args.day}`;
  },
  getUser: () => {
    const user = {
      firstName: "Faisal",
      lastName: "Sayed",
      college: "IIT Bombay",
      age: 23,
    };
    return user;
  },
  getDataFromAPI: async () => {
    const result = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return result.data;
  },
};
app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: schema,
    rootValue: root,
  })
);
app.listen(4000, () => {
  console.log("⚙ Server Running on port 4000");
});
