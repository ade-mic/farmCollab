import React from "react";
import HeroSection from "../components/HeroSection.jsx";
import AboutSection from "../components/AboutSection.jsx";
import FeaturesSection from "../components/FeaturesSectio.jsx";
import TestimonialsSection from "../components/TestimonialsSection.jsx";

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <TestimonialsSection />
    </div>
  );
};

export default LandingPage;
