"use client";
import React from "react";
import { Button } from "../component/ui/moving-border";
import { ContainerTextFlip } from "../component/ui/container-text-flip";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
import { PlaceholdersAndVanishInput } from "../component/ui/placeholders-and-vanish-input";
import { useId } from "react";
import { AnimatedTooltip } from "../component/ui/animated-tooltip";
// import Navbar from "@/common/Navbar";
import Header from "./Header";
import "./Hero.css";
import { FeaturesSectionDemo } from "../component/ui/FeaturesSectionDemo";
import Features from "./Features";
import AIGenerator from "./AIGenerator";

export default function HomePage() {
  const words = [
    "Next Milestone",
    "Perfect Role",
    "Growth Path",
    "Winning Track",
  ];

  const placeholders = [
    "Find your Dream Internship",
    "Find your Perfect Role",
    "Find your Future Career",
    "Find your Dream Opportunity",
  ];

  const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Career Mentor",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "HR Specialist",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Resume Expert",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "Interview Coach",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    name: "Tyler Durden",
    designation: "Skill Development Trainer",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=3540&q=80",
  },
  {
    id: 6,
    name: "Dora",
    designation: "Student Success Guide",
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=3534&q=80",
  },
];


  const handleChange = (e) => console.log(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="relative flex flex-col items-center gap-8 text-center px-4 my-10 mt-[-35px]">
      {/* Make Navbar fixed on top so it's always visible */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>

      {/* Add top padding equal to navbar height */}
      <div className="pt-[80px] flex flex-col items-center gap-8 w-full">
        {/* Top Button */}
        <Button
          borderRadius="1.75rem"
          className="w-84.4 bg-white dark:bg-slate-150 text-black border border-neutral-300 font-semibold px-6 py-2"
        >
          No. 1 Internship Recommendation Platform
        </Button>

        {/* Animated Heading */}
        <motion.h1
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className={cn(
            "max-w-4xl text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold leading-snug tracking-tight text-zinc-700 dark:text-zinc-100 mt-[-35px]"
          )}
          layout
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF9933] via-[#000080] to-[#138808]">
            Search, Apply & Get your
          </span>
          <ContainerTextFlip
            words={words}
            className="w-[700px] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold"
          />
        </motion.h1>

        {/* Animated Tooltip */}
        <div className="flex flex-row items-center justify-center mb-10 w-full max-w-4xl">
          <AnimatedTooltip items={people} />
          <p
            className="text-zinc-700 dark:text-zinc-500 ml-5"
            style={{ fontWeight: 450 }}
          >
            So many people have connected with us!
          </p>
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl text-base sm:text-lg text-zinc-600 dark:text-zinc-500 mt-[-45px]"
        >
          Our{" "}
          <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#FF9933] via-[#000080] to-[#138808]">
            AI-powered engine
          </span>{" "}
          matches your education, skills, and interests with the{" "}
          <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#FF9933] via-[#000080] to-[#138808]">
            best internships
          </span>
          . Simple, fast, and fully personalized — built to help you grow.
        </motion.p>

        {/* Search Bar */}
        <div className="w-full max-w-xl mt-5">
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
        </div>

        {/* Features Section */}
        <div className="py-16">
          {/* Section Title */}
          <div className="text-center mb-5 mt-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
              What we provide
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-600 max-w-2xl mx-auto">
              Explore the services and features we offer to make your experience
              exceptional.
            </p>
          </div>

          {/* Features Component */}
          <div className="max-w-6xl mx-auto px-4 mt-[-120px]">
            <FeaturesSectionDemo />
          </div>
        </div>

        <div className="mt-[-105px]">
          {/* <Features /> */}
          <AIGenerator />
        </div>
      </div>
    </div>
  );
}
