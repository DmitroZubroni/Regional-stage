import { useContext } from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import { AtlantContext } from "../../core/context.jsx";

import Header from "../component/Header.jsx";
import Authorization from "../component/Authorization.jsx";
import Registration from "../component/user/Registration.jsx";
import SetPersonInfo from "../component/user/SetPersonInfo.jsx";
import SendPostal from "../component/user/postal/SendPostal.jsx";
import GetPostal from "../component/user/postal/GetPostal.jsx";
import SendTransfer from "../component/user/transfer/SendTransfer.jsx";
import GetTransfer from "../component/user/transfer/GetTransfer.jsx";

const Users = () => {
    const { isAuthorized } = useContext(AtlantContext);

    return (
        <div>
            <Header />
            {!isAuthorized ?
                <Authorization />
             :

                <div className="container">
                    <Tabs>
                        <Tab eventKey="profile" title="Аккаунт">
                            <Registration />
                            <hr/>
                            <SetPersonInfo />
                        </Tab>
                        <Tab eventKey="postals" title="Посылки">
                            <SendPostal />
                            <hr/>
                            <GetPostal />
                        </Tab>
                        <Tab eventKey="transfers" title="Переводы">
                            <SendTransfer />
                            <hr/>
                            <GetTransfer />
                        </Tab>
                    </Tabs>
                </div>

            }
        </div>
    );
};

export default Users;