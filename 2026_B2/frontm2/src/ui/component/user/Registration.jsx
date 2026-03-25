import {useContext, useState} from "react";
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {AtlantContext} from "../../../core/context.jsx";

const Registration = () => {
    const { post } = useContext(AtlantContext);

    const [name, setName] = useState('');
    const [homeAddress, setHomeAddress] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        await post([
            { key: "action", type: "string", value: "registration" },
            { key: "name", type: "string", value: name },
            { key: "homeAddress", type: "string", value: homeAddress },
        ]);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormControl onChange={(e) => setName(e.target.value)} />
            <FormControl onChange={(e) => setHomeAddress(e.target.value)} />

            <Button type="submit">Зарегистрироваться</Button>
        </Form>
    );
};
export default Registration;