import React from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../authService/authService";
import { get } from "../authService/authService";
import { uploadProfilePhoto } from "../authService/service";

const EditProfile = () => {
  const [updatedUser, setupdatedUser] = React.useState({
    email: "",
    name: "",
    bio: "",
    imageUrl: "",
    location: "",
  });

  React.useEffect(() => {
    getUser();
  }, []);

  let getUser = () => {
    get("/users/my-profile")
      .then((results) => {
        setupdatedUser(results.data.foundUser);
      })

      .catch((err) => {
        console.log(err.message);
      });
  };

  let navigate = useNavigate();

  const removeFalsy = (obj) => {
    let newObj = {};
    Object.keys(obj).forEach((prop) => {
      if (obj[prop]) {
        newObj[prop] = obj[prop];
      }
    });
    return newObj;
  };

  const handleFileUpload = (e) => {
    const uploadData = new FormData();

    uploadData.append("imageUrl", e.target.files[0]);

    uploadProfilePhoto(uploadData)
      .then((response) => {
        setupdatedUser({ ...updatedUser, imageUrl: response.fileUrl });
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  function update(noFalsy) {
    post(`/users/edit-profile-without-picture`, noFalsy)
      .then(navigate("/profile"))
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  const handleChange = (e) => {
    setupdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    update(removeFalsy(updatedUser));
    setupdatedUser({
      email: "",
      name: "",
      bio: "",
      imageUrl: "",
      location: "",
    });
  };

  return (
    <div className="homeLanding">
      <div className="homeContainer">
        <h1>Edit Profile</h1>
        <br />

        <div>
          <form>
            <label>Name</label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              value={updatedUser.name}
            ></input>
            <label>Location</label>
            <input
              onChange={handleChange}
              type="text"
              name="location"
              value={updatedUser.location}
            ></input>
            <label>Profile Picture</label>
            <input
              onChange={(e) => handleFileUpload(e)}
              type="file"
              name="imageUrl"
            ></input>
            <label>Bio</label>
            <input
              onChange={handleChange}
              type="text"
              name="bio"
              value={updatedUser.bio}
            ></input>
            <label>Email</label>
            <input
              onChange={handleChange}
              type="text"
              name="email"
              value={updatedUser.email}
            ></input>

            <button onClick={handleSubmit} type="button">
              Update Profile
            </button>
          </form>
        </div>

        <button onClick={() => navigate("/delete-profile")}>
          Delete Profile
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
