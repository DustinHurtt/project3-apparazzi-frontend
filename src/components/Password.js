import React from "react";  

const Password = (props) => {

    return (

        <div>
            <label>Password</label>
            <input name='password' onChange={(e)=>props.setPassword(e.target.value)} value={props.password}/>
        </div>

    )

}

export default Password