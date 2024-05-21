import React from "react";  

const Email = (props) => {

    return (

        <div>
            <label>Email</label>
            <br />
            <input type="text" name='email' onChange={(e)=>props.setEmail(e.target.value)} value={props.email} placeholder="Example@email.com"/>
        </div>

    )

}

export default Email