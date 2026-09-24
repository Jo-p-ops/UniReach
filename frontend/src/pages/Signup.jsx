import { Link, useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();
  return (
    <div className="login-page">
      <div className="login-card">

        <Link to="/" className="back-home">
          ← Back to UniReach
        </Link>

        <h1>Create Your Account</h1>

        <p>Join UniReach and discover new opportunities</p>

        <form
  onSubmit={(e) => {
    e.preventDefault();
    navigate("/dashboard");
  }}
>
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your full name"
          />

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
            placeholder="Create a password"
          />

          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            placeholder="Confirm your password"
          />

          <button type="submit">Create Account</button>
        </form>

        <p className="signup-text">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;