import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
  return (
    <div className="login-page">
      <div className="login-card">

        <Link to="/" className="back-home">
          ← Back to UniReach
        </Link>

        <h1>Welcome Back</h1>

        <p>Log in to your UniReach account</p>

        <form
  onSubmit={(e) => {
    e.preventDefault();
    navigate("/dashboard");
  }}
>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
          />

          <div className="forgot-password">
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit">Login</button>
        </form>

        <p className="signup-text">
          Don't have an account?{" "}
          <Link to="/signup">Sign Up</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;