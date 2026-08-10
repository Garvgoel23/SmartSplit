import { Router } from "express";
import {
  createGroup,
  getGroups,
  getGroupById,
  addMember,
  removeMember,
  deleteGroup
} from "../controllers/group.controller.js";

const router = Router();

router.post("/", createGroup);
router.get("/", getGroups);
router.get("/:id", getGroupById);
router.delete("/:id", deleteGroup);
router.post("/:id/members", addMember);
router.delete("/:id/members/:memberId", removeMember);

export default router;
