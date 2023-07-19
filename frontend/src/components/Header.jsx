import { Badge, Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header style={{ backgroundColor: "red" }}>
      <Navbar
        bg="dark"
        variant="dark"
        expand="md"
        collapseOnSelect
        fixed="top"
        style={{ backgroundColor: "red" }}
      >
        <Container
          style={{ maxWidth: "inherit", marginLeft: "2%", marginRight: "2%" }}
        >
          <LinkContainer to="/">
            <Navbar.Brand>
              <div>Techverse</div>
              {userInfo && userInfo.isAdmin && (
                <div
                  style={{
                    fontSize: "10px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  Admin Mode
                </div>
              )}
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <SearchBox />

              {userInfo && !userInfo.isAdmin && (
                <LinkContainer
                  to="/cart"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Nav.Link>
                    <FaShoppingCart />
                    Cart
                    {cartItems.length > 0 && (
                      <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                        {cartItems.reduce((a, c) => a + c.qty, 0)}
                      </Badge>
                    )}
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo ? (
                <NavDropdown
                  title={userInfo.name}
                  id="username"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer
                  to="/login"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Nav.Link>
                    <FaUser />
                    Sign in
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin === true && (
                <NavDropdown
                  title="Admin"
                  id="adminmenu"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <LinkContainer to="/admin/orderList">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productList">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/userList">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
