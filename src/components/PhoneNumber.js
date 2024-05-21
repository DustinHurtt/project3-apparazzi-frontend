import React from "react";  

const PhoneNumber = (props) => {

    return (

        <div>
            <label>Phone Number</label>
            <br/>
            <input type="text" name='phoneNumber' onChange={(e)=>props.setPhoneNumber(e.target.value)} value={props.phoneNumber} placeholder="888 888 8888"/>
        </div>

    )

}

export default PhoneNumber