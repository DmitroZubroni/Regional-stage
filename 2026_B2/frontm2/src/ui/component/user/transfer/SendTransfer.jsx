import Icon from "../../Icon.jsx";
import {useContext, useState} from "react";
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {AtlantContext} from "../../../../core/context.jsx";
import {typograph} from "../../../../core/typograph";

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
        <div className="champ-card p-4 p-md-5 mb-4">
            <div className="d-flex align-items-center gap-2.5 mb-2">
                <Icon kind="transfer" />
                <h2 className="fs-5 fw-bold text-theme-main mb-0">
                    {typograph("Отправить денежный перевод")}
                </h2>
            </div>

            <Form onSubmit={handleSubmit} className="mt-4">
                <div className="row g-3">
                    <div className="col-md-6">
                        <FormGroup>
                            <FormLabel htmlFor="transfer-recipient" className="text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
                                {typograph("Адрес получателя")}
                            </FormLabel>
                            <FormControl
                                id="transfer-recipient"
                                type="text"
                                className="champ-input mono-champ"
                                placeholder="3Nu65wwizkHH6E8KcNQyckFsfnUvyFb1qvm"
                                autoComplete="off"
                                onChange={(e) => setRecipient(e.target.value)}
                            />
                        </FormGroup>
                    </div>

                    <div className="col-sm-3">
                        <FormGroup>
                            <FormLabel htmlFor="transfer-amount" className="text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
                                {typograph("Сумма")}
                            </FormLabel>
                            <FormControl
                                id="transfer-amount"
                                type="text"
                                className="champ-input mono-champ"
                                placeholder="10"
                                autoComplete="off"
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </FormGroup>
                    </div>

                    <div className="col-sm-3">
                        <FormGroup>
                            <FormLabel htmlFor="transfer-ttl" className="text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
                                {typograph("Время жизни, дней")}
                            </FormLabel>
                            <FormControl
                                id="transfer-ttl"
                                type="text"
                                className="champ-input"
                                placeholder="укажите количество дней, пока перевод будет активен"
                                autoComplete="off"
                                onChange={(e) => setTimeLive(e.target.value)}
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
export default SendTransfer;
