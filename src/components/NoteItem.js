import React,{useContext} from 'react'
import NoteContext from '../context/notes/NoteContext'
export default function NoteItem(props) {
    const context = useContext(NoteContext)
    const {deleteNote} = context
    const {notes,changeNotes} = props
    return (
        <div className="col-md-3">
            <div className="card my-3">
                    <div className="card-body" style={{overflow:"auto"}}>
                        <div className="d-flex align-items-center">
                        <div style={{color:"red",backgroundColor:"black",float:"left",left:"5px",position:"absolute"}} className="badge badge-pill badge-warning">{notes.tag===""?"default":notes.tag}</div>
                        <i style={{right:"25px",position:"absolute"}} className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(notes._id)}}></i>
                        <i style={{right:"2px",position:"absolute"}} className="fa-solid fa-file-pen mx-2" onClick = {()=>{changeNotes(notes)}}></i>
                        </div> <br/>
                        <h5 className="card-title">{notes.title}</h5>
                        <p className="card-text">{notes.description}</p>
                    </div>
            </div>
        </div>
    )
}
