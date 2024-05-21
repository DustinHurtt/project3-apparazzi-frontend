import axios from "axios";
import React from "react";
import { baseUrl } from "../authService/baseUrl";
import Photo from "../components/Photo";

const AllPhotos = () => {
  const [photos, setPhotos] = React.useState([]);

  
  let getPhotos = () => {
    axios
    .get(baseUrl + "/photos/all-photos")
    .then((results) => {
      setPhotos(results.data.photos);
    })
    
    .catch((err) => {
      console.log(err.message);
    });
  };
  
  React.useEffect(() => {
    getPhotos();
  }, []);
  return (
    <div>
      <section className="main">
        <div className="grid">
          <div className="wrapper">
            <div className="left-col">
              <div className="post">
                {photos.map((photo) => {
                  return (
                    <div className="post-image" key={photo._id}>
                      <Photo photo={photo} className="scrollImage" />
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
};

export default AllPhotos;
