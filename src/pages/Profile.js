import React from "react";
import { Link } from "react-router-dom";
import { get } from "../authService/authService";
import Photo from "../components/Photo";
import User from "../components/User";

const Profile = () => {
  const [photos, setPhotos] = React.useState([]);
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    getPhotos();
  }, []);

  let getPhotos = () => {
    get("/users/my-profile")
      .then((results) => {
        setPhotos(results.data.foundPhotos);
        setUser(results.data.foundUser);
      })

      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="theProfile">
      <h2>Your Profile</h2>

      <User user={user} />

      <Link to="/edit-profile">Edit Profile</Link>

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

export default Profile;
