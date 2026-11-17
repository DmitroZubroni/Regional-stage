import Icon from "../component/Icon.jsx";
import Header from "../component/Header.jsx";
import AddTransitPount from "../component/user/postal/AddTransitPount.jsx";
import {useContext} from "react";
import {AtlantContext} from "../../core/context.jsx";
import Authorization from "../component/Authorization.jsx";
import {typograph} from "../../core/typograph";

const Employee = () => {
    const {isAuthorized} = useContext(AtlantContext)

    return (
        <div>
            <Header />
            <main id="main-content" className="container">
                <div className="d-flex align-items-center gap-2.5 mb-4">
                    <Icon kind="user" />
                    <h1 className="fs-4 fw-bold text-theme-main mb-0">
                        {typograph("Рабочее место сотрудника")}
                    </h1>
                </div>
                {
                    isAuthorized ?
                        <AddTransitPount/> :
                        <Authorization/>
                    }
            </main>
        </div>
    )
}
export default Employee;
