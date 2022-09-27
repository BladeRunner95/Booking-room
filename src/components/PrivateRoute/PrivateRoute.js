import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const useAuth = () => {
    const user = Cookies.get('access_token');
    return user;
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