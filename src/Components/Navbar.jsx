import React from "react";
import Logo from "../assets/Logo.png";

const Navbar = () => {
  return (
    // Navbar Styling
    <div className="Navbar">
      <div className="LogoDiv">
        <img className="Logo" src={Logo} />
      </div>
      <div>
        <img
          className="Avatar"
          src="https://avatar.iran.liara.run/public/3"
        ></img>
      </div>
    </div>
  );
};

export default Navbar;
