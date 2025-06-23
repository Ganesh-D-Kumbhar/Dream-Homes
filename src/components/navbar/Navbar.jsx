// import React, { useEffect, useState } from "react";
// import "./navbar.css";
// import { NavLink } from "react-router-dom";
// import gk from "../../assets/profile.jpg";
// import logo from "../../../public/logo.png";
// import menu from "../../../public/menu.png";

// function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [display, setDisplay] = useState("none");
//   const [width, setWidth] = useState(0);
//   const [height, setHeight] = useState(0);
//   useEffect(() => {
//     if (open) {
//       setDisplay("flex");
//       setWidth("50%");
//       setHeight("100%");
//     } else {
//       setDisplay("none");
//       setWidth(0);
//       setHeight(0);
//     }
//   }, [open]);

//   const slideNav = () => {
//     setOpen(!open);
//   };

//   const user = true;
//   return (
//     <nav>
//       <div className="left">
//         <NavLink to="/home" className="logo link" id="logo">
//           <img
//             src={logo}
//             alt="Logo"
//             style={{ height: "80px", width: "80px" }}
//           />
//         </NavLink>
//         <NavLink className="link" to="/home">
//           {" "}
//           Home{" "}
//         </NavLink>
//         <NavLink className="link" to="/about">
//           {" "}
//           About{" "}
//         </NavLink>
//         <NavLink className="link" to="/contact">
//           {" "}
//           Contact{" "}
//         </NavLink>
//       </div>
//       <div className="right">
//         {user ? (
//           <div className="user">
//             <img src={gk} alt="User" />
//             <span>Dream Homes</span>
//             <NavLink to="/profile" className="profile">
//               <div className="notification">3</div>
//               <span>Profile</span>
//             </NavLink>
//           </div>
//         ) : (
//           <>
//             <NavLink to="/signin">Sign in</NavLink>
//             <NavLink to="/signup" className="register">
//               Sign up
//             </NavLink>
//           </>
//         )}
//         <div className="menuIcon" onClick={slideNav}>
//           <img src={menu} alt="Menu Icon" />
//         </div>
//         <div
//           style={{
//             display: display,
//             width: width,
//             height: height,
//             transition: "2s linear",
//           }}
//           className={`menu ${open ? "active" : ""}`}
//         >
//           <NavLink to="/home" className="!text-3xl">
//             Home
//           </NavLink>
//           <NavLink to="/about">About Us</NavLink>
//           <NavLink to="/contact">Contact Us</NavLink>
//           <NavLink to="/">Register</NavLink>
//           <NavLink to="/login">Login</NavLink>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar



import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import gk from "../../assets/profile.jpg";
import logo from "../../../public/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faInfoCircle,
  faEnvelope,
  faBars,
  faTimes,
  faUser,
  faHeart,
  faSignOutAlt,
  faSignInAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const user = true; // Replace with actual authentication logic

  return (
    <motion.nav
      initial={false}
      animate={scrolled ? "scrolled" : "top"}
      variants={{
        top: { height: "5rem", backgroundColor: "rgba(255, 255, 255, 0.8)" },
        scrolled: { height: "4rem", backgroundColor: "rgba(255, 255, 255, 0.95)" },
      }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 shadow-lg backdrop-blur-sm z-50"
    >
      {/* Left Section - Logo and Links */}
      <div className="flex items-center gap-6">
        <NavLink to="/home" className="flex items-center gap-2 group">
          <motion.img
            src={logo}
            alt="Logo"
            className="h-12 w-12 rounded-md"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          />
          <motion.span
            className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Dream Homes
          </motion.span>
        </NavLink>
        <div className="hidden md:flex items-center gap-4">
          <NavItem to="/home" icon={faHome} text="Home" />
          <NavItem to="/about" icon={faInfoCircle} text="About" />
          <NavItem to="/contact" icon={faEnvelope} text="Contact" />
        </div>
      </div>

      {/* Right Section - User and Mobile Menu */}
      <div className="flex items-center gap-4">
        {user ? (
          <UserMenu />
        ) : (
          <div className="hidden md:flex items-center gap-4">
            <AuthButton to="/signin" icon={faSignInAlt} text="Sign in" variant="ghost" />
            <AuthButton to="/signup" icon={faUserPlus} text="Sign up" variant="primary" />
          </div>
        )}
        <motion.button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
          whileTap={{ scale: 0.95 }}
        >
          <FontAwesomeIcon icon={open ? faTimes : faBars} className="h-6 w-6" />
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && <MobileMenu toggleMenu={toggleMenu} user={user} />}
      </AnimatePresence>
    </motion.nav>
  );
}

function NavItem({ to, icon, text }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out ${
          isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
        }`
      }
    >
      <motion.div
        className="flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FontAwesomeIcon icon={icon} className="h-4 w-4" />
        <span>{text}</span>
      </motion.div>
    </NavLink>
  );
}

function AuthButton({ to, icon, text, variant }) {
  const baseClasses = "px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out";
  const variantClasses =
    variant === "ghost"
      ? "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
      : "bg-blue-600 text-white hover:bg-blue-700";

  return (
    <NavLink to={to} className={({ isActive }) => `${baseClasses} ${variantClasses}`}>
      <motion.div
        className="flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FontAwesomeIcon icon={icon} className="h-4 w-4" />
        <span>{text}</span>
      </motion.div>
    </NavLink>
  );
}

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 focus:outline-none"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <img
          src={gk}
          alt="User"
          className="h-10 w-10 rounded-full border-2 border-blue-600 object-cover"
        />
        <span className="hidden md:block text-sm font-medium text-gray-800">Dream Homes</span>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
          >
            <UserMenuItem to="/profile" icon={faUser} text="Profile" />
            <UserMenuItem to="/favorites" icon={faHeart} text="My Favorites" />
            <UserMenuItem to="/logout" icon={faSignOutAlt} text="Log out" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function UserMenuItem({ to, icon, text }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-4 py-2 text-sm transition-colors duration-200 ${
          isActive ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
        }`
      }
    >
      <motion.div
        className="flex items-center gap-2"
        whileHover={{ x: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        <FontAwesomeIcon icon={icon} className="h-4 w-4" />
        <span>{text}</span>
      </motion.div>
    </NavLink>
  );
}

function MobileMenu({ toggleMenu, user }) {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.3 }}
      className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dream Homes
          </span>
          <motion.button
            onClick={toggleMenu}
            className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
          </motion.button>
        </div>
        <div className="flex-grow overflow-y-auto">
          <MobileMenuItem to="/home" icon={faHome} text="Home" onClick={toggleMenu} />
          <MobileMenuItem to="/about" icon={faInfoCircle} text="About" onClick={toggleMenu} />
          <MobileMenuItem to="/contact" icon={faEnvelope} text="Contact" onClick={toggleMenu} />
          {user && (
            <>
              <MobileMenuItem to="/profile" icon={faUser} text="Profile" onClick={toggleMenu} />
              <MobileMenuItem to="/favorites" icon={faHeart} text="My Favorites" onClick={toggleMenu} />
            </>
          )}
        </div>
        <div className="p-4 border-t">
          {user ? (
            <MobileMenuItem to="/logout" icon={faSignOutAlt} text="Log out" onClick={toggleMenu} />
          ) : (
            <>
              <MobileMenuItem to="/signin" icon={faSignInAlt} text="Sign in" onClick={toggleMenu} />
              <MobileMenuItem to="/signup" icon={faUserPlus} text="Sign up" onClick={toggleMenu} />
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function MobileMenuItem({ to, icon, text, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out ${
          isActive ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
        }`
      }
    >
      <motion.div
        className="flex items-center gap-2 w-full"
        whileHover={{ x: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        <FontAwesomeIcon icon={icon} className="h-4 w-4" />
        <span>{text}</span>
      </motion.div>
    </NavLink>
  );
}

export default Navbar;




