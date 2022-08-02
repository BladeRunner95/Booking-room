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
    Labeled,
    DateField,
    WrapperField, useNotify
} from 'react-admin';

import {validatePrice, validateRequired} from '../validateInputs';


const myRowStyled = (record) => {
    return {backgroundColor: record.confirmedBookings.length > 0 && '#efe'}
}

export const LocationsDashboard = props => {
    return (
    <List>
        <Datagrid rowClick="edit" rowStyle={myRowStyled}>
            <TextField source="id"/>
            <TextField source="title" label='City'/>
            <TextField source="name" label='Name'/>
            <TextField source="price" label='Price'/>
            <TextField source="capacity" label="Capacity"/>
            <DateField source="confirmedBookings" label="Bookings"/>
            <EditButton/>
        </Datagrid>
    </List>
);
}

export const LocationEdit = () => (
    <Edit>
        <SimpleForm label="edit location">
            <TextInput disabled source="id"/>
            <TextInput source="title" label="City" validate={validateRequired}/>
            <TextInput source="name" multiline label="Name" validate={validateRequired}/>
            <TextInput source="price" label="Price" validate={validatePrice}/>
            <TextInput source="capacity" label="Capacity" validate={validatePrice}/>
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
                        </SimpleFormIterator>
                    </ArrayInput>
                </WrapperField>
            </Labeled>

            <Labeled label="confirmedBookings">
                <WrapperField>
                    <ArrayInput source="confirmedBookings" label={false}>
                        <SimpleFormIterator disableReordering>
                            <TextInput multiline/>
                        </SimpleFormIterator>
                    </ArrayInput>
                </WrapperField>
            </Labeled>
        </SimpleForm>
    </Edit>
);

export const LocationCreate = props => {
    const notify = useNotify();

    const onError = () => {
        notify(`Missing required fields`, { type: 'error'}); // default message is 'ra.notification.updated'
    };

return (
    <Create mutationOptions={{ onError }} title="Create location" {...props}>
        <SimpleForm>
            <TextInput source="title" label="City" validate={validateRequired}/>
            <TextInput source="name" label="Name" validate={validateRequired}/>
            <TextInput source="price" label="Price" validate={validatePrice}/>
            <TextInput source="capacity" label="Capacity" validate={validatePrice}/>
            <ArrayInput source="images" label="Images">
                <SimpleFormIterator disableReordering>
                    <TextInput/>
                </SimpleFormIterator>
            </ArrayInput>
            <ArrayInput source="details">
                <SimpleFormIterator disableReordering>
                    <TextInput source="title"/>
                    <TextInput source="description"/>
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
)
}