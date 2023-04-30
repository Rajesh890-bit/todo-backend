const express = require("express");
const noteRouter = express.Router();

const { NoteModel } = require("../model/Notes.model");

noteRouter.post("/create", async (req, res) => {
  //logic
  try {
    const note = new NoteModel(req.body);
    await note.save();
    res.status(200).send("New Note added Successful");
  } catch (error) {
    res.status(400).send({ error: error.massage });
  }
});
noteRouter.get("/", async (req, res) => {
  //logic

  try {
    const notes = await NoteModel.find({ authorID: req.body.authorID });
    res.status(200).send(notes);
  } catch (error) {
    res.status(400).send({ err: err.massage });
  }
});
noteRouter.patch("/update/:noteID", async (req, res) => {
  //logic
  const { noteID } = req.params;
  const note = await NoteModel.findOne({ _id: noteID });
  try {
    if (req.body.authorID !== note.authorID) {
      res.status(200).send({ msg: "You are not authorized to do this action" });
    } else {
      await NoteModel.findOneAndUpdate({ _id: noteID }, req.body);
      res
        .status(200)
        .send({ msg: `The note with id ${noteID} has been updated` });
    }
  } catch (error) {
    res.status(400).send({ err: err.massage });
  }
});
noteRouter.delete("/delete/:noteID", async (req, res) => {
  //logic
  const { noteID } = req.params;
  const note = await NoteModel.findOne({ _id: noteID });
  try {
    if (req.body.authorID !== note.authorID) {
      res.status(200).send({ msg: "You are not authorized to do this action" });
    } else {
      await NoteModel.findOneAndUpdate({ _id: noteID });
      res
        .status(200)
        .send({ msg: `The note with id ${noteID} has been deleted` });
    }
  } catch (error) {
    res.status(400).send({ err: err.massage });
  }
});

module.exports = {
  noteRouter,
};
