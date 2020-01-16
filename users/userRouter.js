const express = require("express");

const router = express.Router();

const Hubs = require("./userDb.js");

const posts = require("../posts/postDb");

router.post("/", validateUser, (req, res) => {
  // do your magic!
  Hubs.insert(req.body)
    .then(resp => {
      res.status(201).json("User created");
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error creating new user"
      });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  // do your magic!
  const { id } = req.params;
  const sendPackage = {
    user_id: id,
    text: req.body.text
  };
  posts
    .insert(sendPackage)
    .then(resp => {
      res.status(201).json("New post created");
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error creating new post"
      });
    });
});

router.get("/", (req, res) => {
  // do your magic!
  Hubs.get()
    .then(resp => {
      res.status(200).json(resp);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error getting users"
      });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  // do your magic!
  Hubs.getById(req.params.id)
    .then(resp => {
      res.status(200).json(resp);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error getting user"
      });
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  // do your magic!
  posts
    .getById(req.params.id)
    .then(resp => {
      res.status(200).json(resp);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error getting posts"
      });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  // do your magic!
  Hubs.remove(req.params.id)
    .then(resp => {
      res.status(200).json(resp);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error deleting user"
      });
    });
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  // do your magic!
  Hubs.update(req.params.id, req.body)
    .then(resp => {
      res.status(200).json(resp);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error updating user"
      });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const userIds = [];
  if (req.params.id) {
    const { id } = req.params;
    Hubs.get()
      .then(response => {
        response.map(element => {
          userIds.push(element.id);
        });
        if (userIds.includes(Number(id))) {
          next();
        } else {
          res.status(400).json({ error: "Invalid" });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}

function validateUser(req, res, next) {
  // do your magic!
  if (req.body) {
  } else {
    res.status(400).json({ message: "missing user data" });
  }
  if (req.body.name) {
    next();
  } else {
    res.status(400).json({ message: "missing required name field" });
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if (req.body) {
  } else {
    res.status(400).json({ message: "missing post data" });
  }
  if (req.body.text) {
    next();
  } else {
    res.status(400).json({ message: "missing required text field" });
  }
}

module.exports = router;
