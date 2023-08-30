import React,{useState,useContext} from 'react';
import {useNavigate} from 'react-router';
import NoteContext from '../context/notes/NoteContext';
const Signup = () => {
    const context = useContext(NoteContext);
    const {showAlert} = context;
    let navigate = useNavigate();
    const [credentials,setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
    const {name,email,password,cpassword} = credentials
    const handleChange = (e) => {
        setCredentials({...credentials,[e.target.name]:[e.target.value]});
    }
    const handleSubmit = async (e)=> {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser",{
            method:'POST',
            headers : {
                'Content-Type':'application/json',
            },
            body : JSON.stringify({email : email.toString(),name : name.toString(),password : password.toString()})
        });
        const data = await response.json();
        //console.log(data);
        if(data.success){
            navigate('/');
            localStorage.setItem('token',data.authToken)
            showAlert('Successfully Signedin','success')
        }
        else{
            localStorage.removeItem('token');
            showAlert('Sorry try again','danger');
        }
    }
    return (
        <div style={{position:"relative",top:"70px"}}>
            <h2>Create an account on iNotebook now !</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input required type="text" value={credentials.name} onChange={handleChange} name="name" className="form-control" id="name" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" required value={email} onChange={handleChange} name="email" className="form-control" id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" required minLength={5} value={password} onChange={handleChange} className="form-control" id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" name="cpassword" value={cpassword} onChange={handleChange} className="form-control" id="cpassword" required minLength={5}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
