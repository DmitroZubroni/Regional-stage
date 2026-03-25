import {createBrowserRouter} from "react-router-dom";
import Person from "../ui/pages/Person.jsx";
import Execute   from "../ui/pages/Execute.jsx";
import Function from "../ui/pages/Functions.jsx";
import Proposal from "../ui/pages/Proposal.jsx";

const routes = [
    {
        path: "/",
        element: <Person />,
    },
    {
        path: "/execute",
        element: <Execute />,
    },
    {
        path: "/proposal",
        element: <Proposal />,
    },
    {
        path: "/func",
        element: <Function />,
    }
]

const routing = createBrowserRouter(routes)

export default routing