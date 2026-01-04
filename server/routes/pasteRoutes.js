import express from "express"
import { createPaste , deletePaste, editPaste, fetchPastes, viewPaste} from "../controllers/pasteController.js";
import { auth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/CreatePaste", auth, createPaste);
router.get("/my-pastes" , auth , fetchPastes);
router.delete("/delete/:id" , auth , deletePaste);
router.get("/view/:id" , auth , viewPaste);
router.patch("/update/:id" , auth , editPaste);



export default router; 
