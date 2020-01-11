// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = monogodb.ObjectID;

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if(error){
        return console.log("Unable to connect to the database");
    }
    
    const db = client.db(databaseName);

   db.collection('tasks').deleteOne({
       description: "To read the next chapter"
   }).then((result) => {
       console.log(result);
   }).catch((error) => {
       console.log(error);
   })

})