import React from "react";  
import { DateTime } from "luxon"

const User = (props) => {

    let fromISO = DateTime.fromISO(props.user.createdAt)
    const memberSince = fromISO.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
    // let memberSince = DateTime.fromISO(props.user.createdAt).toLocaleString()

    return (
      <div className="userLanding">
        <div className="homeContainer">
          <h3>{props.user.username} </h3>
          <img
            src={props.user.imageUrl}
            alt="profile pic"
            className="profilePhoto"
          />
          <h4>{props.user.name}</h4>
          <h5>Member since {memberSince}</h5>
          <p>{props.user.location}</p>
          <p>{props.user.bio}</p>
        </div>
      </div>
    );

}

export default User