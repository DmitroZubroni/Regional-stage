import Header from "../component/Header.jsx";
import SetEmployee from "../component/admin/SetEmployee.jsx";
import SetPostId from "../component/admin/SetPostId.jsx";
import {useContext} from "react";
import {AtlantContext} from "../../core/context.jsx";
import Authorization from "../component/Authorization.jsx";

const Admin = () => {

    const {isAuthorized} = useContext(AtlantContext)

    return (
        <div>
            <Header />
            {
                isAuthorized === true ?
                    <>
                        <SetEmployee/>
                        <SetPostId/>
                    </> :
                    <Authorization/>
            }

        </div>
    )
}
export default Admin;