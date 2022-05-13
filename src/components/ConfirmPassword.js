import React from "react";  

const ConfirmPassword = (props) => {

    return (

        <div>
            <label>Confirm Password</label>
            <input name='confirmPassword' onChange={(e)=>props.setConfirmPassword(e.target.value)} value={props.confirmPassword}/>
        </div>

    )

}

export default ConfirmPassword