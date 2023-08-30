const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');

// Route 1: fetch all notes of the user using Get : "/api/notes/fetchallnotes"  Login required
//we are sending auth token in header so we use get method
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        return res.json(notes);
    }
    catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal server error occured')
    }
})
// Route 2 : add notes of the user using post : '/api/notes/addnote'  Login required
router.post('/addnote', fetchuser, [
    body('title', 'Title must be atleast 3 characters long ').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters long ').isLength({ min: 5 })
], async (req, res) => {

    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() })
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        return res.json(savedNote)
    }
    catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal server error occured ')
    }

})

//Route 3 : update an existing note using put : '/api/notes/updatenote/:id' Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        let newNote = {}
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }
        //find wheather this note exists or not
        let note = await Notes.findById(req.params.id)
        if (!note) {
            return res.status(404).send('not found');
        }
        //find wheather this notes belongs to same user or not 
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('unauthorized error')
        }
        // note exists and corresponds to this user update it
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        return res.json(note)
    }
    catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal server error occurred')
    }
})

//Route 4 : Deleting a note using DELETE : '/api/notes/deletenote/:id' Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    //find wheather note with given id exists or not
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send('not found');
        }
        //checking user wheather this notes belongs to same user
        if (req.user.id !== note.user.toString()) {
            return res.status(401).send('unauthorized error ')
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        return res.json({ "success": "Note has been deleted ", note: note })
    }
    catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal server error occured ');
    }
})
module.exports = router;
