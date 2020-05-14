const express = require("express");
require("./db/mongoose");

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || PORT;

// Without middleware
// New request -> run route handler

// With middleware
// New request -> do something -> run route handler

// do something is function which will run before the routing . For eg validating token of user etc

// Express middleware
// app.use((req, res, next) => {
//   // next is specific to register the middlware
//   if (req.method === "GET") {
//     res.send("GET requests are disabled");
//   } else {
//     next();
//   }
// });

// Express middleware for maintenance mode
// app.use((req, res, next) => {
//   res.status(503).send("Site is currently down. Check back soon!");
// });

// File upload in express
// const multer = require("multer");
// const upload = multer({
//   dest: "images", // name of the folder
//   limits: {
//     fileSize: 1000000, // 1MB file
//   },
//   fileFilter(req, file, cb) {
//     // Checks file name with extension
//     // if (!file.originalname.endsWith(".pdf")) {
//     //   return cb(new Error("Please upload a PDF"));
//     // }

//     // Check file name with multiple extension using regular expression
//     if (!file.originalname.match(/\.(doc|docx)$/)) {
//       return cb(new Error("Please upload a word document"));
//     }

//     cb(undefined, true);

//     // cb(new Error("File must be a PDF")); // Send Error
//     // cb(undefined, true); // Send true
//     // cb(undefined, false); // Send false
//   },
// });

// // Error Handling using middleware
// // const errorMiddleware = (req, res, next) => {
// //   throw new Error("From my middleware");
// // };

// app.post(
//   "/upload",
//   upload.single("upload"),
//   (req, res) => {
//     res.send();
//   },
//   (error, req, res, next) => {
//     // This is error handling to send customize message to the user
//     res.status(400).send({ error: error.message });
//   }
// );

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

/*
  This is the basic routing code when seprating routing files using express js

const router = new express.Router();
router.get("/test", (req, res) => {
  res.send("This is from my other router");
});

app.use(router); 
*/

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

// To JSON example
// const pet = {
//   name: "Hal",
//   age: 22,
// };

// pet.toJSON = function () {
//   delete pet.age;

//   return pet;
// };

// console.log(JSON.stringify(pet));

/*
Virtual relationship concept

*/
// const Task = require("./models/task");
// const User = require("./models/user");

// const main = async () => {
//   //const task = await Task.findById("5ebbe6d99b612f2a44dbe40e");

//   // It will find the owner assosiated with task model
//   // await task.populate("owner").execPopulate();
//   // console.log(task.owner);
//   const user = await User.findById("5ebbe6d99b612f2a44dbe40e");
//   await user.populate("tasks").execPopulate();
//   console.log(user.tasks);
// };

// main();
