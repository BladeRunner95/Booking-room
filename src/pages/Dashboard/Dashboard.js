import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {Admin, Resource, ListGuesser, EditGuesser} from "react-admin";
import jsonServerProvider from 'ra-data-json-server';
import {UsersDashboard, UsersEdit, UserCreate} from "./UsersDashboard/UsersDashboard";
import {LocationCreate, LocationEdit, LocationsDashboard} from "./LocationsDashboard/LocationsDashboard";


// const httpClient = (url, options= {}) => {
//     if (!options.headers) {
//         options.headers = new Headers({ Accept: 'application/json' });
//     }
//     options.headers.set('X-Custom-Header', 'foobar');
//     return fetchUtils.fetchJson(url, options);
// }

const dataProvider = jsonServerProvider('http://localhost:5000/api');

export const Dashboard = () => {

    const [boardOpen, setBoardOpen] = useState(false);

    useEffect(() => {

    }, []);

    const handleOpened = () => {
        setBoardOpen(prevState => !prevState);
    };

    return (
        <>
            <Admin basename="/dashboard" dataProvider={dataProvider}>
                <Resource name="posts" list={LocationsDashboard} edit={LocationEdit} create={LocationCreate}/>
                <Resource name="auth/users" options={{ label: 'Users' }} list={UsersDashboard} edit={UsersEdit} create={UserCreate}/>
                {/*<Resource name="users" list={ListGuesser}/>*/}
            </Admin>
        </>
    )
}