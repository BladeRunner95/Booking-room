import {
    List,
    Datagrid,
    TextField,
    EmailField,
    BooleanField,
    ArrayField,
    ReferenceField,
    SimpleForm,
    TextInput, ReferenceInput, SelectInput, Edit, Create, EditButton, DeleteButton
} from 'react-admin';

export const UsersDashboard = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField label="Username" source="_doc.username" />
            <EmailField label="Email" source="_doc.email" />
            <BooleanField label="Admin" source="_doc.isAdmin" />
            <ArrayField label="Bookings" source="_doc.bookings">
                <ReferenceField label="User" source="user_id" reference="users">
                    <TextField source="name" />
                </ReferenceField>
            </ArrayField>
            <EditButton basepath='/users' />
            <DeleteButton basepath='/users' />
        </Datagrid>
    </List>
);

export const UsersEdit = props => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id"/>
            <ReferenceInput source="id" reference="users">
                <SelectInput optionText="name"/>
            </ReferenceInput>
            <TextInput source="title"/>
        </SimpleForm>
    </Edit>
)

export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title"/>
            <TextInput multiline source="body"/>
        </SimpleForm>
    </Create>
);