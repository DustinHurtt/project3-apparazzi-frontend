import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../authService/baseUrl";  
import Photo from "../components/Photo";

const TagDetails = () => {

    const [photos, setPhotos] = useState([]);
    const params = useParams()

    useEffect(() => {
        fetchPhotos();
    }, []);
  
    const fetchPhotos = () => {
        axios
          .get(
              baseUrl +
            `/photos/${params.id}/tag`
  
          )
          .then((res) => {
            setPhotos(res.data.photos);
            console.log("resData", res.data.photos)
  
          })
          .catch((err) => console.log(err));
      };

    //   console.log(photos)

    return (
      <div>
        <h1>This is TagDetails</h1>

        <div>
          {photos.map((photo) => {
            return (
              <div key={photo._id}>
                <Photo photo={photo} />
              </div>
            );
          })}
        </div>
      </div>
    );

}

export default TagDetails