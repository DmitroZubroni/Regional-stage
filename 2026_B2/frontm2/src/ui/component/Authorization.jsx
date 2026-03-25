import {Button, Form, FormControl} from "react-bootstrap";
import {AtlantContext} from "../../core/context.jsx";
import {useContext, useState} from "react";

const Authorization = () => {
    const { login } = useContext(AtlantContext);

    const [form, setForm] = useState({
        url: "",
        sender: "",
        password: "",
        contractId: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        login(form);
        alert("вы авторизовались");
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormControl onChange={(e) => setForm({...form, url: e.target.value})} />
            <FormControl onChange={(e) => setForm({...form, sender: e.target.value})} />
            <FormControl onChange={(e) => setForm({...form, password: e.target.value})} />
            <FormControl onChange={(e) => setForm({...form, contractId: e.target.value})} />

            <Button type="submit">Войти</Button>
        </Form>
    );
}

export default Authorization;