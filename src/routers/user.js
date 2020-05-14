const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const User = require("../models/user");
const auth = require("../middleware/auth");
const { sendWelcomeEmail, sendCancelationEmail } = require("../emails/account");
const router = new express.Router();

// app.post("/users", (req, res) => {
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  // user
  //   .save()
  //   .then(() => {
  //     res.status(201).send(user);
  //   })
  //   .catch((e) => {
  //     res.status(400).send(e);
  //   });

  try {
    await user.save();
    sendWelcomeEmail(user.email, user.name);
    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// Login with username
router.post("/users/login", async (req, res) => {
  try {
    // Model Instance method -- this is because we have to fetch the data from db
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    // Accessible to instace method
    const token = await user.generateAuthToken();
    // Get public profile will send back only required data.
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

// Logout user
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

// Logout from all session
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];

    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

// To find all data
// app.get("/users", (req, res) => {
router.get("/users/me", auth, async (req, res) => {
  // User.find({})
  //   .then((users) => {
  //     res.send(users);
  //   })
  //   .catch((e) => {
  //     // 500 - Internal Server Error
  //     res.status(500).send();
  //   });
  //   try {
  //     const users = await User.find({});
  //     res.send(users);
  //   } catch (e) {
  //     res.status(500).send();
  //   }

  res.send(req.user);
});

// To find data with id
// app.get("/users/:id", (req, res) => {
// router.get("/users/:id", async (req, res) => {
//   const _id = req.params.id;

//   // User.findById(_id)
//   //   .then((user) => {
//   //     if (!user) {
//   //       return res.status(404).send();
//   //     }

//   //     res.send(user);
//   //   })
//   //   .catch((e) => {
//   //     res.status(500).send();
//   //   });
//   // Async await
//   try {
//     const user = await User.findById(_id);

//     if (!user) {
//       return res.status(404).send();
//     }
//     res.send(user);
//   } catch (e) {
//     res.status(500).send();
//   }
// });

// Use to update the data by id
router.patch("/users/me", auth, async (req, res) => {
  // The field which is not allowed to update
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    /* Mongoose middlware setup before saving */
    // const user = await User.findById(req.params.id);
    const user = req.user;

    updates.forEach((update) => {
      user[update] = req.body[update];
    });

    await user.save();

    // Just update directly
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Use to delete the own user profile data
router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    sendCancelationEmail(req.user.email, req.user.name);
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

// Upload user profile image
const upload = multer({
  // dest: "avatars", // It will no longer stored in avatar directory
  limits: {
    fileSize: 1000000, // 1MB file
  },
  fileFilter(req, file, cb) {
    // Allowing only jpg, jpeg and png file
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload image file"));
    }

    cb(undefined, true);
  },
});

// Handling authentication middleware before upload middleware
router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    // Convert the image using sharp npm package to png and resize the image
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer; // It will store the user avatar data by getting image data from file data
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    // Error handling if wrong file is uploaded
    res.status(400).send({ error: error.message });
  }
);

// Delete user specific profile pic
router.delete("/users/me/avatar", auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

// Fetching user avatart
router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    // If no data or no img found
    if (!user || !user.avatar) {
      throw new Error();
    }

    // Set response header for image
    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
