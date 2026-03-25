import {useContext, useState} from "react";
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {AtlantContext} from "../../../../core/context.jsx";

const AddTransitPoint = () => {

    const { post} = useContext(AtlantContext);

    const [trackNumber, setTrackNumber] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        await post([
            {"key": "action", "type": "string", "value": "addTransitPoint"},
            {"key": "trackNumber","type": "string", "value": trackNumber},
        ]);
    };
    return (
        <Form className="container" onSubmit={handleSubmit}>

            <h2> записать данные об отправлении </h2>

            <FormGroup>

                <FormLabel column={1}> укажите трек номер отправления </FormLabel>
                <FormControl type="text" placeholder="RR2509202025347901346783" onChange={(e) => setTrackNumber(e.target.value)} />
            </FormGroup>


            <Button variant="primary" type="submit" className="container">записать</Button>
        </Form>
    )
}
export default AddTransitPoint;