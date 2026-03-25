import Header from "../component/Header.jsx";
import AddTransitPount from "../component/user/postal/AddTransitPount.jsx";
import {useContext} from "react";
import {AtlantContext} from "../../core/context.jsx";
import {Link} from "react-router-dom";
import Authorization from "../component/Authorization.jsx";

const Employee = () => {
    const {isAuthorized} = useContext(AtlantContext)

    return (
        <div>
        <Header />
            {
                isAuthorized ?
                    <AddTransitPount/> :
                    <Authorization/>
                }

        </div>
    )
}
export default Employee;