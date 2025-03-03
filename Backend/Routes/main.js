import express from "express";
import { digitalNegative} from "../Controllers/main.js";
import { upload } from "../middleware/uploadhostfiles.js";
const router=express.Router();

router.post("/digital-negative",upload.single("image"),digitalNegative);

export default router;