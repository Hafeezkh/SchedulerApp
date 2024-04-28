import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from "../navbar/Navbar";
import Hero from '../hero/Hero';
import Footer from '../footer/Footer';
import blog1 from '../../assets/blog1.jpg';

const Home = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 500,
      easing: 'ease-in-sine',
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="dark:bg-slate-900 dark:text-white p-6">
      <Hero />

      {/* <Service /> */}
 
    </div>
  );
};

export default Home;
