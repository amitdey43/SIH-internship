"use client";
import React, { useState } from "react";
import axios from "axios";
import { Label } from "../component/ui/input";
import { Input } from "../component/ui/input";
import { cn } from "../lib/utils";

export function RegisterHR() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    companyName: "",
    companyWebsite: "",
    designation: "",
    department: "",
    industryType: "",
    officeLocation: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/app/hr/register", formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        console.log("HR Registered:", res.data);

        // Reset form on success
        setFormData({
          name: "",
          email: "",
          password: "",
          companyName: "",
          companyWebsite: "",
          designation: "",
          department: "",
          industryType: "",
          officeLocation: "",
        });
        setError(""); // clear error
        alert("HR registered successfully!");
      })
      .catch((err) => {
        const msg =
          err.response?.data?.message ||
          err.response?.data ||
          "Something went wrong";
        setError(msg);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 flex justify-center">
        Register as HR
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300 flex justify-center">
        Fill out the form to create your HR account and start managing your
        company&apos;s hiring process.
      </p>

      <form className="my-8 space-y-4" onSubmit={handleSubmit}>
        <LabelInputContainer>
          <Label htmlFor="name">Full Name</Label>
          <Input
          className="dark:text-neutral-500"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="email">Email</Label>
          <Input
          className="dark:text-neutral-500"
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="password">Password</Label>
          <Input
          className="dark:text-neutral-500"
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            required
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="companyName">Company Name</Label>
          <Input
          className="dark:text-neutral-500"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Enter your company name"
            required
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="companyWebsite">Company Website</Label>
          <Input
          className="dark:text-neutral-500"
            id="companyWebsite"
            name="companyWebsite"
            value={formData.companyWebsite}
            onChange={handleChange}
            placeholder="https://company.com"
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="designation">Designation</Label>
          <Input
          className="dark:text-neutral-500"
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="e.g. HR Manager"
            required
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="department">Department</Label>
          <Input
          className="dark:text-neutral-500"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="e.g. Human Resources"
            required
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="industryType">Industry Type</Label>
          <Input
          className="dark:text-neutral-500"
            id="industryType"
            name="industryType"
            value={formData.industryType}
            onChange={handleChange}
            placeholder="e.g. IT, Finance, Healthcare"
            required
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="officeLocation">Office Location</Label>
          <Input
          className="dark:text-neutral-500"
            id="officeLocation"
            name="officeLocation"
            value={formData.officeLocation}
            onChange={handleChange}
            placeholder="e.g. New Delhi, India"
            required
          />
        </LabelInputContainer>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          className="bg-gradient-to-br from-cyan-600 to-indigo-100 w-95 rounded-2xl h-10"
          type="submit"
        >
          Register HR →
          <BottomGradient /> 
        </button>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
