import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, NavLink } from "react-router";

const Navigation = () => {

    return (
        <header className="container">
                <Container className="py-3">
            <Navbar expand="lg" sticky="top" style={{ backgroundColor: "#1a1a1a"}}>
                    <Navbar.Brand as={Link} to={"/"} className="fs-5 swars-font-style text-white">
                        STAR WARS
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarNav" />
                    <Navbar.Collapse id="navbarNav">
                        <Nav className="mx-auto">
                            <NavLink to="/films" className="nav-item-custom">Films </NavLink>
                            <NavLink to="/people" className="nav-item-custom">Characters </NavLink>
                            <NavLink to="/planets" className="nav-item-custom">Planets </NavLink>
                            <NavLink to="/species" className="nav-item-custom">Species</NavLink>
                            <NavLink to="/starships" className="nav-item-custom">Starships</NavLink>
                            <NavLink to="/vehicles" className="nav-item-custom">vehicles</NavLink>
                        </Nav>
                    </Navbar.Collapse>
            </Navbar>
                </Container>
        </header>
    );
};

export default Navigation;
