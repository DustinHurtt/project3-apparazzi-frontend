import React from "react";
import { get } from "../authService/authService";
import AppIcon from "../ApparaazziIcon.png";

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
        <h1 className="homeText">Welcome to Apparazzi!</h1>
        <img className="homeIcon" src={AppIcon} alt="apparazziIcon" />
        <h2 className="homeText">Where anyone can be a Paparazzi!</h2>
      </div>
    </div>
  );
};

export default Home;
