import React from "react";
import { Nav, Navbar, NavItem } from "reactstrap";

const Footer = () => {
  return (
    <Navbar>
      <Nav navbar>
        <NavItem>
          Source code available on{" "}
          <a
            href="https://github.com/dcaminos/csgo-stats"
            target="_blank"
            rel="noopener noreferrer"
          >
            {"Github"}
          </a>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Footer;
