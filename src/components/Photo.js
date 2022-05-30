import React from "react";  
import TheseTags from "./TheseTags";
import { Link } from "react-router-dom";
import { DateTime } from "luxon"

const Photo = (props) => {

    function parseDate(s) {
        var b = s.split(/\D/);

        return new Date(b[0],b[1]-1,b[2],b[3],b[4],b[5]).toLocaleString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'});
      }
      


    return (
      <div >
        <div >
          <Link to={`/${props.photo._id}/details`}>
            <img
              className={props.className}
              src={props.photo.imageUrl}
              alt="photograph"
            />
          </Link>

          <div className="post-content">
            <TheseTags photo={props.photo} />

            {props.photo.photographedDate && (
              <p className="description">
                Spotted on {parseDate(props.photo.photographedDate)}
              </p>
            )}
            {props.photo.contributor && (
              <p className="post-time">
                By{" "}
                <Link to={`/${props.photo.contributor._id}/contributor`}>
                  {props.photo.contributor.username}
                </Link>
              </p>
            )}
          </div>
        </div>
        <br/>

      </div>
    );

}

export default Photo