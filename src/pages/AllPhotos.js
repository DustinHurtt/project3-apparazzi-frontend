import axios from "axios";
import React from "react";  
import { baseUrl } from "../authService/baseUrl";
import Photo from "../components/Photo";
import { Link } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';





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
        <h2>All Photos</h2>

        <section className="main">

        <div className="grid">

          <div className="wrapper">

            <div className="left-col">

              <div className="post">

                {photos.map((photo) => {

                  return (

                    <div className="post-image" key={photo._id}>
                      <Photo photo={photo} className="scrollImage"  />
                    </div>

                  );

                })}

              </div>

            </div>

          </div>

          </div>

        </section>

      </div>
    );

}

export default AllPhotos