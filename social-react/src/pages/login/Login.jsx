import { useRef, useContext } from "react";
import {useNavigate} from "react-router";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import {CircularProgress} from "@mui/material";

export default function Login() {
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();
  const {user,isFetching, error, dispatch} = useContext(AuthContext)

  const handleClick = (e) => {
    e.preventDefault();
    loginCall({email: email.current.value,password: password.current.value},dispatch)
  };

  const handleCreateButton = (e) => {
    e.preventDefault();
    try {
      navigate("/register");
    } catch (error) {
      console.log(error);
    }

  }
  console.log(user);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Omarsocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Omarsocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="Email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="Password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" size="25px"/> : "Login"}</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton" disabled={isFetching} onClick={handleCreateButton}>
            {isFetching ? <CircularProgress color="inherit" size="25px"/> : "Create a new account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
