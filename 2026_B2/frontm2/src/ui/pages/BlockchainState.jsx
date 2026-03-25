import { Button, Table, Card } from "react-bootstrap";
import Header from "../component/Header.jsx";
import { AtlantContext } from "../../core/context.jsx";
import {useContext, useEffect, useState} from "react";

const BlockchainState = () => {
    const { contractId } = useContext(AtlantContext);
    const [data, setData] = useState([]);



    useEffect(() => {
        (async () => {
            fetch(`http://localhost:6882/contracts/${contractId}`)
                .then(res => res.json())
                .then(setData);
        })()
    },[contractId])

    const sections = {
        USER_MAPPING: "Профили",
        POSTAL_MAPPING: "Посылки",
        TRANSFER_MAPPING: "Переводы",
        TRANSIT_MAPPING: "Транзиты"
    };

    return (
        <div>
            <Header />
            <div className="container">
                <h2>вся информация из блокчейна</h2>
                {Object.entries(sections).map(([prefix, title]) => (
                    <Card key={prefix}>
                        <Card.Header>{title}</Card.Header>
                        <Table>
                            <tbody>
                            {data
                                .filter(i => i.key.includes(prefix) )
                                .map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <pre>{JSON.stringify(JSON.parse(item.value), null, 2).replace(/[{}"]/g, "")}

                                            </pre>
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

export default BlockchainState;