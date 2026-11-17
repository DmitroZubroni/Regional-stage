import Icon from "../component/Icon.jsx";
import { useContext } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { AtlantContext } from "../../core/context.jsx";

import Header from "../component/Header.jsx";
import Authorization from "../component/Authorization.jsx";
import Registration from "../component/user/Registration.jsx";
import SetPersonInfo from "../component/user/SetPersonInfo.jsx";
import SendPostal from "../component/user/postal/SendPostal.jsx";
import GetPostal from "../component/user/postal/GetPostal.jsx";
import SendTransfer from "../component/user/transfer/SendTransfer.jsx";
import GetTransfer from "../component/user/transfer/GetTransfer.jsx";
import { typograph } from "../../core/typograph";

const Users = () => {
    const { isAuthorized } = useContext(AtlantContext);

    return (
        <div>
            <Header />
            {!isAuthorized ?
                <main id="main-content" className="container">
                    <Authorization pageHeading />
                </main>
             :

                <main id="main-content" className="container">
                    <div className="d-flex align-items-center gap-2.5 mb-4">
                        <Icon kind="post" />
                        <h1 className="fs-4 fw-bold text-theme-main mb-0">
                            {typograph("Отправления клиента")}
                        </h1>
                    </div>
                    <Tabs className="mb-4">
                        <Tab eventKey="profile" title={typograph("Аккаунт")}>
                            <div className="pt-4 d-flex flex-column gap-3">
                                <Registration />
                                <SetPersonInfo />
                            </div>
                        </Tab>
                        <Tab eventKey="postals" title={typograph("Посылки")}>
                            <div className="pt-4 d-flex flex-column gap-3">
                                <SendPostal />
                                <GetPostal />
                            </div>
                        </Tab>
                        <Tab eventKey="transfers" title={typograph("Переводы")}>
                            <div className="pt-4 d-flex flex-column gap-3">
                                <SendTransfer />
                                <GetTransfer />
                            </div>
                        </Tab>
                    </Tabs>
                </main>

            }
        </div>
    );
};

export default Users;
