import Icon from "../component/Icon.jsx";
import Header from "../component/Header.jsx";
import SetEmployee from "../component/admin/SetEmployee.jsx";
import SetPostId from "../component/admin/SetPostId.jsx";
import {useContext} from "react";
import {AtlantContext} from "../../core/context.jsx";
import Authorization from "../component/Authorization.jsx";
import {typograph} from "../../core/typograph";

const Admin = () => {

    const {isAuthorized} = useContext(AtlantContext)

    return (
        <div>
            <Header />
            <main id="main-content" className="container">
                <div className="d-flex align-items-center gap-2.5 mb-4">
                    <Icon kind="settings" />
                    <h1 className="fs-4 fw-bold text-theme-main mb-0">
                        {typograph("Администрирование модуля B2")}
                    </h1>
                </div>
                {
                    isAuthorized === true ?
                        <>
                            <SetEmployee/>
                            <SetPostId/>
                        </> :
                        <Authorization/>
                }
            </main>
        </div>
    )
}
export default Admin;
