import React from "react";
import { LightningIcon, SecurityIcon, SupportIcon } from "./Icons";

const Features = () => (
  <section id="features" className="section" style={{ backgroundColor: "var(--white)" }}>
    <div className="container">
      <div className="section-header">
        <h2>Why Choose Us?</h2>
        <p>Everything you need to launch and grow your business.</p>
      </div>
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon-wrapper"><LightningIcon /></div>
          <h3>Lightning Fast</h3>
          <p>Our platform is optimized for speed and performance.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon-wrapper"><SecurityIcon /></div>
          <h3>Rock-Solid Security</h3>
          <p>We use industry-standard encryption and practices.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon-wrapper"><SupportIcon /></div>
          <h3>24/7 Support</h3>
          <p>Our support team is always available to help.</p>
        </div>
      </div>
    </div>
  </section>
);

export default Features;
