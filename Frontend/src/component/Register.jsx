import { Link } from "react-router-dom";

export const Register = function() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Register Account</h2>

        <Link to="/user/register" className="login-btn user-btn">
          Create account as User
        </Link>

        <Link to="/mentor/register" className="login-btn mentor-btn">
          Create account as Mentor
        </Link>

        <Link to="/hr/register" className="login-btn hr-btn">
          Create account as HR
        </Link>
      </div>
    </div>
  );
};


