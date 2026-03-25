import {useContext, useState} from "react";
import {Button, Form, FormCheck, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {AtlantContext} from "../../../../core/context.jsx";

const GetTransfer = () => {

    const {post} = useContext(AtlantContext);

    const [transferId, setTransferId] = useState('');
    const [accepted, setAccepted] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await post([
            {"key": "action", "type": "string", "value": "getTransfer"},
            {"key": "transferId","type": "string","value": transferId},
            {"key": "accept","type": "boolean","value": accepted},
        ]);
    };
    return (
        <Form onSubmit={handleSubmit} className="container2">

            <h2> принять денежный перевод </h2>

            <FormGroup>

                <FormLabel column={1}> укажите айди денежного перевода </FormLabel>
                <FormControl type="text" placeholder="4132321" onChange={(e) => setTransferId(e.target.value)} />
            </FormGroup>
            <FormGroup>

                <FormLabel column={1}> вы принимаете перевод? </FormLabel>
                <FormCheck onChange={(e) => setAccepted(e.target.value)}/>
            </FormGroup>


            <Button variant="primary" type="submit" className="container"> принять </Button>
        </Form>
    )
}
export default GetTransfer;