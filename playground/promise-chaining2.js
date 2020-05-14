require("../src/db/mongoose");
const Task = require("../src/models/task");

// 5eba4d816d117f77989e43e0

// Task.findByIdAndDelete("5eba4d816d117f77989e43e0")
//   .then((task) => {
//     console.log(task);

//     // This is called promise chaining
//     return Task.countDocuments({ completed: false });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// Async await function
const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });

  return count;
};

deleteTaskAndCount("5eba7c3b3457313ef1d2f977")
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });
