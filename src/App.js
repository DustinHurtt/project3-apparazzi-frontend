import React from 'react';
import './App.css';

import {Routes, Route, Link, useNavigate} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Tags from './pages/Tags';
import AllPhotos from './pages/AllPhotos';
import PhotoDetails from './pages/PhotoDetail';
import EditProfile from './pages/EditProfile';
import SubmitPhoto from './pages/SubmitPhoto';
import TagDetails from './pages/TagDetails';
import DeleteProfile from './pages/DeleteProfile';


function App() {

  const navigate = useNavigate()



  let token = localStorage.getItem("authToken")
  console.log("TOKEN", token)

  function logout (){
    localStorage.clear()
    navigate('/')
  }

  return (
    <div>
      <header>
        {token ? (
          <nav>
            <Link to="/">Home</Link>
            <Link to="/allPhotos">All Photos</Link>
            <Link to="/tags">Tags</Link>
            <Link to="/submit-photo">Submit Photo</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={logout}>Logout</button>
          </nav>
        ) : (
          <nav>
            <Link to="/">Home</Link>
            <Link to='/signup'>Sign Up</Link>
            <Link to="/login">Log In</Link>

          </nav>
        )}
      </header>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/tags" element={<Tags />}></Route>
        <Route path="/allPhotos" element={<AllPhotos />}></Route>
        <Route path="/:id/details" element={<PhotoDetails />}></Route>
        <Route path="/:id/tag" element={<TagDetails />}></Route>
        <Route path="/edit-profile" element={<EditProfile />}></Route>
        <Route path="/delete-profile" element={<DeleteProfile/>}></Route>
        <Route path="/submit-photo" element={<SubmitPhoto />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
