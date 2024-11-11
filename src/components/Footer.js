// src/components/Footer.js

import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <p>
        &copy; {new Date().getFullYear()} Chaitanya Sharma. All rights reserved.
      </p>
      <ul>
        <li>
          <a
            href="https://www.linkedin.com/in/chaitanya-sharma-9732b7259/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href="https://github.com/chaitanya8108"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </li>
        <li>
          <a href="mailto:chaitanya81082430@gmail.com">Email</a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
