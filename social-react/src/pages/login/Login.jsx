import "./login.css";

export default function Login() {
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
          <div className="loginBox">
            <input placeholder="Email" type="Email" className="loginInput" />
            <input
              placeholder="Password"
              type="Password"
              className="loginInput"
            />
            <button className="loginButton">Login</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              Create a new account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
