import {
    List,
    DateTimeInput,
    DateField,
    Datagrid,
    TextField,
    EditButton,
    Edit,
    Create,
    SimpleForm,
    TextInput, useNotify, SelectInput, useDataProvider
} from 'react-admin';

import {validatePrice, validateRequired} from '../validateInputs';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import moment from "moment";
import {startDateToTimestamp, finishDateToTimestamp, myIdColumn, finishTimeDisplay} from "../dashboardHelpers";

export const BookingsDashboard = () => {

    return (
    <List>
        <Datagrid
            sx={myIdColumn}
            rowClick="edit">
            <TextField source="id"/>
            <TextField source="username" label="userId"/>
            <DateField  source="startDate" label='start'/>
            <DateField source="finishDate" label='end'/>
            <TextField source="locationName" label="Location" aria-multiline={true}/>
            <TextField source="cost" label='Cost'/>
            <EditButton/>
        </Datagrid>
    </List>
);
}

export const BookingsEdit = (props) => {
    const notify = useNotify();
    // const navigate = useNavigate();
    // const onSuccess = () => {
    //     // navigate(-1);
    //     notify(`Booking updated`, {type: 'success'}); // default message is 'ra.notification.updated'
    // };
    const dataProvider = useDataProvider();
    const [users, setUser] = useState(null);
    const [selectUsers, setSelectUsers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [locations, setLocations] = useState(null);

    useEffect(() => {
        dataProvider.getList('auth/users', {
            pagination: {page: 1, perPage:10 },
            sort: { order: 'DESC' }
        })
            .then(({ data }) => {
                setUser(data);
                setLoading(false);
                setSelectUsers(data);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            })
    }, []);


    useEffect(() => {
        dataProvider.getList('locations', {
            pagination: {page: 1, perPage:10 },
            sort: { order: 'DESC' }
        })
            .then(({ data }) => {
                setLocations(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            })
    }, []);

    if (loading) return <div>LOADING </div>;
    if (error) return <div>{error.toString()}</div>;
    if (!users) return null;

    return (
        <Edit {...props}>
            <SimpleForm label="edit booking">
                <TextInput disabled source="id"/>
                <DateTimeInput source="startDate" label="Start" parse={startDateToTimestamp} validate={validateRequired}/>
                <DateTimeInput source="finishDate" label="End" format={(v)=> finishTimeDisplay(v)} parse={finishDateToTimestamp} validate={validateRequired}/>
                <TextInput source="cost" label="Cost" validate={validatePrice}/>
                {locations ? <SelectInput source="location"
                                          choices={locations}
                                          optionValue="_id"
                                          optionText="title"
                                          validate={validateRequired}
                    /> :
                    <div>Loading locations</div>
                }
                {users ? <SelectInput source="user"
                                      choices={selectUsers}
                                      optionValue="_id"
                                      optionText="username"
                                      validate={validateRequired}
                    />
                    : <div>Loading users</div>}
            </SimpleForm>
        </Edit>
    );
}

export const BookingCreate = props => {
    const dataProvider = useDataProvider();
    const [users, setUser] = useState(null);
    const [selectUsers, setSelectUsers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [locations, setLocations] = useState(null);
    const notify = useNotify();

    useEffect(() => {
        dataProvider.getList('auth/users', {
            pagination: {page: 1, perPage:10 },
            sort: { order: 'DESC' }
        })
            .then(({ data }) => {
                setUser(data);
                setLoading(false);
                setSelectUsers(data);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            })
    }, []);


    useEffect(() => {
        dataProvider.getList('locations', {
            pagination: {page: 1, perPage:10 },
            sort: { order: 'DESC' }
        })
            .then(({ data }) => {
                setLocations(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            })
    }, []);

    const onError = () => {
        notify(`Missing required fields`, {type: 'error'}); // default message is 'ra.notification.updated'
    };

    if (loading) return <div>LOADING </div>;
    if (error) return <div>{error.toString()}</div>;
    if (!users) return null;

    return (
        <Create mutationOptions={{onError}} title="Create booking" {...props}>
            <SimpleForm>
                <DateTimeInput source="startDate" label="Start" parse={startDateToTimestamp} validate={validateRequired}/>
                <DateTimeInput  source="finishDate" label="End" format={(v)=> finishTimeDisplay(v)} parse={finishDateToTimestamp} validate={validateRequired} />
                {locations ? <SelectInput source="location"
                                          choices={locations}
                                          optionValue="_id"
                                          optionText="title"
                                          validate={validateRequired}
                /> :
                    <div>Loading locations</div>
                }
                <TextInput source="cost" label="Cost" validate={validatePrice}/>
                {users ? <SelectInput source="user"
                                            choices={selectUsers}
                                            optionValue="_id"
                                            optionText="username"
                                      validate={validateRequired}
                    />
                    : <div>Loading users</div>}
            </SimpleForm>
        </Create>
    )
}