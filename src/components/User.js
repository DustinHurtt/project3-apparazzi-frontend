import React from "react";  

const User = (props) => {

    return (

        <div>

            <h3>{props.user.username}</h3>
            <img src={props.user.imageUrl} alt="profile pic"/>
            <h4>{props.user.name}</h4>
            <h5>Member since {props.user.createdAt}</h5>
            <p>{props.user.location}</p>
            <p>{props.user.bio}</p>

        </div>

    )

}

export default User