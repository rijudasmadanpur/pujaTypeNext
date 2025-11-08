import React from "react";
import { Navbar } from "./components/navbar/navbar";
import HeroSection from "./components/heroSection/HeroSection";
import TestimonialSection from "./components/testimonialSection";
import { PujaListSection } from "./components/pujaListSection/PujaListSection";
import LocationSelector from "./components/navbar/component/location/LocationSelector";
// import InfiniteMovingSection from "./components/infiniteMovingCard/InfiniteMovingSection";
import Footer from "./components/footer/Footer";
// import LoginSignupDialog from "./components/loginSignup/LoginSignupdialog";
// import { MobileOption } from "./components/navbar/component/MobileOption";

const Page: React.FC = () => {
  return (
    <div className="overflow-hidden">
      {/* <Navbar /> */}
      <HeroSection />
      <div className="w-screen bg-orange-300 pt-18 0   p-15">

        <PujaListSection showAll={false} type="home" />
      </div>
      <TestimonialSection />
      <Footer />

      {/* <LocationSelector /> */}
      {/* <InfiniteMovingSection />
      <MobileOption /> */}
    </div>
  );
};

export default Page;
