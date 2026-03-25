import {useContext, useState} from "react";
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {AtlantContext} from "../../../../core/context.jsx";

const SendTransfer = () => {

    const { post} = useContext(AtlantContext);
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");
    const [timeLive, setTimeLive] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();

        await post([
            {"key": "action", "type": "string", "value": "sendTransfer"},
            {"key": "recipient","type": "string","value": recipient},
            {"key": "amount","type": "float","value": amount},
            {"key": "timeLive","type": "string","value": timeLive},
        ]);
    };
    return (
        <Form onSubmit={handleSubmit} className="container2">

            <h2> отправить денежный перевод</h2>

            <FormGroup>

                <FormLabel column={1}> адрес получателя </FormLabel>
                <FormControl type="text" placeholder="3Nu65wwizkHH6E8KcNQyckFsfnUvyFb1qvm" onChange={(e) => setRecipient(e.target.value)} />
            </FormGroup>

            <FormGroup>

                <FormLabel column={1}> сумма </FormLabel>
                <FormControl type="text" placeholder="10" onChange={(e) => setAmount(e.target.value)} />
            </FormGroup>

            <FormGroup>

                <FormLabel column={1}> время жизни </FormLabel>
                <FormControl type="text" placeholder="укажите количество дней пока перевод будет активен" onChange={(e) => setTimeLive(e.target.value)} />
            </FormGroup>


            <Button variant="primary" type="submit" className="container"> отправить </Button>
        </Form>
    )
}
export default SendTransfer;