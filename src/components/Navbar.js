import React, { useState, useEffect } from "react";
import logo from "../logo.png";
import { FaBars } from "react-icons/fa";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const log = () => {
    window.location = "/signin";
  };

  const dis = () => {
    setIsOpen(true);
  };



  return (
    <div>
      <div className="big">
        <div className={`nav ${scrolled ? "nav-scroll" : ""}`}>
          <div className="navflex">
            <img src={logo} alt="" className="navimg" />
            <div className="navflexi">
              <h1 className="nav1">Home</h1>
              <h1 className="nav1">Author</h1>
              <h1 className="nav1">About</h1>
            </div>
            <div className="navflexii">
              <h1 className="nav1" onClick={log}>
                Login
              </h1>
              <input
                type="text"
                placeholder="Type & Hit Enter......"
                className="navi"
              />
            </div>
          </div>
          <div className="bottomnav"></div>
        </div>
      </div>

      <div className="small">
        <div className={`nav ${scrolled ? "nav-scroll" : ""}`}>
          <div className="navflex">
            <img src={logo} alt="" className="navimg" />
            <div className="navflexii">
              <h1 className="menu-btn" onClick={dis}>
                <FaBars  />
              </h1>
            </div>
          </div>
          <div className="bottomnav"></div>
        </div>

        <div
          className={`overlay ${isOpen ? "active" : ""}`}
          onClick={() => setIsOpen(false)}
        />

        <div
          className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-closed"}`}
        >
          <div className="sidebar-content">
            <XMarkIcon
              className="close-icon"
              onClick={() => setIsOpen(false)}
            />

            <div className="sidebar-section">
              <h1 className="section-title">Home</h1>
            </div>

            <div className="sidebar-section">
              <h1 className="section-title">Author</h1>
            </div>
            <div className="sidebar-section">
              <h1 className="section-title">About</h1>
            </div>

            <div className="sidebar-footer">
              <h1 className="section-title-footer" onClick={log}>Sign In</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
