import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'
export default function Alert() {
    const context = useContext(NoteContext)
    const {alert} = context;
    const capitalize = (word)=>{
        return word.charAt(0).toUpperCase() + word.slice(1)
    }
    return (
        <div>
            {alert.msg && <div style={{height:"60px",top:"0px"}} className={`alert alert-${alert.type} fixed-top`} role="alert">
                <strong>{capitalize(alert.msg)}</strong></div>}
            </div>
    )
}
