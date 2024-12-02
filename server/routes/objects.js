const router = require("express").Router();
const mongoose = require("mongoose");
const Object = require("../models/Object.js");

// home page
router.get("/", async (req, res) => {
  try {
    locals = {
      title: "Home",
      description: "A site for tracking Geometry Dash progress",
    };

    let perPage = 10000;
    let page = req.query.page || 1;

    const data = await Object.aggregate([{ $sort: { title: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    // Count is deprecated - please use countDocuments({}) instead
    // const count = await Post.count();
    const count = await Object.countDocuments({});
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);
    const hasNextPagePlus = nextPage <= Math.ceil(count * perPage);

    res.render("index.ejs", {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      prevPage: hasNextPagePlus ? page - 1 : null,
    });
  } catch (error) {
    console.log(error);
  }
});

// show one page
router.get("/:id", async (req, res) => {
  try {
    locals = {
      title: "See Level",
      description: "A site for tracking Geometry Dash progress",
    };

    let perPage = 10000;
    let page = req.query.page || 1;

    const element = await Object.findOne({ _id: req.params.id });

    res.render("show-one.ejs", {
      locals,
      element,
    });
  } catch (error) {
    console.log(error);
  }
});

// addlevel page
router.get("/addlevel", async (req, res) => {
  try {
    locals = {
      title: "Add Level",
      description: "A site for tracking Geometry Dash progress",
    };

    res.render("add-level.ejs", {
      locals,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/addlevel", async (req, res) => {
  try {
    const newPost = new Object({
      name: req.body.name,
      difficulty: req.body.difficulty,
      completed: req.body.completed,
    });
    await Object.create(newPost);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

// editlevel page
router.get("/editlevel/:id", async (req, res) => {
  try {
    locals = {
      title: "Add Level",
      description: "A site for tracking Geometry Dash progress",
    };

    const data = await Object.findOne({ _id: req.params.id });

    res.render("edit-level.ejs", {
      locals,
      data,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/editlevel", async (req, res) => {
  try {
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

router.post("/editlevel/:id", async (req, res) => {
  try {
    if (req.body.completed) {
      await Object.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        difficulty: req.body.difficulty,
        completed: req.body.completed,
      });
    } else {
      await Object.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        difficulty: req.body.difficulty,
        completed: "off",
      });
    }
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

// delete level
router.post("/deletelevel/:id", async (req, res) => {
  try {
    await Object.deleteOne({ _id: req.params.id });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
