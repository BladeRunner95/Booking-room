import Nav from 'react-bootstrap/Nav';
import {Container, Navbar, NavDropdown, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";
import './Nav.css'
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../actions/user.actions";


export const _Nav = (props) => {

    const admin = useSelector(state => state.userReducer);
    const loggedIn = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(userActions.logout());
    };

    return (
        <div>
        <Navbar className="myNav" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                {/*<div style={{marginRight: "90px"}}>*/}
                <Navbar.Brand className="fs-2" as={Link} to={"/"}>PIRATE</Navbar.Brand>
                {/*</div>*/}
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        {/*make dashboard only for admin*/}
                        {admin.loggedIn &&
                            <Nav.Link as={Link} to={"/dashboard"} href="/dashboard">Dashboard</Nav.Link>
                        }
                        <Nav.Link as={Link} to={"/locations"} href="/locations">Book A Studio</Nav.Link>
                        <NavDropdown title="En" id="collasible-nav-dropdown" className="pe-1">
                            <NavDropdown.Item href="#action/3.1">En</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">He</NavDropdown.Item>
                        </NavDropdown>
                        {loggedIn.loggedIn ?
                            <Button className="button" onClick={handleLogout} variant="danger">Log out
                            </Button> :
                            <Button className="button" as={Link} to={"/signin"} variant="danger">Sign In
                            </Button>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </div>
    )
}