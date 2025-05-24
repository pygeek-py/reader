import React, { useState, useRef, useEffect } from "react";
import logo from "../logo.png";
import {
  XMarkIcon,
  PlusIcon,
  MinusIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { FaBars, FaSearch, FaTimes } from "react-icons/fa";

const HomeNav = () => {
  const [sea, setSea] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handlesub = (event) => {
    event.preventDefault();

    window.location = `/search/${sea}`;
  };

  const handlekey = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handlesub(event);
    }
  };

  const hom = () => {
    window.location = "/";
  };
  const aut = () => {
    window.location = "/author";
  };
  const my = () => {
    window.location = "/mybook";
  };

  const out = async () => {
    window.location = "/signin";
  };

  const [va, setVa] = useState(false);
  const [vas, setVas] = useState(false);

  const dis = () => {
    setVa(true);
    setIsOpen(true);
  };

  const val = () => {
    setVas(true);
    console.log("hello");
  };

  return (
    <div>
      <div className="big">
        <div className={`nav ${scrolled ? "nav-scroll" : ""}`}>
          <div className="navflex">
            <img src={logo} alt="" className="navimg" onClick={hom} />
            <div className="navflexis">
              <h1 className="nav1" onClick={hom}>
                Home
              </h1>
              <h1 className="nav1" onClick={aut}>
                Author
              </h1>
              <h1 className="nav1" onClick={my}>
                My books
              </h1>
              <h1 className="nav1">About</h1>
            </div>
            <div className="navflexii">
              <h1 className="nav1" onClick={out}>
                Logout
              </h1>
              <form onSubmit={handlesub} className="nec">
                <input
                  type="text"
                  placeholder="Type & Hit Enter......"
                  className="navi-home"
                  onChange={(e) => setSea(e.target.value)}
                  onKeyDown={handlekey}
                />
              </form>
            </div>
          </div>
          <div className="bottomnav"></div>
        </div>
      </div>

      <div className="small">
        <div className={`nav ${scrolled ? "nav-scroll" : ""}`}>
          <div className="navflex">
            <img src={logo} alt="" className="navimg" />

            
            <div className="navflexiii">
              <h1 className="sa1" onClick={dis}>
                <FaBars />
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
              <h1 className="section-title" onClick={hom}>Home</h1>
            </div>

            <div className="sidebar-section">
              <h1 className="section-title" onClick={aut}>Author</h1>
            </div>

            <div className="sidebar-section">
              <h1 className="section-title" onClick={my}>My books</h1>
            </div>

            <div className="sidebar-section">
              <h1 className="section-title">About</h1>
            </div>

            <div className="sidebar-footer">
              <h1 className="section-title-footer" onClick={out}>Sign Out</h1>
            </div>

               <form onSubmit={handlesub} className="nec-home">
                 <input
                   type="text"
                   placeholder="Type & Hit Enter......"
                   className="navi-home"
                   onChange={(e) => setSea(e.target.value)}
                   onKeyDown={handlekey}
                 />
               </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeNav;
