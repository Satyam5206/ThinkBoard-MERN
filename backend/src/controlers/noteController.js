import Note from "../model/Note.js";

export async function getAllNotes(_, res) {
   try {
      const notes = await Note.find().sort({createdAt:-1});//newst req
      res.status(200).json(notes)
   } catch (error) {
      console.error("Error in getAllnotes controller ", error);
      res.status(500).json({ massage: "Internal Server error" })

   }
};
export async function createNote(req, res) {
   try {
      const { title, content } = req.body;
      const note = new Note({ title, content });
      const savedNote = await note.save();
      res.status(201).json(savedNote)

   }
   catch (error) {

      console.error("Error in CreateNote  controller ", error);
      res.status(500).json({ massage: "Internal Server error" })


   }
};
export async function putNote(req, res) {

   try {
      const { title, content } = req.body;
      const updatedNote = await Note.findByIdAndUpdate(
         req.params.id,
         { title, content },
         {
            new: true
         }
      );
      if (!updatedNote) return res.status(404).json({ massage: "Note not found" })

      res.status(200).json({ massage: "Note updated succesfully!" });
   }
   catch {
      console.error("Error in Update Note controller ", error);
      res.status(500).json({ massage: "Internal Server error" })

   }
};
export async function deleteNote(req, res) {
   try {


      const deleteNote = await Note.findByIdAndDelete(req.params.id)
      if (!deleteNote) return res.status(404).json({ Message: "Note not found" })
      res.status(200).json({ message: "Note deleted succesfulyy!" });
   } catch {
      console.error("Error in Delete Note controller ", error);
      res.status(500).json({ massage: "Internal Server error" })
   }
};
export async function getNoteById(req,res){
   try {
      const note=await Note.findById(req.params.id)
      if(!note) return res.status(404).json({message:"Note not found"})
       res.json(note)
   } catch (error) {
     
      console.error("error in getAllNotes controller",error)
      res.status(500).json({message:"Internal Server error"});
   }
};




// mongodb+srv://satyamsavita06:TJzkzrULKCRxfG0q@cluster0.x1omnvc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0