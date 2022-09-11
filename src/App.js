import {Wrapper} from "./App.styles";
import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {Locations} from "./pages/Locations/Locations";
import {Login} from "./pages/Login/Login";
import {SignUp} from "./pages/SignUp/SignUp";
import {HomePage} from "./pages/Homepage/Homepage";
import {SingleLocation} from "./pages/SingleLocation/SingleLocation";
import {NotFound} from "./components/NotFound/NotFound";
import {Payment} from "./pages/Payment/Payment";
import {useEffect, useState} from "react";
import {Dashboard} from "./pages/Dashboard/Dashboard";
import {useDispatch, useSelector} from "react-redux";
import ProtectedRoutes from "./components/PrivateRoute/PrivateRoute";
import Cookies from "js-cookie";
import {Profile} from "./pages/Profile/Profile";
import {userActions} from "./actions/user.actions";
import {ForgotPas} from "./pages/Login/ForgotPas";
import {ResetPassword} from "./pages/Login/ResetPassword";
import axios from "axios";


const Message = ({message}) => (
    <section>
        <p>{message}</p>
    </section>
);

export default function App(props) {
    const authed = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const loggedIn = Cookies.get('access_token');
    const admin = localStorage.getItem('admin');
    const userId = localStorage.getItem('user');
    const location = useLocation();
    const [message, setMessage] = useState("");
    // const [isAdmin, setIsAdmin] = useState(false);
    //this state should be stored in reducer
    const isLoggedIn = (component) => {
        return loggedIn ? location.state?.from ?
            <Navigate to={location.state.from} replace state={{from: location}}/> :
            <Navigate to='/' replace/> : component;
    }

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);

        if (query.get("success")) {
            setMessage("Order placed! You will receive an email confirmation.");
        }

        if (query.get("canceled")) {
            setMessage("Order canceled -- continue to shop around and checkout when you're ready.");
        }
    }, []);

    // useEffect(()=> {
    //         if (userId && authed.loggedIn) {
    //             const checkAdmin = async () => {
    //                 try {
    //                 let isAdmin = await axios.get(`http://localhost:5000/api/auth/checkadmin`, {
    //                     withCredentials: true
    //                 });
    //                if (isAdmin.status && isAdmin.status === 200) {
    //                    // setIsAdmin(true);
    //                }
    //                 //all this move to user reducer after cookie checking
    //                 } catch (e) {
    //                     //send
    //                     console.log(e.response.data);
    //                 }
    //             }
    //             checkAdmin();
    //     }
    // },[userId]);

    useEffect(()=> {
        const cookieExpired = () => {
            if (!loggedIn) {
                dispatch(userActions.logout());
                console.log('i was logged out');
            }
        }
        cookieExpired();
    },[dispatch]);

    return (
        <Wrapper>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/locations" element={<Locations title/>}/>

                {/*<Route element={<ProtectedRoutes/>}>*/}
                <Route path="/singleLocation/:id" element={<SingleLocation/>}/>
                {/*</Route>*/}

                <Route path="/signin" element={isLoggedIn(<Login/>)}/>
                <Route path="/signup" element={isLoggedIn(<SignUp/>)}/>

                {
                    !loggedIn && <Route path="/forgot" element={<ForgotPas/>}/>
                }
                <Route path="/reset/:id" element={isLoggedIn(<ResetPassword/>)}/>
                {/*private route for authenticated users*/}
                {/*{user.loggedIn &&*/}
                <Route element={<ProtectedRoutes/>}>
                    <Route path="/payment/:id" element={message ? (
                        <Message message={message}/>) : (<Payment/>)}/>
                </Route>
                {loggedIn && <Route path="/myProfile/:id" element={<Profile/>}/>}
                {/*private routes for admin*/}
                {authed.loggedIn && admin &&
                    <Route path="/dashboard/*" element={<Dashboard/>}/>}

                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Wrapper>
    )
}