import React from "react";  

const ConfirmPassword = (props) => {

    return (

        <div>
            <label>Confirm Password</label>
            <br />
            <input type="password" name='confirmPassword' onChange={(e)=>props.setConfirmPassword(e.target.value)} value={props.confirmPassword} placeholder="Password"/>
        </div>

    )

}

export default ConfirmPassword