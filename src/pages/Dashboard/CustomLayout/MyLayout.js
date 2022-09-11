import * as React from 'react';
import { forwardRef } from 'react';
import { AppBar, Layout, useLogout } from 'react-admin';
import {Button} from "react-bootstrap";


const MyLogoutButton = forwardRef((props, ref) => {
    const logout = useLogout();
    const handleClick = () => logout();
    return (
        <div
            onClick={handleClick}
            ref={ref}>
            <Button>Exit</Button>
        </div>
    );
});

const MyAppBar = () => (
    <AppBar userMenu={<MyLogoutButton />} />
);

const MyLayout = (props) => (
    <Layout {...props} appBar={MyAppBar} />
);

export default MyLayout;