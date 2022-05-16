import React from "react";  
import TheseTags from "./TheseTags";
import { Link } from "react-router-dom";

const Photo = (props) => {

    // console.log(props.photo)

    return (

        <div>

        <Link to ={`/${props.photo._id}/details`}>

            <img src = {props.photo.imageUrl} alt = "photograph"/>            
        
        </Link>

      
            <TheseTags photo={props.photo}/>

            <p>{props.photo.photographedDate}</p>
        </div>

    )

}

export default Photo