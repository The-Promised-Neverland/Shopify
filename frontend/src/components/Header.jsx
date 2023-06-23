import { Navbar, Nav, Container } from "react-bootstrap";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
const Header = () => {
  return (
    <header >
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect  fixed="top">
        <Container>
          <LinkContainer to='/'>
          <Navbar.Brand>
            Techverse
          </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to='/cart'>
              <Nav.Link >
                <FaShoppingCart />
                Cart
              </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/login'>
              <Nav.Link>
                <FaUser />
                Sign in
              </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
