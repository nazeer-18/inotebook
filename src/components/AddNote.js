import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';
const AddNote = () => {
    const context = useContext(NoteContext);
    const { addNote ,showAlert} = context;
    const [newNote, setNewNote] = useState({ title: "", description: "", tag: "" })
    const addChanges = (e) => {
        setNewNote({ ...newNote, [e.target.name]: e.target.value })
    }
    const createNote = (e) => {
        e.preventDefault()//to prevent page from automatic reloading
        //console.log("adding new note");
        addNote(newNote);
        showAlert("Successfully added your note","success")
        setNewNote({title:"",description:"",tag:""})
    }
    return (
        <div>
            <div className="container my-3">
                <h2>Add a Note</h2>
                <div className="container">
                    <form className="my-3">
                        <div className="form-group mb-2">
                            <label htmlFor="title"> Title</label>
                            <input type="text" value={newNote.title} onChange={addChanges} className="form-control" name="title" aria-describedby="emailHelp" placeholder="Enter title" />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="description">Description</label>
                            <input type="text" value={newNote.description} onChange={addChanges} name="description" className="form-control" id="description" placeholder="description" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tag">Tag</label>
                            <input type="text" value={newNote.tag}  onChange={addChanges} name="tag" className="form-control" id="tag" placeholder="tag" />
                        </div>
                        <button disabled={newNote.title.length < 5 || newNote.description.length < 5} type="submit" onClick={createNote} className="btn btn-primary my-2">Add Note</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddNote