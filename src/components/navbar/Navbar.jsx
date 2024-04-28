import React, { useEffect, useState } from "react";
import { BiPhoneCall } from "react-icons/bi";
import ResponsiveMenu from "./ResponsiveMenu";

const Navbar = () => {
  const [theme, setTheme] = useState("dark"); // Set theme to dark mode by default
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const element = document.documentElement;
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
      console.log("dark theme");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
      console.log("light theme");
    }
  }, [theme]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <header
        data-aos="fade"
        data-aos-duration="300"
        className="relative z-[99] border-b-[1px] border-primary/50 bg-blue-700 text-white shadow-lg"
      >
        <nav className="container flex h-[70px] items-center justify-between py-2 ">
          <div className="text-2xl text-white md:text-3xl ">
            <a href="/#home" className="">
              Scheduler
              <span className="inline-block font-bold text-primary">APP</span>
            </a>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <ul className="flex items-center gap-10">
              <a href="/" className="flex h-[72px] items-center gap-[2px]">
                Home{" "}
              </a>
              {/* Phone number section */}
              <div className="flex items-center gap-4">
                {/* <li>
                  <BiPhoneCall className="h-[40px] w-[40px] rounded-md bg-primary p-2 text-2xl text-white hover:bg-primary/90" />
                </li> */}
                {/* <li>
                  <div>
                    <p className="text-sm">Call us on</p>
                    <p className="text-lg">
                      {" "}
                      <a href="tel:+91123456789">+91 123456789</a>
                    </p>
                  </div>
                </li> */}
              </div>
            </ul>
          </div>

          {/* Mobile view  */}
          <div className="flex items-center gap-4 md:hidden ">
            <BiPhoneCall className="h-[40px] w-[40px] rounded-md bg-primary p-2 text-2xl text-white hover:bg-primary/90" />
            <ResponsiveMenu showMenu={showMenu} />
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
