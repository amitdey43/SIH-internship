"use client";
import React, { useState } from "react";
import axios from "axios";
import { Label } from "../component/ui/input";
import { Input } from "../component/ui/input";
import { cn } from "../lib/utils";

export function RegisterMentor() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: "",
    phone: "",
    designation: "",
    organization: "",
    expertiseAreas: [],
    experienceYears: "",
    linkedIn: "",
    bio: "",
  });

  const [expertiseInput, setExpertiseInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "expertiseAreas") {
        form.append("expertiseAreas", JSON.stringify(value));
      } else {
        if (value) form.append(key, value);
      }
    });

    axios
      .post("http://localhost:8000/app/mentor/register", form, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
      .then((res) => {
        console.log("Register Success:", res.data);
        alert("Mentor registered successfully!");
      })
      .catch((err) => {
        setError(err.response?.data || "Something went wrong");
        alert(err.response?.data?.message || "Something went wrong");
      });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addExpertise = () => {
    if (expertiseInput.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        expertiseAreas: [...prev.expertiseAreas, expertiseInput.trim()],
      }));
      setExpertiseInput("");
    }
  };

  const removeExpertise = (index) => {
    setFormData((prev) => ({
      ...prev,
      expertiseAreas: prev.expertiseAreas.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black mt-16">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 flex justify-center">
        Register as Mentor
      </h2>
      <form className="my-8 space-y-4" onSubmit={handleSubmit}>
        <LabelInputContainer>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            placeholder="Enter your full name"
            onChange={handleChange}
            required
            className="dark:text-neutral-500"
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            placeholder="Enter your email address"
            onChange={handleChange}
            required
            className="dark:text-neutral-500"
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            placeholder="Create a strong password"
            onChange={handleChange}
            required
            className="dark:text-neutral-500"
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="profilePic">Profile Picture</Label>
          <Input
            id="profilePic"
            name="profilePic"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="dark:text-neutral-600"
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            placeholder="Enter your phone number"
            onChange={handleChange}
            required
            className="dark:text-neutral-500"
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="designation">Designation</Label>
          <Input
            id="designation"
            name="designation"
            value={formData.designation}
            placeholder="e.g. Senior Developer"
            onChange={handleChange}
            required
            className="dark:text-neutral-500"
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="organization">Organization</Label>
          <Input
            id="organization"
            name="organization"
            value={formData.organization}
            placeholder="Enter your organization name"
            onChange={handleChange}
            required
            className="dark:text-neutral-500"
          />
        </LabelInputContainer>

        {/* Expertise field with add/remove */}
        <LabelInputContainer>
          <Label>Expertise Areas</Label>
          <div className="flex gap-2">
            <Input
              className="dark:text-neutral-800"
              value={expertiseInput}
              placeholder="Add expertise (e.g. React, AI, Data Science)"
              onChange={(e) => setExpertiseInput(e.target.value)}
            />
            <button
              type="button"
              onClick={addExpertise}
              className="px-3 py-1 text-white rounded bg-gradient-to-br from-cyan-600 to-indigo-100"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.expertiseAreas.map((item, index) => (
              <span
                key={index}
                className="bg-gray-200 px-2 py-1 rounded text-sm flex items-center gap-1"
              >
                {item}
                <button
                  type="button"
                  onClick={() => removeExpertise(index)}
                  className="text-red-500"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="experienceYears">Experience (Years)</Label>
          <Input
            id="experienceYears"
            name="experienceYears"
            type="number"
            value={formData.experienceYears}
            placeholder="Enter your years of experience"
            onChange={handleChange}
            className="dark:text-neutral-500"
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="linkedIn">LinkedIn URL</Label>
          <Input
            id="linkedIn"
            name="linkedIn"
            value={formData.linkedIn}
            placeholder="https://linkedin.com/in/username"
            onChange={handleChange}
            className="dark:text-neutral-500"
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="bio">Bio</Label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            placeholder="Write a short bio about yourself"
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </LabelInputContainer>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white
          bg-gradient-to-br from-cyan-600 to-indigo-100"
          type="submit"
        >
          Register Mentor →
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>
    {children}
  </div>
);
