import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-violet-950 to-violet-900 p-2">
      <section className="mx-auto max-w-[1200px] text-white flex justify-between items-center px-4 py-5">
        {/* Logo and Title */}
        <div>
          <h1 className="text-xl font-bold sm:text-3xl">
            <a href="/#home">
            Scheduler<span className="font-bold text-primary">APP</span>
            </a>
          </h1>
        </div>

        {/* Social Media Icons */}
        <div className="flex items-center gap-3">
          <a href="#" className="duration-200 hover:scale-105">
            <FaInstagram className="text-3xl" />
          </a>
          <a href="#" className="duration-200 hover:scale-105">
            <FaFacebook className="text-3xl" />
          </a>
          <a href="#" className="duration-200 hover:scale-105">
            <FaLinkedin className="text-3xl" />
          </a>
        </div>

        {/* Copyright */}
        <div>
          <p className="text-center">
            © 2024 Author || Hafeez
          </p>
        </div>
      </section>
    </div>
  );
};

export default Footer;
