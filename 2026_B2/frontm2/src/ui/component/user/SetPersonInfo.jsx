import {useContext, useState} from "react";
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {AtlantContext} from "../../../core/context.jsx";

const SetPersonInfo = () => {

    const {post} = useContext(AtlantContext);

    const [name, setName] = useState('');
    const [homeAddress, setHomeAddress] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();

        await post([
            {"key": "action", "type": "string", "value": "setPersonInfo"},
            {"key": "name","type": "string","value": name},
            {"key": "homeAddress","type": "string", "value": homeAddress},
        ]);
    };
    return (
        <Form onSubmit={handleSubmit} className="container2">

            <h2>изменить данные о себе</h2>

            <FormGroup>

                <FormLabel column={1}> укажите имя </FormLabel>
                <FormControl type="text" placeholder="тайрон бейби" onChange={(e) => setName(e.target.value)} />
            </FormGroup>

            <FormGroup>

                <FormLabel column={1}> </FormLabel>
                <FormControl type="text" placeholder="ртк 1.11" onChange={(e) => setHomeAddress(e.target.value)} />
            </FormGroup>

            <Button variant="primary" type="submit" className="container"> изменить </Button>
        </Form>
    )
}
export default SetPersonInfo;