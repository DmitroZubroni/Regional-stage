import {createBrowserRouter} from "react-router-dom";
import Admin from "../ui/pages/Admin.jsx";
import User from "../ui/pages/User.jsx";
import BlockchainState from "../ui/pages/BlockchainState.jsx";
import Employee from "../ui/pages/Employee.jsx";
import UserInfo from "../ui/pages/UserInfo.jsx";

const routes = [
    {
        path: "/",
        element: <User />,
    },
    {
        path: "/admin",
        element: <Admin />,
    },
    {
        path: "/state",
        element: <BlockchainState />,
    },
    {
        path: "/employee",
        element: <Employee />,
    },
    {
        path: "/userInfo",
        element: <UserInfo />,
    }
]
const routing = createBrowserRouter(routes);
export { routing };