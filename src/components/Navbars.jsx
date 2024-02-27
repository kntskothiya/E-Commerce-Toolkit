import React from "react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Navbars = () => {
    return (
        <>
            <Navbar expand="lg" className="bg-warning px-5">
                <Navbar.Brand href="#"></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link fw-bold text-dark fs-4" to="/">
                            HOME
                        </Link>
                    </Nav>
                    <Link className="nav-link" to="/cart">
                        <ShoppingCartIcon style={{ position: "relative", fontSize: "35px" }} />
                        <Badge pill bg="danger" style={{ position: "absolute" }}>
                            {/* {productinfo} */}
                        </Badge>
                    </Link>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};

export default Navbars;