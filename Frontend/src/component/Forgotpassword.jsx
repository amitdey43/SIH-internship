"use client";
import React, { useState } from "react";
import axios from "axios";
import { Label } from "../component/ui/input";
import { Input } from "../component/ui/input";
import { cn } from "../lib/utils";

export const Forgotpassword = function () {
  let [email, setEmail] = useState("");
  let [role, setRole] = useState("");
  let [token, setToken] = useState("");

  let handleSubmit = (e) => {
    e.preventDefault();
    let form = { email };

    axios
      .post(`http://localhost:8000/app/${role.toLowerCase()}/forgot-password`, form)
      .then((res) => {
        setToken(res.data.resetToken);
        alert(res.data.message);
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Something went wrong");
      });
  };

  return (
    <div className="login-container">
        <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 mt-50">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-500 text-center">
        Reset Password 🔒
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-400 text-center">
        Enter your email & role to reset your password
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        {/* Email */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email" className="dark:text-neutral-500">Email Address</Label>
          <Input
            id="email"
            placeholder="yourmail@example.com"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </LabelInputContainer>

        {/* Role */}
        <LabelInputContainer className="mb-6">
          <Label htmlFor="role" className="dark:text-neutral-500">Role</Label>
          <select
            id="role"
            name="role"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-zinc-300 dark:text-neutral-400"
          >
            <option value="">--Choose role--</option>
            <option value="User">User</option>
            <option value="Mentor">Mentor</option>
            <option value="HR">HR</option>
          </select>
        </LabelInputContainer>

        {/* Submit Button */}
        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-cyan-600 to-indigo-100 font-medium text-white shadow-md transition hover:shadow-lg"
          type="submit"
        >
          Send Reset Link →
          <BottomGradient />
        </button>
      </form>
    </div>
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>;
};
