import React from "react"; 
import { useNavigate } from "react-router-dom";
import { post } from "../authService/authService"; 
import { get } from "../authService/authService";
import {uploadProfilePhoto} from "../authService/service"


const EditProfile = () => {

    const [updatedUser, setupdatedUser] = React.useState({
        email: "",
        name: "",
        bio: "",
        imageUrl: "",
        location: ""
      })

    React.useEffect(() => {
        getUser()
          }, []);

    let getUser = () => {
        get("/users/my-profile")
            .then((results) => {

                setupdatedUser(results.data.foundUser)
                // console.log("results", results.data)

                // console.log("foundUser", results.data.foundUser)
            })
            
            .catch((err) => {console.log(err.message)});
            
          };

    // console.log(updatedUser)
    
    let navigate = useNavigate()

    const removeFalsy = (obj) => {
        let newObj = {};
        Object.keys(obj).forEach((prop) => {
          if (obj[prop]) { newObj[prop] = obj[prop]; }
        });
        return newObj;
      }

        // ******** this method handles the file upload ********
    const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);
 
    const uploadData = new FormData();
 
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);
    // console.log("TARGET", e.target.files[0])
 
    uploadProfilePhoto(uploadData)
      .then(response => {
        // console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setupdatedUser({...updatedUser, imageUrl: response.fileUrl});

      })
      .catch(err => console.log("Error while uploading the file: ", err));
  };

//   console.log("this", updatedUser)
    
    
      function update(noFalsy) {

        // if (updatedUser.imageUrl) {
    
        // post(`/users/edit-profile-with-picture`, updatedUser)
        // .then (navigate('/profile'))
        // .catch(error => {
        //   console.error('There was an error!', error);
        // })
        
        // } else {
            post(`/users/edit-profile-without-picture`, noFalsy)
            .then (navigate('/profile'))
            .catch(error => {
              console.error('There was an error!', error);
            })
        // }
    }
    
      const handleChange = (e) => {
        setupdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = (e) => {
        // console.log("this");
        e.preventDefault();
        // console.log("falsy", removeFalsy(updatedUser))
        
        update(removeFalsy(updatedUser));
        setupdatedUser({
            email: "",
            name: "",
            bio: "",
            imageUrl: "",
            location: ""
        });
      };

    //   console.log("update", updatedUser)


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

}

export default EditProfile