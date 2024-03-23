import React from "react";
import Password from "../components/Password";
import ConfirmPassword from "../components/ConfirmPassword";
import { post } from "../authService/authService";
import { useNavigate } from "react-router-dom";

const DeleteProfile = () => {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [errormessage, setErrormessage] = React.useState("");

  const navigate = useNavigate();

  function checkError(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrormessage("your password didn't match");
    } else {
      // setErrormessage(`Welcome ${username}!`)
      post("/users/delete-profile", {
        password: password,
      })
        .then((results) => {
          localStorage.clear();
          navigate("/");
        })
        .catch((err) => {
          console.log("Something went wrong", err.message);
        });
    }
  }

  return (
    <div>
      <h1>This is Delete Profile</h1>
      <form onSubmit={checkError}>
        <Password setPassword={setPassword} />
        <ConfirmPassword setConfirmPassword={setConfirmPassword} />

        <button type="submit">Submit</button>

        <p>{errormessage}</p>
      </form>
    </div>
  );
};

export default DeleteProfile;
