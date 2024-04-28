import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/navbar/Navbar";
import Home from './components/home/Home';
import Footer from './components/footer/Footer';
import Login from './components/pages/Login';
import CreateAccount from './components/pages/CreateAccount';
import Dashboard from './components/pages/Dashboard';
import Calendar from './components/pages/Calendar';


const App = () => {
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
    <Router>
      <div>
        <Navbar />
        <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/login" element={<Login />} />
         <Route path="/sign-up" element={<CreateAccount />} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/calendar" element={<Calendar/>}/>

         </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;