import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext'
const Login = () => {
    const context = useContext(NoteContext);
    const { showAlert } = context;
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: [e.target.value] });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/loginuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email.toString(), password: credentials.password.toString() })
        });
        const data = await response.json();
        //console.log(data)
        if (data.success) {
            navigate("/")
            localStorage.setItem('token', data.authToken);
            console.log(data.authToken)
            showAlert("Loggedin successfully", 'success')
        }
        else {
            showAlert("invalid credentials", 'danger')
            localStorage.setItem('token',"");
        }
    }
    return (
        <div style={{ position: "relative", top: "70px" }}>
            <h2>Login to continue using iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" value={credentials.email} onChange={handleChange} required name="email" className="form-control" id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" required value={credentials.password} onChange={handleChange} className="form-control" id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
