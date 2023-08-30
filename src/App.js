import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './components/About';
import Alert from './components/Alert';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup'
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState'
const App = () => {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert/>
          <div className='container'>
          <Routes>
            <Route exact path='/' element={<Home />}></Route>
            <Route exact path='/about' element={<About />}></Route>
            <Route exact path = "/login" element={<Login/>}></Route>
            <Route exact path = "/signup" element={<Signup/>}></Route>
          </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  
  )
}

export default App
