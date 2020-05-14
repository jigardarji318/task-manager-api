// CRUD create read update delete

// const mongodb = require("mongodb");

// // Initialize MongoClient

// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

// const id = new ObjectID();
// console.log(id.id.length);
// console.log(id.toHexString().length);

// Connect to specific server
MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect!");
    }

    // Refering to particular collection
    const db = client.db(databaseName);

    // Insert data to particular collection
    // db.collection("users").insertOne(
    //   {
    //     name: "Shabin",
    //     age: 32,
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert user");
    //     }
    //     console.log(result.ops);
    //   }
    // );

    // Bulk Insertion
    // db.collection("users").insertMany(
    //   [
    //     {
    //       name: "Vihas",
    //       age: 3,
    //     },
    //     {
    //       name: "Pranav",
    //       age: 32,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert documents!");
    //     }

    //     console.log(result.ops);
    //   }
    // );

    // db.collection("tasks").insertMany(
    //   [
    //     {
    //       description: "Task 1",
    //       completed: true,
    //     },
    //     {
    //       description: "Task 2",
    //       completed: false,
    //     },
    //     {
    //       description: "Task 3",
    //       completed: false,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert tasks!");
    //     }

    //     console.log(result.ops);
    //   }
    // );

    // Find user data with findOne
    // db.collection("users").findOne(
    //   { _id: new ObjectID("5eb92f434551e15cf4710304") },
    //   (error, user) => {
    //     if (error) {
    //       return console.log("Unable to fetch!");
    //     }

    //     console.log(user);
    //   }
    // );

    // db.collection("users")
    //   .find({ age: 32 })
    //   .toArray((error, users) => {
    //     console.log(users);
    //   });

    // db.collection("users")
    //   .find({ age: 32 })
    //   .count((error, count) => {
    //     console.log(count);
    //   });

    // db.collection("tasks").findOne(
    //   { _id: new ObjectID("5eb92ac66946ce15d8493b4e") },
    //   (error, task) => {
    //     if (error) {
    //       return console.log("No task data found!");
    //     }

    //     console.log(task);
    //   }
    // );

    // db.collection("tasks")
    //   .find({ completed: false })
    //   .toArray((error, tasks) => {
    //     if (error) {
    //       return console.log("No data found!");
    //     }

    //     console.log(tasks);
    //   });

    // Update one document
    // db.collection("users")
    //   .updateOne(
    //     { _id: new ObjectID("5eb92800fb72aa1a581814f8") },
    //     {
    //       $inc: {
    //         age: 1,
    //       },
    //     }
    //   )
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // Update Many Examples

    // db.collection("tasks")
    //   .updateMany(
    //     { completed: false },
    //     {
    //       $set: {
    //         completed: true,
    //       },
    //     }
    //   )
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // Delete Many

    // db.collection("users")
    //   .deleteMany({
    //     age: 32,
    //   })
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // Delete Single document

    db.collection("tasks")
      .deleteOne({
        description: "Task 3",
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
