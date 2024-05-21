import React from "react";
import { get } from "../authService/authService";
// import AppIcon from "../ApparaazziIcon.png";
import AppIcon from "../ApparaazziIcon_v2.jpg";

const Home = () => {
  React.useEffect(() => {
    let token = localStorage.getItem("authToken");
    console.log("This is the token", token);
    get("/users/login-test")
      .then((results) => {
        // console.log("Are we logged in?", results.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="homeLanding">
      <div className="homeContainer">

        <div className="searchInfo">
          <div>
            <p className="searchText">Search</p>
            <form className="searchBar1">
              <button className="searchBarButton">🔍</button>
              <input className="searchBarInput" placeholder="Who are you looking for?" />
            </form>
          </div>

          <div>
            <p className="searchText">Location</p>
            <form className="searchBar2">
              <button className="searchBarButton">🔍</button>
              <input className="searchBarInput" placeholder="City or zip code" />
            </form>
          </div>
        </div>

        <br/>
        
        <h1 className="homeText">Welcome to</h1>
        <img className="homeIcon" src={AppIcon} alt="apparazziIcon" />
        <h2 className="homeText">Where anyone can be a Paparazzi!</h2>
      </div>
    </div>
  );
};

export default Home;