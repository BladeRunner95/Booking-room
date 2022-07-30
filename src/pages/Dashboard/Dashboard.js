import {Admin, Resource, fetchUtils } from "react-admin";
import jsonServerProvider from 'ra-data-json-server';
import {UsersDashboard, UsersEdit, UserCreate} from "./UsersDashboard/UsersDashboard";
import {LocationCreate, LocationEdit, LocationsDashboard} from "./LocationsDashboard/LocationsDashboard";
import Cookies from "js-cookie";
import {fetchJson} from "./httpError";


const httpClient = async (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const loggedIn = Cookies.get('access_token');
    options.headers.set('Authorization', `Bearer ${loggedIn}`);
    options.credentials = 'include';
    let pipi = await fetchJson(url, options);
    return pipi;
};

const dataProvider = jsonServerProvider('http://localhost:5000/api', httpClient);


export const Dashboard = () => {
    return (
        <>
            <Admin basename="/dashboard" dataProvider={dataProvider}>
                <Resource name="locations" list={LocationsDashboard} edit={LocationEdit} create={LocationCreate}/>
                <Resource name="auth/users" options={{ label: 'Users' }} list={UsersDashboard} edit={UsersEdit} create={UserCreate}/>
            </Admin>
        </>
    )
}