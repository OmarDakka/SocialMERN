import "./register.css";
import {useRef} from "react";
import {useNavigate} from "react-router";
import axios from "axios";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordConfirmation = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if(passwordConfirmation.current.value !== password.current.value) {
      passwordConfirmation.current.setCustomValidity("Passwords don't match!")
    } else {
      const user = {
        username : username.current.value,
        email : email.current.value,
        password : password.current.value
      }
      try {
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (error) {
        console.log(error)
      }
    }

  }

  const handleLoginButton = async (e) => {
    e.preventDefault();
    try {
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Omarsocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Omarsocial.
          </span>
        </div>
        <div className="loginRight" onSubmit={handleClick}>
          <form className="loginBox">
            <input placeholder="Username" type="Text" required ref={username} className="loginInput" />
            <input placeholder="Email" type="Email" required ref={email} className="loginInput" />
            <input
              placeholder="Password"
              type="Password"
              required
              className="loginInput"
              ref={password}
              minLength="6"
            />
            <input
              placeholder="Password Confirmation"
              type="Password"
              required
              className="loginInput"
              ref={passwordConfirmation}
            />
            <button className="loginButton" type="submit">Sign Up</button>            
            <button className="loginRegisterButton" onClick={handleLoginButton}>Log Into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
