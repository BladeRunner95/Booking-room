import {Wrapper} from "./App.styles";
import {Route, Routes} from "react-router-dom";
import {Locations} from "./pages/Locations/Locations";
import {Login} from "./pages/Login/Login";
import {HomePage} from "./pages/Homepage/Homepage";
import {SingleLocation} from "./pages/SingleLocation/SingleLocation";
import {NotFound} from "./components/NotFound/NotFound";
import {Payment} from "./pages/Payment/Payment";
import {useEffect, useState} from "react";
import {Dashboard} from "./pages/Dashboard/Dashboard";
import {useSelector} from "react-redux";


const Message = ({ message }) => (
    <section>
        <p>{message}</p>
    </section>
);

export default function App(props) {
    const admin = useSelector(state => state.userReducer);
    const user = useSelector(state => state.userReducer);
    const [message, setMessage] = useState("");
    const localFilters = JSON.parse(localStorage.getItem('filters'));
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
    }, []);

    return (
        <Wrapper>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/locations" element={<Locations title/>}/>
                <Route path="/singleLocation/:id" element={<SingleLocation/>}/>
                {!user.loggedIn &&
                    <Route path="/signin" element={<Login/>}/>}
                {/*private route for authenticated users*/}
                {user.loggedIn &&
                    <Route path="/payment/:id" element={ message ? (
                    <Message message={message} />) : (<Payment />)} />}
                {/*private routes for admin*/}
                {admin.loggedIn &&
                    <Route path="/dashboard/*" element={<Dashboard/>}/>}

                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Wrapper>
    )
}