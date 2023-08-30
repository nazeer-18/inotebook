import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem.js'
import AddNote from './AddNote'
export default function NoteBook() {
    let navigate = useNavigate();
    const context = useContext(NoteContext);
    const { notes, fetchNotes, editNote, showAlert } = context   //destructuring
    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchNotes();
        }
        else {
            navigate('/login')
        }
    }, [])
    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" });
    const ref = useRef(null)
    const close = useRef(null)
    const [id, setId] = useState(null)
    const changeNotes = (note) => {
        ref.current.click();
        setNote({ etitle: note.title, edescription: note.description, etag: note.tag });
        setId(note._id)
    }
    const editChanges = (e) => {
        e.preventDefault();
        setNote({ ...note, [e.target.name]: [e.target.value] })
    }
    const updateFields = () => {
        editNote(id, note.etitle.toString(), note.edescription.toString(), note.etag.toString());
        //console.log(" updating changes ", note);
        close.current.click();
        showAlert("Successfully edited your note", "success");
    }

    return (
        <div style={{ position: "relative", top: "50px" }}>
            <AddNote />
            <button type="button" ref={ref} className="btn btn-primary" style={{ "display": "none" }} data-bs-toggle="modal" data-bs-target="#exampleModal">
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit a note</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <form>
                                    <div className="form-group mb-2">
                                        <label htmlFor="etitle"> Title</label>
                                        <input type="text" value={note.etitle} onChange={editChanges} className="form-control" name="etitle" aria-describedby="emailHelp" />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label htmlFor="edescription">Description</label>
                                        <input value={note.edescription} type="text" onChange={editChanges} name="edescription" className="form-control" id="edescription" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="etag">Tag</label>
                                        <input type="text" value={note.etag} onChange={editChanges} name="etag" className="form-control" id="etag" />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={close} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={updateFields} >Update changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h2>Your Notes</h2>
                <div className="row">
                    {!notes.length && <p className="mx-3">No Notes to display </p>}
                    {notes.map((note) => {
                        return <NoteItem key={note._id} changeNotes={changeNotes} notes={note} />
                    })}
                </div>
            </div>
        </div>
    )
}
