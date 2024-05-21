import React from "react";  

const Username = (props) => {

    return (

        <div>
            <label>Username</label>
            <br/>
            <input name='username' onChange={(e)=>props.setUsername(e.target.value)} value={props.username}/>
        </div>

    )

}

export default Username