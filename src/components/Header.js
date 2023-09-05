import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { MDBInput, MDBIcon } from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { setUserLogout } from "../redux/features/authSlice";
import { toast } from "react-toastify";
import { getAllToursBySearch } from "../redux/features/tourSlice";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

export default function Header({ ...props }) {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTitle, setSearchTitle] = useState("");
  // console.log(user && user.token);

  if (user && user.token) {
    const decodedToken = jwt_decode(user.token);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch(setUserLogout());
    }
  }

  const handleSearch = (e) => {
    setSearchTitle(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTitle) {
      navigate("/");
      dispatch(getAllToursBySearch(searchTitle.toString()));
      navigate(`/tour/q?title=${searchTitle}`);
      setSearchTitle("");
    } else {
      navigate("/");
    }
  };

  //to handle logout
  const handleLogout = () => {
    dispatch(setUserLogout());
    toast.info("User logged out");
  };

  //  background: "linear-gradient(to top, #eebec5, #e3ddde)"
  return (
    <Navbar style={{ zIndex: "999", opacity: "1", backgroundColor: "#fff" }} {...(props ? props : null)} sticky="top" expand="lg">
      <Container>
        <Navbar.Brand href="/" style={{ fontWeight: "500" }}>
          TOUR-MERN
        </Navbar.Brand>
        <Nav className="ms-auto" style={{ fontWeight: "700" }}>
          <form className="search" onSubmit={handleSearchSubmit}>
            <MDBInput label="Search By Title" id="typeText" type="text" size="sm" value={searchTitle} onChange={(e) => handleSearch(e)} />
            <MDBIcon fas icon="search" type="submit" onClick={handleSearchSubmit} style={{ cursor: "pointer" }} />
          </form>

          {user?.data?._id && (
            <>
              <span style={{ marginTop: "8px" }}>Logged in as: {user.data.name}</span>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/addtour">Add Tour</Nav.Link>
              <Nav.Link href="dashboard">Dashboard</Nav.Link>
            </>
          )}

          {!user?.data?._id ? (
            <>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
            </>
          ) : (
            <Nav.Link href="/" onClick={handleLogout}>
              Logout
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
