import {
    List,
    Datagrid,
    TextField,
    EmailField,
    BooleanField,
    SimpleForm,
    TextInput,
    Edit,
    Create,
    EditButton,
    SimpleFormIterator,
    ArrayInput,
    PasswordInput,
    BooleanInput,
    WrapperField, Labeled
} from 'react-admin';
import {validateEmail, validatePassword, validateRequired} from '../validateInputs';
import {myIdColumn} from "../dashboardHelpers";

export const UsersDashboard = (props) => (
    <List {...props}>
        <Datagrid
            sx={myIdColumn}
            rowClick="edit">
            <TextField source="id" sortBy="id"/>
            <TextField label="Username" source="username" sortByOrder="DESC"/>
            <EmailField label="Email" source="email" />
            <BooleanField label="Admin" source="isAdmin" />
            <EditButton basepath='/users' />
        </Datagrid>
    </List>
);

export const UsersEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id"/>
            <TextInput source="username" validate={validateRequired}/>
            <TextInput source="email" validate={validateEmail}/>
            <BooleanInput source="isAdmin"/>
            <Labeled label="confirmedBookings">
                <WrapperField>
                    <ArrayInput source="bookings" label={false}>
                        <SimpleFormIterator disableReordering>
                            <TextInput multiline/>
                        </SimpleFormIterator>
                    </ArrayInput>
                </WrapperField>
            </Labeled>
        </SimpleForm>
    </Edit>
)

export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="username" validate={validateRequired}/>
            <TextInput source="email" validate={validateEmail}/>
            <PasswordInput source="password" validate={validatePassword}/>
        </SimpleForm>
    </Create>
);