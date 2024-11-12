import express from "express";
import { geoDataController } from "../controllers/geoDataController";
import { auth } from "../middleware/auth";
import { upload } from "../middleware/upload";

const router = express.Router();

router.post("/upload", auth, upload.single("file"), geoDataController.upload);
router.get("/data", auth, geoDataController.getUserData);
router.patch("/data/:id/visibility", auth, geoDataController.toggleVisibility);
router.delete("/data/:id", auth, geoDataController.deleteData);

export default router;
