import "./register.css";

export default function Register() {
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
            <input placeholder="Username" type="Text" className="loginInput" />
            <input placeholder="Email" type="Email" className="loginInput" />
            <input
              placeholder="Password"
              type="Password"
              className="loginInput"
            />
            <input
              placeholder="Password Confirmation"
              type="Password"
              className="loginInput"
            />
            <button className="loginButton">Sign Up</button>
            <button className="loginRegisterButton">Log Into Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}
