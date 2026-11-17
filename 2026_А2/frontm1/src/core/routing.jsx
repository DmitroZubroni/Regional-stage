import { createBrowserRouter } from "react-router-dom";
import ArenaHome from "../ui/pages/ArenaHome.jsx";
import Person from "../ui/pages/Person.jsx";
import Execute from "../ui/pages/Execute.jsx";
import FunctionPage from "../ui/pages/Functions.jsx";
import Proposal from "../ui/pages/Proposal.jsx";
import LogisticsPage from "../ui/pages/LogisticsPage.jsx";
import StatesDemoPage from "../ui/pages/StatesDemoPage.jsx";

const routes = [
  {
    path: "/",
    element: <ArenaHome />,
  },
  {
    path: "/cabinet",
    element: <Person />,
  },
  {
    path: "/person",
    element: <Person />,
  },
  {
    path: "/proposal",
    element: <Proposal />,
  },
  {
    path: "/proposals",
    element: <Proposal />,
  },
  {
    path: "/execute",
    element: <Execute />,
  },
  {
    path: "/func",
    element: <FunctionPage />,
  },
  {
    path: "/logistics",
    element: <LogisticsPage />,
  },
  {
    path: "/states-demo",
    element: ["review", "dev"].some(key => new URLSearchParams(window.location.search).has(key)) ? <StatesDemoPage /> : <ArenaHome />,
  },
];

const routing = createBrowserRouter(routes);

export default routing;
