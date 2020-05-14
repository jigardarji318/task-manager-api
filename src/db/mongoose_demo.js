const mongoose = require("mongoose");
const validator = require("validator");

// DB URL with database name
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// Defining the model
// const User = mongoose.model("User", {
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     lowercase: true,
//     validate(value) {
//       if (!validator.isEmail(value)) {
//         throw new Error("Email is invalid");
//       }
//     },
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 7,
//     trim: true,
//     validate(value) {
//       if (value.toLowerCase().includes("password")) {
//         throw new Error("Password cannot contain 'password'");
//       }
//     },
//   },
//   age: {
//     type: Number,
//     default: 0,
//     // Validation part
//     validate(value) {
//       if (value < 0) {
//         throw new Error("Age must be a positive number");
//       }
//     },
//   },
// });

const Task = mongoose.model("Tasks", {
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// Store data to the db
// const me = new User({
//   name: "Jigar ",
//   email: "jigar@test.com",
//   password: " jigar123 ",
// });

// // Save to the database
// me.save()
//   .then((result) => {
//     console.log(me);
//   })
//   .catch((error) => {
//     console.log("Error!", error);
//   });

const task = new Task({
  description: "Task 1",
  completed: true,
});

task
  .save()
  .then((result) => {
    console.log(task);
  })
  .catch((error) => {
    console.log("Error!", error);
  });
