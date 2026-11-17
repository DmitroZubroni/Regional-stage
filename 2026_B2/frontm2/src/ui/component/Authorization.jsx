import Icon from "./Icon.jsx";
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {AtlantContext} from "../../core/context.jsx";
import {useContext, useState} from "react";
import {typograph} from "../../core/typograph";

const Authorization = ({ pageHeading = false }) => {
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

    const Heading = pageHeading ? "h1" : "h2";
    return (
        <div className="auth-workspace"><section className="postal-intro"><div className="postal-envelope" aria-hidden="true"/><Heading>Почта в вашем<br/>рабочем пространстве</Heading><p>Оформляйте посылки и переводы, проверяйте данные клиента и маршрут отправления.</p></section><section className="champ-card p-4 p-md-5 mb-4">
            <div className="d-flex align-items-center gap-2.5 mb-2">
                <Icon kind="key" />
                <div>
                    <h2 className="fs-5 fw-bold text-theme-main mb-0">
                        {typograph("Войти в почтовый реестр")}
                    </h2>
                    <p className="text-theme-muted mb-0" style={{ fontSize: "0.82rem" }}>
                        {typograph("Укажите узел, адрес отправителя и пароль ключевой пары для подписи транзакций")}
                    </p>
                </div>
            </div>

            <Form onSubmit={handleSubmit} className="mt-4">
                <div className="row g-3">
                    <div className="col-md-6">
                        <FormGroup>
                            <FormLabel htmlFor="auth-url" className="text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
                                {typograph("Порт локального узла")}
                            </FormLabel>
                            <FormControl
                                id="auth-url"
                                type="text"
                                className="champ-input"
                                placeholder="6862"
                                autoComplete="off"
                                onChange={(e) => setForm({...form, url: e.target.value})}
                            />
                        </FormGroup>
                    </div>

                    <div className="col-md-6">
                        <FormGroup>
                            <FormLabel htmlFor="auth-sender" className="text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
                                {typograph("Адрес отправителя")}
                            </FormLabel>
                            <FormControl
                                id="auth-sender"
                                type="text"
                                className="champ-input mono-champ"
                                placeholder="3Nu65wwizkHH6E8KcNQyckFsfnUvyFb1qvm"
                                autoComplete="username"
                                onChange={(e) => setForm({...form, sender: e.target.value})}
                            />
                        </FormGroup>
                    </div>

                    <div className="col-md-6">
                        <FormGroup>
                            <FormLabel htmlFor="auth-password" className="text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
                                {typograph("Пароль ключевой пары")}
                            </FormLabel>
                            <FormControl
                                id="auth-password"
                                type="password"
                                className="champ-input"
                                autoComplete="current-password"
                                onChange={(e) => setForm({...form, password: e.target.value})}
                            />
                        </FormGroup>
                    </div>

                    <div className="col-md-6">
                        <FormGroup>
                            <FormLabel htmlFor="auth-contract" className="text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
                                {typograph("Идентификатор контракта")}
                            </FormLabel>
                            <FormControl
                                id="auth-contract"
                                type="text"
                                className="champ-input mono-champ"
                                autoComplete="off"
                                onChange={(e) => setForm({...form, contractId: e.target.value})}
                            />
                        </FormGroup>
                    </div>
                </div>

                <Button type="submit" className="champ-btn-primary mt-4" style={{ minHeight: 44 }}>
                    {typograph("Войти")}
                </Button>
            </Form>
        </section></div>
    );
}

export default Authorization;
