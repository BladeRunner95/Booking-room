import {
    List,
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

export const BookingsDashboard = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id"/>
            <TextField source="user" label="userId"/>
            <TextField source="startDate" label='start'/>
            <TextField source="finishDate" label='end'/>
            <TextField source="location" label="Location" aria-multiline={true}/>
            <TextField source="cost" label='Cost'/>
            <EditButton/>
        </Datagrid>
    </List>
);

export const BookingsEdit = (props) => {
    const notify = useNotify();
    const navigate = useNavigate();
    const onSuccess = () => {
        navigate(-1);
        notify(`Booking updated`, {type: 'success'}); // default message is 'ra.notification.updated'
    };
    return (
        <Edit mutationOptions={{onSuccess}} {...props}>
            <SimpleForm label="edit booking">
                <TextInput disabled source="id"/>
                <TextInput source="startDate" label="Start" validate={validatePrice}/>
                <TextInput source="finishDate" label="End" validate={validatePrice}/>
                <TextInput source="cost" label="Cost" validate={validatePrice}/>
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

    const onError = () => {
        console.log(props.myresponse);
        notify(`Missing required fields`, {type: 'error'}); // default message is 'ra.notification.updated'
    };

    if (loading) return <div>LOADING </div>;
    if (error) return <div>{error.toString()}</div>;
    if (!users) return null;

    return (
        <Create mutationOptions={{onError}} title="Create booking" {...props}>
            <SimpleForm>
                <TextInput source="startDate" label="Start" validate={validatePrice}/>
                <TextInput source="finishDate" label="End" validate={validatePrice}/>
                <TextInput source="location" label="Location" validate={validateRequired}/>
                <TextInput source="cost" label="Cost" />
                {selectUsers ? <SelectInput source="user"
                                            choices={selectUsers}
                                            optionValue="_id"
                                            optionText="username"
                    />
                    : <div>Loading users</div>}
            </SimpleForm>
        </Create>
    )
}