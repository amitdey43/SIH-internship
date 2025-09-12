import React from "react";
import { useId } from "react";

export function FeaturesSectionDemo() {
  return (
    <div className="py-20 lg:py-40">
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-2 max-w-7xl mx-auto">
        {grid.map((feature) => (
          <div
            key={feature.title}
            className="relative bg-gradient-to-b dark:from-neutral-700 from-neutral-100 dark:to-neutral-900 to-white p-6 rounded-3xl overflow-hidden">
            <Grid size={20} />
            <p
              className="text-base font-bold text-neutral-800 dark:text-white relative z-20">
              {feature.title}
            </p>
            <p
              className="text-neutral-600 dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const grid = [
  {
    title: "AI Career Guidance",
    description:
      "Personalized advice tailored for students, mentors, and HR professionals to guide career decisions.",
  },
  {
    title: "AI Internship Recommendations",
    description:
      "Receive 3–5 tailored internship suggestions that match your skills, goals, and interests.",
  },
  {
    title: "AI Resume & Interview Support",
    description:
      "Get instant resume feedback, improvements, and practice with AI-powered mock interview questions.",
  },
  {
    title: "Skill Gap & Learning Suggestions",
    description:
      "Detect gaps in your skill set and receive personalized learning paths to stay ahead in your career.",
  },
  {
    title: "Mentorship Support",
    description:
      "Connect with mentors via chat or video calls, share feedback, and grow through personalized guidance.",
  },
  {
    title: "HR Tools",
    description:
      "Post internships, review candidate applications, and conduct interviews with ease.",
  },
  {
    title: "Notifications & User Management",
    description:
      "Stay updated with automated notifications on applications and manage users securely with onboarding and password reset.",
  },
  {
    title: "Chatbot Assistance",
    description:
      "Get instant help with FAQs, registration, and career guidance through our AI-powered chatbot.",
  },
];


export const Grid = ({
  pattern,
  size
}) => {
  const p = pattern ?? [
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
  ];
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-0  -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div
        className="absolute inset-0 bg-gradient-to-r  [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-300/30 dark:to-zinc-900/30 opacity-100">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          className="absolute inset-0 h-full w-full  mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10" />
      </div>
    </div>
  );
};

export function GridPattern({
  width,
  height,
  x,
  y,
  squares,
  ...props
}) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}>
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]) => (
            <rect
              strokeWidth="0"
              key={`${x}-${y}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height} />
          ))}
        </svg>
      )}
    </svg>
  );
}
