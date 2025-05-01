import React from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import HeroSection from "../../components/HeroSection/HeroSection";
import Banner from "../../components/Banner/Banner";
import About from "../../components/About/About";
import Plans from "../../components/Plans/Plans";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <div className="body">
      <Navbar />
      <HeroSection />
      <Banner />
      <About />
      <Plans />
      <Footer />
    </div>
  );
};

export default Home;
