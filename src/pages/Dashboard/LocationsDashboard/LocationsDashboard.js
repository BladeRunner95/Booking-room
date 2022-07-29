import {
    List,
    Datagrid,
    TextField,
    ReferenceField,
    EditButton,
    Edit,
    Create,
    SimpleForm,
    ReferenceInput,
    SelectInput,
    TextInput, ArrayField, UrlField, ChipField, SingleFieldList, SimpleFormIterator, ArrayInputContext, ArrayInput, Labeled, DateField, DateInput, WrapperField
} from 'react-admin';


const myRowStyled = (record, index) => {
    // console.log(record);
    return { backgroundColor: record._doc.title === "Holon" ? '#efe' : null}}

const formStyled = (record) => {
    return {
        alignItems: 'stretch'
    }
}

export const LocationsDashboard = props => (
    <List>
        <Datagrid rowClick="edit" rowStyle={myRowStyled}>
            <TextField source="id"/>
            <TextField source="_doc.title" label='City'/>
            <TextField source="_doc.name" label='Name'/>
            <TextField source="_doc.price" label='Price'/>
            <TextField source="_doc.capacity" label="Capacity"/>
            <DateField source="_doc.confirmedBookings" label="Bookings"/>
            <EditButton/>
        </Datagrid>
    </List>
);

export const LocationEdit = () => (
    <Edit>
        <SimpleForm sx={formStyled} label="shavbl">
            <TextInput sx={formStyled} disabled source="id"/>
            {/*<ReferenceInput source="userId" reference="users">*/}
            {/*    <SelectInput optionText="name"/>*/}
            {/*</ReferenceInput>*/}
            <TextInput source="title" label="City"/>
            <TextInput source="name" multiline label="Name"/>
            <TextInput source="price" label="Price"/>
            <TextInput source="capacity" label="Capacity"/>
            {/*<tr/>*/}
            <Labeled label="Images">
                <WrapperField>
            <ArrayInput source="images" label={false}>
                <SimpleFormIterator disableReordering>
                    <TextInput />
                </SimpleFormIterator>
            </ArrayInput>
                </WrapperField>
            </Labeled>

            <Labeled label="Details">
                <WrapperField>
            <ArrayInput source="details" label={false}>
                <SimpleFormIterator disableReordering>
                    <TextInput multiline source="title" />
                    <TextInput multiline rows={2} source="description" />
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

export const LocationCreate = props => (
    <Create title="Create location" {...props}>
        <SimpleForm>
            <TextInput source="title" label="City"/>
            <TextInput source="name" label="Name"/>
            <TextInput source="price" label="Price"/>
            <TextInput source="capacity" label="Capacity"/>
            <ArrayInput source="images" label="Images">
                <SimpleFormIterator disableReordering>
                    <TextInput />
                </SimpleFormIterator>
            </ArrayInput>
            <ArrayInput source="details">
                <SimpleFormIterator disableReordering>
                    <TextInput source="title" />
                    <TextInput source="description" />
                </SimpleFormIterator>
            </ArrayInput>
            {/*<DateInput label="published" source="publishedAt"/>*/}
        </SimpleForm>
    </Create>
);