//we will give all props here
import { useState } from 'react'
import NoteContext from './NoteContext'
export default function NoteState(props) {
    const host = "http://localhost:5000"
    const [notes, setNotes] = useState([]);
    const [alert,setAlert] = useState({msg:"",type:""});
    const showAlert = (msg,type)=> {
        setAlert({msg,type})
        setTimeout(()=>{
            setAlert({msg:""})
        },2000)
    }
    const fetchNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const data = await response.json();
        //console.log(data);
        setNotes(data);
        //showAlert("Fetched all your notes","success")
    }
    //Function to Add a note 
    const addNote = async (note) => {
        //api call
        //eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify(note)
        });
        setNotes(notes.concat(note))
    }

    // Function to delete a note
    const deleteNote = async (id) => {
        //console.log("deleting note with id " + id);
        const newNotes = notes.filter((note) => { return note._id !== id });
        showAlert("Deleted the note","danger")
        setNotes(newNotes);
        //eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'auth-token': localStorage.getItem('token'),
                "Content-Type": "application/json"
            },
        })
        //const data = await response.json();
        //console.log(data);
    }

    // Function to edit a note
    const editNote = async (id, title, description, tag) => {

        // to call api and pass id through header
        //eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        //const data = await response.json();
        //console.log(data)
        //to edit noes on client side
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes)
        // return response.json();
    }
    return (
        <div>
            <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchNotes,alert,showAlert }}>
                {props.children}
            </NoteContext.Provider>
        </div>
    )
}