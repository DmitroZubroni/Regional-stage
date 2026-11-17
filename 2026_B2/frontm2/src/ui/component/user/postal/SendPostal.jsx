import Icon from "../../Icon.jsx";
import {useContext, useState} from "react";
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {AtlantContext} from "../../../../core/context.jsx";
import {typograph} from "../../../../core/typograph";

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
        <div className="champ-card p-4 p-md-5 mb-4">
            <div className="d-flex align-items-center gap-2.5 mb-2">
                <Icon kind="post" />
                <h2 className="fs-5 fw-bold text-theme-main mb-0">
                    {typograph("Отправить посылку")}
                </h2>
            </div>

            <Form onSubmit={handleSubmit} className="mt-4">
                <div className="row g-3">
                    <div className="col-md-6">
                        <FormGroup>
                            <FormLabel htmlFor="postal-recipient" className="text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
                                {typograph("Адрес получателя")}
                            </FormLabel>
                            <FormControl
                                id="postal-recipient"
                                type="text"
                                className="champ-input mono-champ"
                                placeholder="3Nu65wwizkHH6E8KcNQyckFsfnUvyFb1qvm"
                                autoComplete="off"
                                onChange={(e) => setRecipient(e.target.value)}
                            />
                        </FormGroup>
                    </div>

                    <div className="col-md-6">
                        <FormGroup>
                            <FormLabel htmlFor="postal-type" className="text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
                                {typograph("Тип посылки")}
                            </FormLabel>
                            <FormControl
                                id="postal-type"
                                type="text"
                                className="champ-input"
                                placeholder="письмо / бандероль / посылка"
                                autoComplete="off"
                                onChange={(e) => setPostalType(e.target.value)}
                            />
                        </FormGroup>
                    </div>

                    <div className="col-sm-4">
                        <FormGroup>
                            <FormLabel htmlFor="postal-class" className="text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
                                {typograph("Класс отправления")}
                            </FormLabel>
                            <FormControl
                                id="postal-class"
                                type="text"
                                className="champ-input"
                                placeholder="1 / 2 / 3"
                                autoComplete="off"
                                onChange={(e) => setPostalClass(e.target.value)}
                            />
                        </FormGroup>
                    </div>

                    <div className="col-sm-4">
                        <FormGroup>
                            <FormLabel htmlFor="postal-weight" className="text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
                                {typograph("Вес, кг (не более 10)")}
                            </FormLabel>
                            <FormControl
                                id="postal-weight"
                                type="number"
                                className="champ-input"
                                placeholder="до 10 кг"
                                max={11}
                                autoComplete="off"
                                onChange={(e) => setWeight(e.target.value)}
                            />
                        </FormGroup>
                    </div>

                    <div className="col-sm-4">
                        <FormGroup>
                            <FormLabel htmlFor="postal-value" className="text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
                                {typograph("Объявленная стоимость")}
                            </FormLabel>
                            <FormControl
                                id="postal-value"
                                type="text"
                                className="champ-input"
                                placeholder="число для расчёта финальной цены"
                                autoComplete="off"
                                onChange={(e) => setimportantValue(e.target.value)}
                            />
                        </FormGroup>
                    </div>

                    <div className="col-md-6">
                        <FormGroup>
                            <FormLabel htmlFor="postal-to" className="text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
                                {typograph("Адрес назначения")}
                            </FormLabel>
                            <FormControl
                                id="postal-to"
                                type="text"
                                className="champ-input"
                                placeholder="г. Казань, ул. Кипра, 1"
                                autoComplete="off"
                                onChange={(e) => setAddressTo(e.target.value)}
                            />
                        </FormGroup>
                    </div>

                    <div className="col-md-6">
                        <FormGroup>
                            <FormLabel htmlFor="postal-from" className="text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
                                {typograph("Адрес отправления")}
                            </FormLabel>
                            <FormControl
                                id="postal-from"
                                type="text"
                                className="champ-input"
                                placeholder="ул. Бивола, 17"
                                autoComplete="off"
                                onChange={(e) => setAddressFrom(e.target.value)}
                            />
                        </FormGroup>
                    </div>
                </div>

                <Button variant="primary" type="submit" className="champ-btn-primary mt-4" style={{ minHeight: 44 }}>
                    {typograph("Отправить")}
                </Button>
            </Form>
        </div>
    )
}
export default SendPostal;
