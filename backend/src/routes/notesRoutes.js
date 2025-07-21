import express from "express"
import { createNote, deleteNote, getNoteById, getAllNotes, putNote } from "../controlers/noteController.js";
const router = express.Router()


router.get("/", getAllNotes)
router.get("/:id", getNoteById)
router.post("/", createNote)
router.put("/:id", putNote)
router.delete("/:id", deleteNote)

export default router;





