import React from "react";  
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../authService/baseUrl";
import {post, get} from "../authService/authService"
import { useNavigate } from "react-router-dom";

import Photo from "../components/Photo";


const PhotoDetails = ({}) => {

    const [photo, setPhoto] = useState({});
    const [comment, setComment] = useState({
        comment: ""
    })
    const params = useParams()

    const navigate = useNavigate()

    let id = localStorage.getItem('id')

    useEffect(() => {
        fetchPhoto();
    }, []);
  
    const fetchPhoto = () => {
        get(`/photos/${params.id}/details`)
          .then((res) => {
            setPhoto(res.data.result);
            // console.log(res.data)
  
          })
          .catch((err) => console.log(err));
      };

    const deletePhoto = () =>
        {
        post(`/photos/${params.id}/delete`)
        .then((res) => {
            navigate("/profile")

            console.log(res.data)
  
          })
          .catch((err) => console.log(err));
      };

    //   "/review/{{foundRoom._id}}/add-review"

    function update(newComment) {

        // if (updatedUser.imageUrl) {
    
        // post(`/users/edit-profile-with-picture`, updatedUser)
        // .then (navigate('/profile'))
        // .catch(error => {
        //   console.error('There was an error!', error);
        // })
        
        // } else {
            post(`/comments/${params.id}/add-comment`, newComment )
            .then (navigate(`/${params.id}/details`))
            .catch(error => {
              console.error('There was an error!', error);
            })
        // }
    }
    
    const handleChange = (e) => {
        setComment({ ...comment, [e.target.comment]: e.target.value });
      };

    const handleSubmit = (e) => {
        // console.log("this");
        e.preventDefault();
        // console.log("falsy", removeFalsy(updatedUser))
        
        update(comment);
        setComment({
            comment: ""
        });
      };
    


    return (
      <div>
        <Photo photo={photo} />

        <p>{photo.description}</p>
        {/* <p>{photo.tags}</p> */}
        <p>{photo.comments}</p>

        <div>
          <form>
            <label>New Comment</label>
            <input
              onChange={handleChange}
              type="text"
              name="comment"
              value={comment.comment}
            ></input>

            <button onClick={handleSubmit} type="button">
              Add Comment
            </button>
          </form>
        </div>

        {id === photo.contributor && (
          <button onClick={deletePhoto}>Delete</button>
        )}
      </div>
    );

}

export default PhotoDetails