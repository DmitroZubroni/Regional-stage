import {useContext, useState} from "react";
import {Button, Form, FormCheck, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {AtlantContext} from "../../../../core/context.jsx";

const GetPostal = () => {

    const {post} = useContext(AtlantContext);

    const [trackNumber, setTrackNumber] = useState('');
    const [accepted, setAccepted] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        await post([
            {"key": "action", "type": "string", "value": "getPostal"},
            {"key": "trackNumber","type": "string","value": trackNumber},
            {"key": "accept","type": "boolean","value": accepted},
        ]);
    };
    return (
        <Form onSubmit={handleSubmit} className="container2">

            <h2> принять посылку </h2>

            <FormGroup>

                <FormLabel column={1}>трек номенр посылки </FormLabel>
                <FormControl type="text" placeholder="RR2509202025347901346783" onChange={(e) => setTrackNumber(e.target.value)} />
            </FormGroup>

            <FormGroup>

                <FormLabel column={1}> вы принимаете отправление? </FormLabel>
                <FormCheck onChange={(e) => setAccepted(e.target.value)}/>
            </FormGroup>


            <Button variant="primary" type="submit" className="container"> принять</Button>
        </Form>
    )
}
export default GetPostal;