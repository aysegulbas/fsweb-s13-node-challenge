const projectModel = require("../projects/projects-model");
async function validateUserId(req, res, next) {
  try {
    const user = await projectModel.get(req.params.id);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({ message: "Proje bulunamadı." });
    }
  } catch (error) {
    next(error);
  }
}
function validatePayload(req, res, next) {
  try {
    let { name, description } = req.body;
    if (!name || !description) {
      res.status(400).json({ message: "Eksik alanları kontrol ediniz" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { validateUserId, validatePayload };
