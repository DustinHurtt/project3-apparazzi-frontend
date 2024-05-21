import React from "react";
import ConfirmPassword from "../components/ConfirmPassword";
import Email from "../components/Email";
import Password from "../components/Password";
import Username from "../components/Username";
import PhoneNumber from "../components/PhoneNumber";
import { post } from "../authService/authService";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  let [username, setUsername] = React.useState("");
  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [confirmPassword, setConfirmPassword] = React.useState("");
  let [errormessage, setErrormessage] = React.useState("");
  let [phoneNumber, setPhoneNumber] = React.useState("");

  const navigate = useNavigate();

  const regexExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

  function checkError(e) {
    e.preventDefault();
    if (username.length < 4) {
      setErrormessage("username must be at least four characters");
    } else if (password.length < 6) {
      setErrormessage("password must be at least 6 characters");
    } else if (password === "password") {
      setErrormessage("your password can't be 'password'");
    } else if (password !== confirmPassword) {
      setErrormessage("your password didn't match");
    } else if (!regexExp.test(email)) {
      setErrormessage("that is not a valid email address");
    } else {
      setErrormessage(`Welcome ${username}!`);
      post("/users/signup", {
        username: username,
        password: password,
        email: email,
      })
        .then((results) => {
          localStorage.setItem("authToken", results.data.token);
          localStorage.setItem("id", results.data.id);
          navigate("/");
        })
        .catch((err) => {
          console.log("Something went wrong", err.message);
        });
    }
  }

  return (
    <div className="homeLanding">
      <div className="homeContainer">
        <form onSubmit={checkError}>
          <h1>APPARAZZI</h1>
          <br/>
          <Username setUsername={setUsername} />
          <Email setEmail={setEmail} />
          <Password setPassword={setPassword} />
          <ConfirmPassword setConfirmPassword={setConfirmPassword} />
          <PhoneNumber setPhoneNumber={setPhoneNumber} />

          <br />
          <button className="submitButton">Sign Up</button>
          <br/>

          <p>Already have an account?<Link to="/login">Log In</Link></p>

          <p>{errormessage}</p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;