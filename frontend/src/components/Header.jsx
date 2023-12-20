import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropDown from "react-bootstrap/NavDropdown";
import Badge from "react-bootstrap/Badge";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/logo.png";
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { clearCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout, { isLoading, data, error: logoutError }] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      dispatch(clearCredentials());
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message || err?.data?.detail || err?.data?.error);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" />
            NH Shop
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/cart">
              <Nav.Link>
                <FaShoppingCart />
                {cartItems.length > 0 && (
                  <Badge
                    style={{
                      marginLeft: "5px",
                    }}
                    pill
                    bg="success"
                  >
                    {cartItems.length}
                  </Badge>
                )}
              </Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <NavDropDown title={userInfo.name} id="username">
                <LinkContainer to="/profile">
                  <NavDropDown.Item>Profile</NavDropDown.Item>
                </LinkContainer>
                <NavDropDown.Item onClick={logoutHandler}>
                  Logout
                </NavDropDown.Item>
              </NavDropDown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaUser /> Sign In
                </Nav.Link>
              </LinkContainer>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropDown title="Admin" id="adminmenu">
                <LinkContainer to="/admin/userlist">
                  <NavDropDown.Item>Users</NavDropDown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/productlist">
                  <NavDropDown.Item>Products</NavDropDown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/orderlist">
                  <NavDropDown.Item>Orders</NavDropDown.Item>
                </LinkContainer>
              </NavDropDown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
