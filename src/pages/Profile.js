import React from "react"; 
// import { useState, useEffect } from "react";
import { baseUrl } from "../authService/baseUrl"; 
import axios from "axios";

const Profile = () => {

    const [photos, setPhotos] = React.useState([])

    React.useEffect(() => {
        getPhotos()
          }, []);

    let getPhotos = () => {
        axios
            .get(baseUrl + "/users/my-profile")
            .then((results) => {
                setPhotos(results.data.photos)
                console.log(results.data)
            })
            
            .catch((err) => {console.log(err.message)});
            
          };  

    return (

        <div>
            <h1>This is Profile</h1>
        </div>

    )

}

export default Profile