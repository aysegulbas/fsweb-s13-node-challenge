// eylemlerle ilgili ara katman yazılımları yazın
const actionModel = require("./actions-model");
const projectModel = require("./actions-model");
async function validateActionId(req, res, next) {
  try {
    let existAction = await actionModel.get(req.params.id);
    if (existAction) {
      req.existAction = existAction;
      next();
    } else {
      res.status(404).json({ message: "Actions not found" });
    }
  } catch (error) {
    next(error);
  }
}
async function validateActionPayload(req, res, next) {
  try {
    let { project_id, description, notes } = req.body;
    if (!project_id || !description || !notes) {
      res.status(400).json({ message: "Eksik alanları kontrol ediniz." });
    } else {
      const existproject = await projectModel.get(project_id);
      if (!existproject) {
        res.status(400).json({ message: "Id kontrol ediniz" });
      } else {
        next();
      }
    }
  } catch (error) {
    next(error);
  }
}
module.exports = { validateActionId, validateActionPayload };
