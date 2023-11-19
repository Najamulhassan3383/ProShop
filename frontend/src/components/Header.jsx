import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/logo.png";
import { LinkContainer } from "react-router-bootstrap";

function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" />
            Proshop
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/cart">
              <Nav.Link>
                <FaShoppingCart />
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link>
                <FaUser /> Sign In
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
