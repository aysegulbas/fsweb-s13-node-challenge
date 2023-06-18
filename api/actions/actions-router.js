const express = require("express");
const router = express.Router();
const actionModel = require("./actions-model");
const mw = require("./actions-middlware");
router.get("/", async (req, res, next) => {
  try {
    res.json(await actionModel.get());
  } catch (error) {
    next(error);
  }
});
router.get("/:id", mw.validateActionId, async (req, res, next) => {
  try {
    res.json(req.existAction);
  } catch (error) {
    next(error);
  }
});
router.post(
  "/",
  mw.validateActionId,
  mw.validateActionPayload,
  async (req, res, next) => {
    try {
      let actionBody = {
        project_id: req.body.project_id,
        description: req.body.description,
        notes: req.body.notes,
      };
      const instertedAction = await actionModel.insert(actionBody);
      res.status(201).json(instertedAction);
    } catch (error) {
      next(error);
    }
  }
);
router.put(
  "/:id",
  mw.validateActionId,
  mw.validateActionPayload,
  async (req, res, next) => {
    try {
      const updatedAction = await actionModel.update(req.params.id, req.body);
      res.status(201).json(updatedAction);
    } catch (error) {
      next(error);
    }
  }
);
router.delete("/:id", mw.validateActionId, async (req, res, next) => {
  try {
    await actionModel.remove(req.params.id);
    res.json({ message: "Action silindi" });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
