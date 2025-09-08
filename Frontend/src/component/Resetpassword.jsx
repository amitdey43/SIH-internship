import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Resetforgotpassword = function () {
  let navigate = useNavigate();
  let { role, token } = useParams();
  let [newpassword, setNewPassword] = useState("");
  let [confirmpassword, setConfirmPassword] = useState("");

  let handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:8000/app/${role.toLowerCase()}/reset-password/${token}`,
        {
          newpassword,
          confirmpassword,
        },
        { withCredentials: true }
      )
      .then((res) => navigate(`/${role.toLowerCase()}/dashboard`))
      .catch((err) => console.error("Reset failed:", err.response?.data || err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="newpassword"
          placeholder="Enter your new password"
          value={newpassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          name="confirmpassword"
          placeholder="Re-enter your password"
          value={confirmpassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};
