import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import AIGenerator from "../components/AIGenerator";
// import Features from "../components/Features";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";

export const Home = () => (

    <div className="min-h-screen w-full bg-[#f8fafc] relative">
      
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e2e8f0 1px, transparent 1px),
            linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
          `,
          backgroundSize: "20px 30px",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
        }}
      />

      <Header />
    <main>
      <Hero />
      {/* <AIGenerator /> */}
      {/* <Features /> */}
    </main>
    <Footer />
    {/* <Chatbot /> */}
    </div>
  );


