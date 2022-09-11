import {Admin, Resource, fetchUtils, useDataProvider, RecordContextProvider } from "react-admin";
import jsonServerProvider from 'ra-data-json-server';
import {UsersDashboard, UsersEdit, UserCreate} from "./UsersDashboard/UsersDashboard";
import {LocationCreate, LocationEdit, LocationsDashboard} from "./LocationsDashboard/LocationsDashboard";
import Cookies from "js-cookie";
import {fetchJson} from "./httpMyResponse";
import {BookingCreate, BookingsDashboard, BookingsEdit} from "./BookingsDashboard/BookingsDashboard";
import {useEffect, useState} from "react";
import MyLayout from "./CustomLayout/MyLayout";



export const Dashboard = (props) => {
    let [myProvider, setMyProvider] = useState(null);
    let [myResponse, setMyResponse] = useState(null);

    useEffect(()=> {
        const httpClient = async (url, options = {}) => {
            try {
                if (!options.headers) {
                    options.headers = new Headers({Accept: 'application/json'});
                }
                const loggedIn = Cookies.get('access_token');
                options.headers.set('Authorization', `Bearer ${loggedIn}`);
                options.credentials = 'include';
                let fetchedRes = await fetchJson(url, options);
                setMyResponse(fetchedRes);
                return fetchedRes;
            }
            catch (e) {
                setMyResponse(e);
            }
        };
        const dataProvider = async()=> {
            const fetched = await jsonServerProvider('http://localhost:5000/api', httpClient);
            setMyProvider(fetched)
        }
        dataProvider();
    }, [myResponse])

    return (
        <>
            {myProvider?
                // <RecordContextProvider value={myResponse}>
            <Admin layout={MyLayout} basename="/dashboard" dataProvider={myProvider}>
                <Resource name="locations" list={<LocationsDashboard myResponse={myResponse}/>} edit={<LocationEdit myresponse={myResponse}/>} create={<LocationCreate myresponse={myResponse}/>} />
                <Resource name="auth/users" options={{ label: 'Users' }} list={UsersDashboard} edit={UsersEdit} create={UserCreate}/>
                <Resource name="bookings" options={{ label: 'Bookings' }} list={BookingsDashboard} edit={BookingsEdit} create={<BookingCreate myresponse={myResponse}/>}/>
            </Admin>
                // </RecordContextProvider>
                :
                <div>Loading</div>}
        </>
    )
}