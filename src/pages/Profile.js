import React from "react"; 
import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";


import {get} from "../authService/authService"
import Photo from "../components/Photo";
import User from "../components/User";

const Profile = () => {

    const [photos, setPhotos] = React.useState([])
    const [user, setUser] =React.useState({})



    React.useEffect(() => {
        getPhotos()
          }, []);

    let getPhotos = () => {
        get("/users/my-profile")
            .then((results) => {
                setPhotos(results.data.foundPhotos)
                setUser(results.data.foundUser)
                console.log("results", results.data)

                console.log("foundUser", results.data.foundUser)
            })
            
            .catch((err) => {console.log(err.message)});
            
          };  

        //   console.log("photos", photos)
        //   console.log("user", user)

    return (
      <div>
        <h2>Your Profile</h2>


        <User user={user}/>

        <Link to='/edit-profile'>Edit Profile</Link>


        {photos.map((photo) => {
          return (
            <div key={photo._id}>
              <Photo photo={photo} />
            </div>
          );
        })}

      </div>
    );

}

export default Profile