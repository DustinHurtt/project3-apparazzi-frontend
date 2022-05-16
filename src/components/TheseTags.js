import React from "react";  

const TheseTags = (props) => {

    // console.log(props)

    return (

        <div>
      <p>    
            {props.photo.tags && props.photo.tags.map((tag) => {
        return (<span key={tag}>{tag} </span>);
      })}

      </p>  
      {/* <Link to={`/${beer._id}`}><h3>{beer.name}</h3></Link> */}
        </div>

)

}

export default TheseTags


