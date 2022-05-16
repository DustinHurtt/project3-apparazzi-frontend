import axios from "axios";
import React from "react";  
import { baseUrl } from "../authService/baseUrl";
import Photo from "../components/Photo";
import { Link } from "react-router-dom";

const AllPhotos = () => {

    const [photos, setPhotos] = React.useState([])

    React.useEffect(() => {
        getPhotos()
          }, []);

    let getPhotos = () => {
        axios
            .get(baseUrl + "/photos/all-photos")
            .then((results) => {
                setPhotos(results.data.photos)
                console.log(results.data)
            })
            
            .catch((err) => {console.log(err.message)});
            
          };  

    return (

        <div>
            <h1>This is AllPhotos</h1>



      {photos.map((photo) => {
        return (
          <div key={photo._id}>
          
                <Photo photo={photo}/>
            
          </div>
        );
      })}

        </div>

    )

}

export default AllPhotos