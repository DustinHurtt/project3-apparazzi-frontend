import React from 'react';
import './App.css';

import {Routes, Route, Link} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Tags from './pages/Tags';
import AllPhotos from './pages/AllPhotos';
import PhotoDetails from './pages/PhotoDetail';


function App() {
  return (

    <div >

      <header>
        <nav>

          <Link to='/'>Home</Link>
          {/* <Link to='/signup'>Sign Up</Link> */}
          <Link to='/tags'>Tags</Link>
          <Link to='/allPhotos'>All Photos</Link>
          <Link to='/login'>Log In</Link>
          <Link to='/profile'>Profile</Link>

        </nav>
      </header>

      <Routes>

        <Route path='/' element={<Home/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/tags' element={<Tags/>}></Route>
        <Route path='/allPhotos' element={<AllPhotos/>}></Route>
        <Route path='/:id/details' element={<PhotoDetails/>}></Route>
        <Route path='*' element={<NotFound/>}></Route>

      </Routes>

    </div>

  );
}

export default App;
