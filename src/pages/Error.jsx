import React from "react";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import "./error.css";
import udpdating_site from "../assets/updating_site.svg";

function Error() {
  return (
    <div className="error-container">
      <Navbar links={["Categories", "Blog", "PRO"]} />
      <div className="error-content">
        <h1>We can’t find the page you’re looking for</h1>
        <p>
          But don't worry! we have{" "}
          <a href="/">hundreds of courses </a>for you to choose!
        </p>
        <div className="error-img">
          <img src={udpdating_site} alt="Updating Site" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Error;
