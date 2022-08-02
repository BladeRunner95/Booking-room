import {Admin, Resource, fetchUtils, useDataProvider } from "react-admin";
import jsonServerProvider from 'ra-data-json-server';
import {UsersDashboard, UsersEdit, UserCreate} from "./UsersDashboard/UsersDashboard";
import {LocationCreate, LocationEdit, LocationsDashboard} from "./LocationsDashboard/LocationsDashboard";
import Cookies from "js-cookie";
import {fetchJson} from "./httpError";
import {BookingCreate, BookingsDashboard, BookingsEdit} from "./BookingsDashboard/BookingsDashboard";
import {useEffect, useState} from "react";



export const Dashboard = (props) => {
    let [myProvider, setMyProvider] = useState(null);
    let [myResponse, setMyResponse] = useState(null)

    useEffect(()=> {
        const httpClient = async (url, options = {}) => {
            if (!options.headers) {
                options.headers = new Headers({ Accept: 'application/json' });
            }
            const loggedIn = Cookies.get('access_token');
            options.headers.set('Authorization', `Bearer ${loggedIn}`);
            options.credentials = 'include';
            let fetchedRes = await fetchJson(url, options);
            setMyResponse(fetchedRes);
            return fetchedRes;
        };
        const dataProvider = async()=> {
            const fetched = await jsonServerProvider('http://localhost:5000/api', httpClient);
            // console.log('new req res')
            setMyProvider(fetched)
        }
        dataProvider();
        // console.log(myResponse);
    }, [myResponse])

    return (
        <>
            {myProvider?
            <Admin basename="/dashboard" dataProvider={myProvider}>
                <Resource name="locations" list={<LocationsDashboard myResponse={myResponse}/>} edit={LocationEdit} create={<LocationCreate myresponse={myResponse}/>} />
                <Resource name="auth/users" options={{ label: 'Users' }} list={UsersDashboard} edit={UsersEdit} create={UserCreate}/>
                <Resource name="bookings" options={{ label: 'Bookings' }} list={BookingsDashboard} edit={BookingsEdit} create={<BookingCreate myresponse={myResponse}/>}/>
            </Admin> :
                <div>Loading</div>}
        </>
    )
}