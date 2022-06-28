import React from "react";
import { get } from "../authService/authService";
import Photo from "../components/Photo";
import User from "../components/User";
import { useParams } from "react-router-dom";

const Contributor = () => {
  const [photos, setPhotos] = React.useState([]);
  const [user, setUser] = React.useState({});

  const params = useParams();

  React.useEffect(() => {
    getPhotos();
  }, []);

  let getPhotos = () => {
    get(`/photos/${params.id}/contributor`)
      .then((results) => {
        setPhotos(results.data.foundPhotos);
        setUser(results.data.foundUser);
      })

      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <h2>{user.username}'s Profile</h2>

      <User user={user} />

      <div className="columnated">
        {[...photos].reverse().map((photo) => {
          return (
            <div className="direction" key={photo._id}>
              <Photo photo={photo} className={"imageGroup"} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Contributor;
