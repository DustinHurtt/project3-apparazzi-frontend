import React from "react";
// import { get } from "../authService/authService";
import { uploadNewPhoto } from "../authService/service";
import { post } from "../authService/authService";
import { useNavigate } from "react-router-dom";



const SubmitPhoto = () => {

    const [photo, setPhoto] = React.useState({

        description: "",
        tags: "",
        imageUrl: ""
    })

    const [photoId, setPhotoId] = React.useState({
        id: ""
    })


    
    let navigate = useNavigate()

    // const removeFalsy = (obj) => {
    //     let newObj = {};
    //     Object.keys(obj).forEach((prop) => {
    //       if (obj[prop]) { newObj[prop] = obj[prop]; }
    //     });
    //     return newObj;
    //   }

        // ******** this method handles the file upload ********
    const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);
 
    const uploadData = new FormData();
 
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);
    // console.log("TARGET", e.target.files[0])
 
    uploadNewPhoto(uploadData)
      .then(response => {
        // console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        console.log(response)
        setPhoto({...photo, imageUrl: response.fileUrl});
        setPhotoId({id: response.newlyCreatedPhotoFromDB._id})

      })
      .catch(err => console.log("Error while uploading the file: ", err));
  };

  console.log(photoId.id)

//   console.log("this", updatedUser)
    
    
      function update(photo) {

//*********************** */
            post(`/photos/${photoId.id}/add-after`, {description: photo.description, tags: photo.tags.replace(/\s/g,'').split("#")})
            // post(`/photos/${photoId.id}/add-after`, photo)
            .then (navigate('/profile'))
            .catch(error => {
              console.error('There was an error!', error);
            })
        // }
    }
    
      const handleChange = (e) => {
        setPhoto({ ...photo, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = (e) => {
        // console.log("this");
        e.preventDefault();
        // console.log("falsy", removeFalsy(updatedUser))
        
        update(photo);
        setPhoto({
            description: "",
            tags: "",
            imageUrl: ""
        });
      };

    

    

    return (

        <div className="homeLanding">
            {/* <h1>This is SubmitPhoto</h1> */}


            <div className="homeContainer">
          <form>

            <label>New Photo</label>
            <input
              onChange={(e) => handleFileUpload(e)}
              type="file"
              name="imageUrl"
            ></input>
            <label>Descrption</label>
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

    )

}

export default SubmitPhoto