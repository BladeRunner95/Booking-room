import { Navigate, Outlet, useLocation } from "react-router-dom";
import {useSelector} from "react-redux";

const useAuth = () => {
    const user = useSelector(state=> state.userReducer)
    return user && user.loggedIn;
};

const ProtectedRoutes = () => {
    const location = useLocation();
    const isAuth = useAuth();
    return isAuth ? (
        <Outlet />
    ) : (
        <Navigate to="/signin" replace state={{ from: location }} />
    );
};

export default ProtectedRoutes;