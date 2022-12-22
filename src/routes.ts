import Login from "./Pages/Login"
import Profile from "./Pages/Profile"
import Register from "./Pages/Register"
import Home from "./Pages/Home";
import {HOME_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTER_ROUTE} from "./utils/variables"






export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        element: Login
    },
    {
        path: REGISTER_ROUTE,
        element: Register
    }
]

export const privateRoutes = [
    {
        path: HOME_ROUTE,
        element: Home
    },
    {
        path: PROFILE_ROUTE,
        element: Profile
    }
]