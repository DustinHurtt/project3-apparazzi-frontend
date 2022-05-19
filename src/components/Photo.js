import React from "react";  
import TheseTags from "./TheseTags";
import { Link } from "react-router-dom";
import { DateTime } from "luxon"

const Photo = (props) => {

    // console.log(props.photo)
    // console.log("CONTRIBUTOR!!!", props)

    function parseDate(s) {
        var b = s.split(/\D/);
        // return new Date(b[0],b[1]-1,b[2],b[3],b[4],b[5]).toLocaleString();
        return new Date(b[0],b[1]-1,b[2],b[3],b[4],b[5]).toLocaleString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'});
      }
      
    //   console.log(parseDate(props.photo.photographedDate));

    return (
      <div>
        <Link to={`/${props.photo._id}/details`}>
          <img
            className={props.className}
            src={props.photo.imageUrl}
            alt="photograph"
          />
        </Link>

        <div class="post-content">
          <TheseTags photo={props.photo} />

          {props.photo.photographedDate && (
            <p class="description">Spotted on {parseDate(props.photo.photographedDate)}</p>
          )}
          {props.photo.contributor && (
            <p class="post-time">
              By{" "}
              <Link to={`/${props.photo.contributor._id}/contributor`}>
                {props.photo.contributor.username}
              </Link>
            </p>
          )}
        </div>

        {/* <p>{props.photo.photographedDate}</p>
            <p>{DateTime.fromJSDate(props.photo.photographedDate).toLocaleString(DateTime.DATETIME_MED)}</p> */}
      </div>
    );

}

export default Photo