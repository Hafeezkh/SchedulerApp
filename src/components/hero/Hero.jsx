import React from "react";
import { Link } from "react-router-dom";
import Banner from "../../assets/undraw_real_time_sync_re_nky7.svg";

const Hero = () => {
  return (
    <main className="bg-gradient-to-r from-ivory-900 to-ivory-800 pt-20 dark:bg-ivory-900">
      <section className="container flex h-[650px] flex-col items-center justify-center md:h-[500px] ">
        <div className="grid grid-cols-1 items-center gap-8 dark:text-white md:grid-cols-2">
          <div
            data-aos="fade-right"
            data-aos-duration="400"
            data-aos-once="true"
            className="flex flex-col items-center gap-4 text-center text-white md:items-start md:text-left "
          >
            <h1 className="text-4xl ">
              Welcome to <Link to="/#home" className="">
              Scheduler
                <span className="inline-block font-bold text-primary">APP</span>
              </Link>
            </h1>
            <p>
            Maximize Productivity! Sign in to Our Scheduler App for Seamless Organization and Stress-Free Living
            </p>
            <div className="space-x-4">
              <Link to="login" className="button-link">
                {/* Use Link to create a link to another route */}
                <button className="rounded-md border-2 border-primary bg-primary px-4 py-2 text-sm text-white transition-colors duration-300 hover:bg-primary/80">
                  Sign-In
                </button>
              </Link>
              <Link to="sign-up" className="button-link">
              <button className="border-1  rounded-md border-2 border-white px-4 py-2 text-sm text-white transition-colors duration-300 ">
                Sign-Up
              </button>
              </Link>
            </div>
          </div>
          <div
            data-aos="fade-left"
            data-aos-duration="400"
            data-aos-once="true"
            className="mx-auto max-w-xs p-4"
          >
            <img src={Banner} alt="No image" className="hover:drop-shadow-md" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Hero;
