import Icon from "../Icon.jsx";
import {useContext, useState} from "react";
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {AtlantContext} from "../../../core/context.jsx";
import {typograph} from "../../../core/typograph";

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
        <div className="champ-card p-4 p-md-5 mb-4">
            <div className="d-flex align-items-center gap-2.5 mb-2">
                <Icon kind="document" />
                <h2 className="fs-5 fw-bold text-theme-main mb-0">
                    {typograph("Регистрация клиента почтового сервиса")}
                </h2>
            </div>

            <Form onSubmit={handleSubmit} className="mt-4">
                <div className="row g-3">
                    <div className="col-md-6">
                        <FormGroup>
                            <FormLabel htmlFor="reg-name" className="text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
                                {typograph("Имя и фамилия")}
                            </FormLabel>
                            <FormControl
                                id="reg-name"
                                type="text"
                                className="champ-input"
                                placeholder="Тайрон Бейби"
                                autoComplete="name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FormGroup>
                    </div>

                    <div className="col-md-6">
                        <FormGroup>
                            <FormLabel htmlFor="reg-address" className="text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
                                {typograph("Домашний адрес")}
                            </FormLabel>
                            <FormControl
                                id="reg-address"
                                type="text"
                                className="champ-input"
                                placeholder="РТК 1.11"
                                autoComplete="street-address"
                                onChange={(e) => setHomeAddress(e.target.value)}
                            />
                        </FormGroup>
                    </div>
                </div>

                <Button type="submit" className="champ-btn-primary mt-4" style={{ minHeight: 44 }}>
                    {typograph("Зарегистрироваться")}
                </Button>
            </Form>
        </div>
    );
};
export default Registration;
