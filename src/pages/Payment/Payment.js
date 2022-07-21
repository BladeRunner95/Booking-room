import React, {useState, useEffect} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import paymentClasses from "./Payment.module.css";
import StripeCheckout from "react-stripe-checkout";



export const Payment = () => {
    const {id} = useParams();
    const [message, setMessage] = useState("");
    const [ location, setLocation ] = useState(null);
    const [ filters, setFilters ] = useState(null);

    const handleToken = (token, addresses) => {
        console.log(token, addresses)
    };

    useEffect(() => {
        async function getData() {
            try {
                const getLocation = await axios.get(`http://localhost:5000/api/locations/${id}`);
                setLocation(getLocation.data);
                if (localStorage.getItem('filters') !== null) {
                    const getFilters = JSON.parse(localStorage.getItem('filters'));
                    setFilters(getFilters.locations);
                }
                console.log(filters);

                // Check to see if this is a redirect back from Checkout
                // const query = new URLSearchParams(window.location.search);
                //
                // if (query.get("success")) {
                //     setMessage("Order placed! You will receive an email confirmation.");
                // }
                //
                // if (query.get("canceled")) {
                //     setMessage(
                //         "Order canceled -- continue to shop around and checkout when you're ready."
                //     );
                // }

            } catch (e) {
                console.log('pipipiopopo');
            }
        }

        getData();
    }, []);

    return (
        (location && filters &&
                <div className={paymentClasses.mainWrapper}>
        <section>
            <div className={paymentClasses.product}>
                <img
                    src={location.images[0]}
                    alt="The cover of Stubborn Attachments"
                />
                <div className={paymentClasses.description}>
                    <h3>{location.name}</h3>
                    <h5>₪{filters.totalCost}</h5>
                </div>
            </div>
            <StripeCheckout
            stripeKey="pk_test_51LCPuyEtib9JvNXI22glzlNvdY7WSbEsLVXNlakoNiuNtX3fHJ563leMLWmZPKW5F82JrGuFJD5rE6hdze7klXmQ00ExkXYjkc"
            token={handleToken}
            />
        </section>
                </div>
    )
);
}