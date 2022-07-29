import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Admin, Resource, ListGuesser, EditGuesser, fetchUtils, CustomRoutes } from "react-admin";
import jsonServerProvider from 'ra-data-json-server';
import {UsersDashboard, UsersEdit, UserCreate} from "./UsersDashboard/UsersDashboard";
import {LocationCreate, LocationEdit, LocationsDashboard} from "./LocationsDashboard/LocationsDashboard";
import Cookies from "js-cookie";
import {HomePage} from "../Homepage/Homepage";
// import {fetchJson} from "./httpError";


const httpClient = async (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const loggedIn = Cookies.get('access_token');
    options.headers.set('Authorization', `Bearer ${loggedIn}`);
    options.credentials = 'include';
    let pipi = await fetchUtils.fetchJson(url, options);
    // console.log(pipi);
    // need to redirect if error
    // if (pipi.status === 200)
    return pipi;
};

const dataProvider = jsonServerProvider('http://localhost:5000/api', httpClient);


export const Dashboard = () => {
    const navigate = useNavigate();
    const [boardOpen, setBoardOpen] = useState(false);

    useEffect(() => {

    }, []);

    const handleOpened = () => {
        setBoardOpen(prevState => !prevState);
    };

    return (
        <>
            <Admin basename="/dashboard" dataProvider={dataProvider}>
                <Resource name="locations" list={LocationsDashboard} edit={LocationEdit} create={LocationCreate}/>
                <Resource name="auth/users" options={{ label: 'Users' }} list={UsersDashboard} edit={UsersEdit} create={UserCreate}/>
                {/*<CustomRoutes>*/}
                {/*    Route path="/" element={<HomePage />} />*/}
                {/*</CustomRoutes>*/}
                {/*<Resource name="users" list={ListGuesser}/>*/}
            </Admin>
        </>
    )
}