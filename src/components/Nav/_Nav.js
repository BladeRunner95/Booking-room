import Nav from 'react-bootstrap/Nav';
import {Container, Navbar, NavDropdown, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, Link} from "react-router-dom";
import {Locations} from "../../pages/Locations/Locations";
import {Login} from "../../pages/Login/Login";
import App from "../../App";


export const _Nav = (props) => {
    return (
        <div>
            {/*<Router>*/}
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <div style={{marginRight: "90px"}}>
                <Navbar.Brand as={Link} to={"/"}>PIRATE</Navbar.Brand>
                </div>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link as={Link} to={"/locations"} href="/locations">Book A Studio</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            Dank memes
                        </Nav.Link>
                        <NavDropdown title="En" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">En</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">He</NavDropdown.Item>
                        </NavDropdown>
                        <Button as={Link} to={"/signin"} variant="danger">Sign In</Button>{' '}
                        {/*<Button as={Link} to={"/locations"} component={Locations} variant="outline-light">Book a studio</Button>{' '}*/}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
            <div>
                <Routes>
                    <Route path="/"/>
                    <Route path="/locations" element={<Locations/>}/>
                    <Route path="/signin" element={<Login/>}/>
                </Routes>
            </div>
            {/*</Router>*/}
        </div>
    )
}