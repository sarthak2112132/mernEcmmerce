import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="bg-black p-4 text-light">
        <h1 className="text-center">
          <Link to="/about"> About</Link> | <Link to="/contact">Contact</Link>
        </h1>
      </div>
    </>
  );
};

export default Footer;
