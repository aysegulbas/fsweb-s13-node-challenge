const express = require("express");
const server = express();
const actionRouter = require("../api/actions/actions-router");
const projectRouter = require("../api/projects/projects-router");

server.use(express.json());
server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);
server.get("/", (req, res) => {
  res.send("Server is up and running!...");
});
// Sunucunuzu yapılandırın
// Eylem routerınızı /api/actions/actions-router.js içinde oluşturun
// Proje roterlarınızı /api/projects/projects-router.js içinde oluşturun
// Bu dosyanın içinde `server.listen()` YAPMAYIN!

module.exports = server;
