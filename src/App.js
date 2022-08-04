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
import {useSelector} from "react-redux";
import ProtectedRoutes from "./components/PrivateRoute/PrivateRoute";
import Cookies from "js-cookie";
import {Profile} from "./pages/Profile/Profile";


const Message = ({message}) => (
    <section>
        <p>{message}</p>
    </section>
);

export default function App(props) {
    const admin = useSelector(state => state.userReducer);
    const loggedIn = Cookies.get('access_token');
    const location = useLocation();
    const [message, setMessage] = useState("");
    const localFilters = JSON.parse(localStorage.getItem('filters'));
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
            setMessage(
                "Order canceled -- continue to shop around and checkout when you're ready."
            );
        }

        // let isAdmin = await axios.get(`http://localhost:5000/api/auth/checkadmin/${}`)
    }, []);

    return (
        <Wrapper>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/locations" element={<Locations title/>}/>
                <Route path="/singleLocation/:id" element={<SingleLocation/>}/>
                <Route path="/signin" element={isLoggedIn(<Login/>)}/>
                <Route path="/signup" element={isLoggedIn(<SignUp/>)}/>
                {/*private route for authenticated users*/}
                {/*{user.loggedIn &&*/}
                <Route element={<ProtectedRoutes/>}>
                    <Route path="/payment/:id" element={message ? (
                        <Message message={message}/>) : (<Payment/>)}/>
                </Route>
                {loggedIn && <Route path="/myProfile/:id" element={<Profile/>}/>}
                {/*private routes for admin*/}
                {admin.loggedIn &&
                    <Route path="/dashboard/*" element={<Dashboard/>}/>}

                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Wrapper>
    )
}