import { Button, Table, Card } from "react-bootstrap";
import Header from "../component/Header.jsx";
import { AtlantContext } from "../../core/context.jsx";
import {useContext, useEffect, useState} from "react";

const UserInfo = () => {
    const { contractId, sender } = useContext(AtlantContext);
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            fetch(`http://localhost:6882/contracts/${contractId}`)
                .then(res => res.json())
                .then(setData)
        })()
    }, [contractId, sender])

    const sections = {
        USER_MAPPING: "Профиль",
        POSTAL_MAPPING: "Посылки пользователя",
        TRANSFER_MAPPING: "Переводы пользователя",
        TRANSIT_MAPPING: "Транзиты пользователя"
    };

    return (
        <div>
            <Header />

            <div className="container">
                <h2>Личный кабинет</h2>

                {Object.entries(sections).map(([prefix, title]) => (
                    <Card key={prefix}>
                        <Card.Header>{title}</Card.Header>
                        <Table>
                            <tbody>
                            {data
                                .filter(i => i.key.includes(prefix) && i.value.includes(sender))
                                .map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <pre>{JSON.stringify(JSON.parse(item.value), null, 2).replace(/[{}"]/g, "")}</pre>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card>
                ))}
            </div>

        </div>
    );
};

export default UserInfo;