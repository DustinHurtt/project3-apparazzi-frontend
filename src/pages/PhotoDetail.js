import React from "react";  
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../authService/baseUrl";

import Photo from "../components/Photo";


const PhotoDetails = ({}) => {

    const [photo, setPhoto] = useState({});
    const params = useParams()

    useEffect(() => {
        fetchPhoto();
    }, []);
  
    const fetchPhoto = () => {
        axios
          .get(
              baseUrl +
            `/photos/${params.id}/details`
  
          )
          .then((res) => {
            setPhoto(res.data.result);
            // console.log(res.data)
  
          })
          .catch((err) => console.log(err));
      };

    return (

        <div>
            <Photo photo={photo}/>

            <p>{photo.description}</p>
            {/* <p>{photo.tags}</p> */}
            <p>{photo.comments}</p>

        </div>

    )

}

export default PhotoDetails