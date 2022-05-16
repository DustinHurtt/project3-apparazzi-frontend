import React from "react";
import Username from "../components/Username";  
import Password from "../components/Password";
import { post } from "../authService/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
   
  
    const navigate = useNavigate();
  
    function submit(e) {
      e.preventDefault();
      console.log("logIn", username, password)
      post("/users/login", {
        
          username: username,
          password: password
      
        })
          .then((results) => {
            console.log("Results", results.data.token);
            localStorage.setItem('authToken', results.data.token);
            navigate("/")
          })
          .catch((err) => {
            console.log("Something went wrong", err.message);
          });
  }

    return (

        <div>
        <form onSubmit={submit}>
          <Username setUsername={setUsername} />
  
          <Password setPassword={setPassword} />


          <button>Submit</button>

          {/* <p>{errormessage}</p> */}
        </form>
        </div>

    )

}

export default Login