const express = require("express");
const router = express.Router();
const projectModel = require("./projects-model");
const mw = require("./projects-middleware");

router.get("/", async (req, res, next) => {
  try {
    res.json(await projectModel.get());
  } catch (error) {
    next(error);
  }
});
router.get("/:id", mw.validateUserId, async (req, res, next) => {
  try {
    res.json(await req.user);
  } catch (error) {
    next(error);
  }
});
router.post("/", mw.validatePayload, async (req, res, next) => {
  try {
    let projectBody = {
      name: req.body.name,
      description: req.body.description,
      completed: req.body.completed,
    };
    const insertedProject = await projectModel.insert(projectBody);
    res.status(201).json(insertedProject);
  } catch (error) {
    next(error);
  }
});
router.put(
  "/:id",
  mw.validateUserId,
  mw.validatePayload,
  async (req, res, next) => {
    try {
      //   let projectBody = {
      //     name: req.body.name,
      //     description: req.body.description,
      //     completed: req.body.completed,
      //   };bu kısmı yazmayıp direkt req.body deyince de oluyor.
      const updatedProject = await projectModel.update(req.params.id, req.body);
      res.status(200).json(updatedProject);
    } catch (error) {
      next(error);
    }
  }
);
router.delete("/:id", mw.validateUserId, async (req, res, next) => {
  try {
    await projectModel.remove(req.params.id);
    res.json({ message: "Proje silindi." });
  } catch (error) {
    next(error);
  }
});
router.get("/:id/actions", mw.validateUserId, async (req, res, next) => {
  try {
    res.json(await projectModel.getProjectActions(req.params.id));
  } catch (error) {
    next(error);
  }
});
module.exports = router;
