const express = require("express");
const router = express.Router();
const {
  createProject,
  getAllProjects,
  getProject,
  updateProject,
  deleteProject,
  addTeamMember,
  removeTeamMember,
} = require("../controller/project.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

router.post("/", authMiddleware, createProject);
router.get("/", authMiddleware, getAllProjects);
router.get("/:projectId", authMiddleware, getProject);
router.put("/:projectId", authMiddleware, updateProject);
router.delete("/:projectId", authMiddleware, deleteProject);
router.post("/:projectId/team", authMiddleware, addTeamMember);
router.delete("/:projectId/team", authMiddleware, removeTeamMember);

module.exports = router;
