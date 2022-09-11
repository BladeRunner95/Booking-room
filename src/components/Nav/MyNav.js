import Nav from 'react-bootstrap/Nav';
import {Container, Navbar, NavDropdown, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useNavigate} from "react-router-dom";
import './Nav.css'
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../actions/user.actions";
import {useTranslation} from 'react-i18next';


export const MyNav = (props) => {

    const {t} = useTranslation();
    const {i18n} = useTranslation();
    const loggedIn = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userStorage = localStorage.getItem('user');
    const admin = localStorage.getItem('admin');

    const handleLogout = () => {
        dispatch(userActions.logout());
        navigate('/', {replace: true});

    };

    const handleSwitchLang = (e) => {
        i18n.changeLanguage(e.target.value);
    };

    return (
        <div>
            <Navbar className="myNav" collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand className="fs-2" as={Link} to={"/"}>PIRATE</Navbar.Brand>
                    {/*</div>*/}
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
                            {/*make dashboard only for admin*/}
                            {
                                loggedIn.loggedIn &&
                                //add dynamic user id (example from localStorage)
                                <Nav.Link as={Link} to={`/myProfile/${userStorage}`}
                                          href={`/myProfile/${userStorage}`}>{t('profile')}</Nav.Link>
                            }
                            {
                                loggedIn.loggedIn && admin &&
                                <Nav.Link as={Link} to={"/dashboard"} href="/dashboard">{t('dashboard')}</Nav.Link>
                            }
                            <Nav.Link as={Link} to={"/locations"} href="/locations">{t('toBook')}</Nav.Link>
                            <NavDropdown title={t('lang')} id="collasible-nav-dropdown" className="pe-1">
                                <Button variant="outline-dark" onClick={handleSwitchLang} className="w-100"
                                        value='en'>En</Button>
                                <NavDropdown.Divider/>
                                <Button variant="outline-dark" onClick={handleSwitchLang} value='he'>He</Button>
                            </NavDropdown>
                            {loggedIn.loggedIn ?
                                <Button className="button" onClick={handleLogout} variant="danger">{t('logout')}
                                </Button> :
                                <Button className="button" as={Link} to={"/signin"} variant="danger">{t('signIn')}
                                </Button>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}