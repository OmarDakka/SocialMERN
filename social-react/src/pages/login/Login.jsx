import { useRef } from "react";
import "./login.css";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const handleClick = (e) => {
    e.preventDefault();
    console.log(email.current.value);
  };

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
            <button className="loginButton">Login</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              Create a new account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
