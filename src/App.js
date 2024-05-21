import React,{ useState } from "react";
import "./App.css";

import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Tags from "./pages/Tags";
import AllPhotos from "./pages/AllPhotos";
import PhotoDetails from "./pages/PhotoDetail";
import EditProfile from "./pages/EditProfile";
import SubmitPhoto from "./pages/SubmitPhoto";
import TagDetails from "./pages/TagDetails";
import DeleteProfile from "./pages/DeleteProfile";
import Contributor from "./pages/Contributor";

import AppIcon from "./ApparaazziIcon_v2.jpg";
import UserIcon from "./user.png";
import SubmitIcon from "./add_image.png";
import NotificationIcon from "./notification.png";

function App() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  let token = localStorage.getItem("authToken");

  function logout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <div>
      {/* <div className="navbar">
        <header className="nav-wrapper">
          <div className="navIconContainer">
            <Link to="/" className="navIconImage">
              <img className="navIcon" src={AppIcon} alt="appIcon" />
            </Link>
          </div>

          {token ? (
            <nav className="nav-items">
              <Link to="/" className="icon">Home</Link>
              <Link to="/leaderboard" className="icon">LeaderBoard</Link>
              <Link to="/about" className="icon">About</Link>
              <Link to="/allPhotos" className="icon">All Photos</Link>
              <Link to="/tags" className="icon">Tags</Link>
              <Link to="/submit-photo" className="icon"><img className="navIcon" src={SubmitIcon} alt="SubmitIcon" /></Link>
              <Link to="/profile" className="icon"><img className="navIcon" src={UserIcon} alt="UserIcon" /></Link>
              <Link to="/notifications" className="icon"><img className="navIcon" src={NotificationIcon} alt="NotificationIcon" /></Link>
              <button onClick={logout} className="navButton">Logout</button>
            </nav>
          ) : (
            <nav className="nav-items">
              <Link to="/" className="icon">Home</Link>
              <Link to="/inventory" className="icon">Inventory</Link>
              <Link to="/about" className="icon">About</Link>
              <button className="navButton"><Link to="/login">Log In</Link></button>
              <button className="navButton"><Link to="/signup">Sign Up</Link></button>
            </nav>
          )}
        </header>
      </div> */}

<div className="navbar">
        <header className="nav-wrapper">
          <div className="navIconContainer">
            <Link to="/" className="navIconImage">
              <img className="navIcon" src={AppIcon} alt="appIcon" />
            </Link>
            <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              &#9776;
            </div>
          </div>

          {token ? (
            <nav className={`nav-items ${menuOpen ? "show" : ""}`}>
              <Link to="/" className="icon">Home</Link>
              <Link to="/leaderboard" className="icon">LeaderBoard</Link>
              <Link to="/about" className="icon">About</Link>
              <Link to="/allPhotos" className="icon">All Photos</Link>
              <Link to="/tags" className="icon">Tags</Link>
              <Link to="/submit-photo" className="icon">
                <img className="navbarIcon" src={SubmitIcon} alt="SubmitIcon" />
              </Link>
              <Link to="/profile" className="icon">
                <img className="navbarIcon1" src={UserIcon} alt="UserIcon" />
              </Link>
              <Link to="/notifications" className="icon">
                <img className="navbarIcon2" src={NotificationIcon} alt="NotificationIcon" />
              </Link>
              <button onClick={logout} className="navButton">Logout</button>
            </nav>
          ) : (
            <nav className={`nav-items ${menuOpen ? "show" : ""}`}>
              <Link to="/" className="icon">Home</Link>
              <Link to="/inventory" className="icon">Inventory</Link>
              <Link to="/about" className="icon">About</Link>
              <button className="navButton">
                <Link to="/login">Log In</Link>
              </button>
              <button className="navButton">
                <Link to="/signup">Sign Up</Link>
              </button>
            </nav>
          )}
        </header>
      </div>

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
        <Route path="/delete-profile" element={<DeleteProfile />}></Route>
        <Route path="/submit-photo" element={<SubmitPhoto />}></Route>
        <Route path="/:id/contributor" element={<Contributor />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;