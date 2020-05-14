require("../src/db/mongoose");

const User = require("../src/models/user");

// 5eba48873f31528c6c8522e6
// Promise chaining example

// User.findByIdAndUpdate("5eba48873f31528c6c8522e6", { age: 1 })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 1 });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// Async Await Example
const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });

  return count;
};

updateAgeAndCount("5eba48873f31528c6c8522e6", 2)
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });
