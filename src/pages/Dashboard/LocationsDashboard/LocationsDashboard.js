import {
    List,
    Datagrid,
    TextField,
    EditButton,
    Edit,
    Create,
    SimpleForm,
    TextInput,
    SimpleFormIterator,
    ArrayInput,
    DateTimeInput,
    Labeled,
    WrapperField, useNotify
} from 'react-admin';

import {validatePrice, validateRequired} from '../validateInputs';
import {dateToTimestamp, myIdColumn} from "../dashboardHelpers";


const myRowStyled = (record) => {
    return {
        backgroundColor: record.confirmedBookings.length > 0 && '#efe'
    }
}

export const LocationsDashboard = props => {
    return (
        <List>
            <Datagrid
                sx={myIdColumn}
                rowClick="edit"
                rowStyle={myRowStyled}>
                <TextField source="id"/>
                <TextField source="title" label='City'/>
                <TextField source="name" label='Name'/>
                <TextField source="price" label='Price'/>
                <TextField source="capacity" label="Capacity"/>
                <TextField source="confirmedBookings.length" label="Confirmed bookings"/>
                <EditButton/>
            </Datagrid>
        </List>
    );
}

export const LocationEdit = (props) => {
    // use of useRecordContext causes unexpected warnings
    // const responseProps = useRecordContext();
    const notify = useNotify();
    // console.log(responseProps.json);
    const onError = () => {
        notify(props.myresponse.json.message, {type: 'error'}); // default message is 'ra.notification.updated'
    };
    return (
        <Edit mutationOptions={{onError}} {...props}>
            <SimpleForm label="edit location">
                <TextInput disabled source="id"/>
                <TextInput source="title" label="City" validate={validateRequired}/>
                <TextInput source="name" multiline label="Name" validate={validateRequired}/>
                <TextInput source="price" label="Price" validate={validatePrice}/>
                <TextInput source="capacity" label="Capacity"/>
                <Labeled label="Images">
                    <WrapperField>
                        <ArrayInput source="images" label={false}>
                            <SimpleFormIterator disableReordering>
                                <TextInput/>
                            </SimpleFormIterator>
                        </ArrayInput>
                    </WrapperField>
                </Labeled>

                <Labeled label="Details">
                    <WrapperField>
                        <ArrayInput source="details" label={false}>
                            <SimpleFormIterator disableReordering>
                                <TextInput multiline source="title"/>
                                <TextInput multiline rows={2} source="description"/>
                                <TextInput multiline rows={2} source="icons"/>
                            </SimpleFormIterator>
                        </ArrayInput>
                    </WrapperField>
                </Labeled>
            </SimpleForm>
        </Edit>
    );
}

export const LocationCreate = props => {
    const notify = useNotify();
    const onError = () => {
        notify(props.myresponse.json.message, {type: 'error'}); // default message is 'ra.notification.updated'
    };

    return (
        <Create mutationOptions={{onError}} title="Create location" {...props}>
            <SimpleForm>
                <TextInput source="title" label="City" validate={validateRequired}/>
                <TextInput source="name" label="Name" validate={validateRequired}/>
                <TextInput source="price" label="Price" validate={validatePrice}/>
                <TextInput source="capacity" label="Capacity"/>
                <ArrayInput source="images" label="Images">
                    <SimpleFormIterator disableReordering>
                        <TextInput/>
                    </SimpleFormIterator>
                </ArrayInput>
                <ArrayInput source="details">
                    <SimpleFormIterator disableReordering>
                        <TextInput source="title"/>
                        <TextInput source="description"/>
                        <TextInput source="icons"/>
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Create>
    )
}