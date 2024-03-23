import React from "react";
import { uploadNewPhoto } from "../authService/service";
import { post } from "../authService/authService";
import { useNavigate } from "react-router-dom";

const SubmitPhoto = () => {
  const [photo, setPhoto] = React.useState({
    description: "",
    tags: "",
    imageUrl: "",
  });

  const [photoId, setPhotoId] = React.useState({
    id: "",
  });

  let navigate = useNavigate();

  const handleFileUpload = (e) => {
    const uploadData = new FormData();

    uploadData.append("imageUrl", e.target.files[0]);

    console.log("Uploading file ===>", e.target.files)

    uploadNewPhoto(uploadData)
      .then((response) => {
        setPhoto({ ...photo, imageUrl: response.fileUrl });
        setPhotoId({ id: response.newlyCreatedPhotoFromDB._id });
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  function update(photo) {
    post(`/photos/${photoId.id}/add-after`, {
      description: photo.description,
      tags: photo.tags.replace(/\s/g, "").toLowerCase().split("#"),
    })
      .then(navigate("/profile"))
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  const handleChange = (e) => {
    setPhoto({ ...photo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    update(photo);
    setPhoto({
      description: "",
      tags: "",
      imageUrl: "",
    });
  };

  return (
    <div className="homeLanding">
      <div className="homeContainer">
        <form>
          <label>New Photo</label>
          <input
            onChange={(e) => handleFileUpload(e)}
            type="file"
            name="imageUrl"
          ></input>
          <label>Description</label>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            name="description"
            value={photo.description}
          ></input>
          <label>Tags</label>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            name="tags"
            value={photo.tags}
          ></input>

          <button onClick={handleSubmit} type="button">
            Submit Photo
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitPhoto;
