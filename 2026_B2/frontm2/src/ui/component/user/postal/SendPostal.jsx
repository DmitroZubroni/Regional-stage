import {useContext, useState} from "react";
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {AtlantContext} from "../../../../core/context.jsx";

const SendPostal = () => {

    const {post} = useContext(AtlantContext);

    const [recipient, setRecipient] = useState("");
    const [postalType, setPostalType] = useState("");
    const [postalClass, setPostalClass] = useState("");
    const [weight, setWeight] = useState("");
    const [importantValue, setimportantValue] = useState("");
    const [addressTo, setAddressTo] = useState("");
    const [addressFrom, setAddressFrom] = useState("");

        const handleSubmit = async (e) => {
            e.preventDefault();

            await post([
                {"key": "action", "type": "string", "value": "sendPostal"},
                {"key": "recipient","type": "string","value": recipient},
                {"key": "postalType","type": "string","value": postalType},
                {"key": "postalClass","type": "integer","value": postalClass},
                {"key": "weight","type": "string","integer": weight},
                {"key": "importantValue","type": "integer","value": importantValue},
                {"key": "addressTo","type": "string","value": addressTo},
                {"key": "addressFrom","type": "string","value": addressFrom},
            ]);
        };

    return (
        <Form onSubmit={handleSubmit} className="container2">

            <h2> отправить посылку</h2>

            <FormGroup>

                <FormLabel column={1}>адрес получателя </FormLabel>
                <FormControl type="text" placeholder="3Nu65wwizkHH6E8KcNQyckFsfnUvyFb1qvm" onChange={(e) => setRecipient(e.target.value)} />
            </FormGroup>

            <FormGroup>

                <FormLabel column={1}> тип посылки </FormLabel>
                <FormControl type="text" placeholder="письмо бандероль посылка" onChange={(e) => setPostalType(e.target.value)} />
            </FormGroup>

            <FormGroup>

                <FormLabel column={1}> класс отправления </FormLabel>
                <FormControl type="text" placeholder="1/2/3" onChange={(e) => setPostalClass(e.target.value)} />
            </FormGroup>

            <FormGroup>

                <FormLabel column={1}>вес </FormLabel>
                <FormControl type="number" placeholder="в кг не больше 10" max={11} onChange={(e) => setWeight(e.target.value)} />
            </FormGroup>

            <FormGroup>

                <FormLabel column={1}> обЪявленная стоимость </FormLabel>
                <FormControl type="text" placeholder="число для посчёта финальной цены" onChange={(e) => setimportantValue(e.target.value)} />
            </FormGroup>

            <FormGroup>

                <FormLabel column={1}> адрес назначения </FormLabel>
                <FormControl type="text" placeholder="ксипт" onChange={(e) => setAddressTo(e.target.value)} />
            </FormGroup>

            <FormGroup>

                <FormLabel column={1}> адрес отправления</FormLabel>
                <FormControl type="text" placeholder="бивола 17" onChange={(e) => setAddressFrom(e.target.value)} />
            </FormGroup>


            <Button variant="primary" type="submit" className="container">отправить </Button>
        </Form>
    )
}
export default SendPostal;