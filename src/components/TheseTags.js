import React from "react";
import { Link } from "react-router-dom";  

const TheseTags = (props) => {

    console.log("PROPS", props)

    return (

        <div>
      <p>    
            {props.photo.tags && props.photo.tags.map((tag) => {
        return (<span key={tag}>#<Link to={`/${tag.trim()}/tag`}>{tag}</Link> </span>);
      })}

      </p>  

        </div>

)

}

export default TheseTags


