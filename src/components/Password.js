import React from "react";  

const Password = (props) => {

    return (

        <div>
            <label>Password</label>
            <br/>
            <input type="password" name='password' onChange={(e)=>props.setPassword(e.target.value)} value={props.password} placeholder="Password"/>
        </div>

    )

}

export default Password