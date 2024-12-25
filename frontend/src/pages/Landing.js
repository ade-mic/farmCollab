import React from "react";
import HeroSection from "../components/HeroSection.jsx";
import AboutSection from "../components/AboutSection.jsx";
import FeaturesSection from "../components/FeaturesSectio.jsx";
import TestimonialsSection from "../components/TestimonialsSection.jsx";
import { Padding } from "@mui/icons-material";

const LandingPage = () => {
  return (
    <div>
      <HeroSection style={{ marginTop:'0px', PaddingTop:'0px'}} />
      <AboutSection />
      <FeaturesSection />
      <TestimonialsSection />
    </div>
  );
};

export default LandingPage;
