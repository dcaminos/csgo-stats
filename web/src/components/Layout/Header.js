import ServerActions from "components/ServerActions";
import React from "react";
import { MdClearAll } from "react-icons/md";
import { Button, Nav, Navbar } from "reactstrap";
import bn from "utils/bemnames";

const bem = bn.create("header");

class Header extends React.Component {
  handleSidebarControlButton = (event) => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector(".cr-sidebar").classList.toggle("cr-sidebar--open");
  };

  render() {
    return (
      <Navbar
        light
        expand
        className={bem.b("bg-white d-flex justify-content-between")}
      >
        <Nav navbar className="mr-2">
          <Button outline onClick={this.handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
        </Nav>
        <ServerActions />
      </Navbar>
    );
  }
}

export default Header;
