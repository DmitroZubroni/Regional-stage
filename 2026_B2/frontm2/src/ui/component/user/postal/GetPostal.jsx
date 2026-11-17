import Icon from "../../Icon.jsx";
import {useContext, useState} from "react";
import {Button, Form, FormCheck, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {AtlantContext} from "../../../../core/context.jsx";
import {typograph} from "../../../../core/typograph";

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
        <div className="champ-card p-4 p-md-5 mb-4">
            <div className="d-flex align-items-center gap-2.5 mb-2">
                <Icon kind="document" />
                <h2 className="fs-5 fw-bold text-theme-main mb-0">
                    {typograph("Принять посылку")}
                </h2>
            </div>

            <Form onSubmit={handleSubmit} className="mt-4">
                <div className="row g-3 align-items-end">
                    <div className="col-md-8">
                        <FormGroup>
                            <FormLabel htmlFor="getpostal-track" className="text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
                                {typograph("Трек-номер посылки")}
                            </FormLabel>
                            <FormControl
                                id="getpostal-track"
                                type="text"
                                className="champ-input mono-champ"
                                placeholder="RR2509202025347901346783"
                                autoComplete="off"
                                onChange={(e) => setTrackNumber(e.target.value)}
                            />
                        </FormGroup>
                    </div>

                    <div className="col-md-4">
                        <FormGroup className="d-flex align-items-center gap-2" style={{ minHeight: 44 }}>
                            <FormCheck
                                id="getpostal-accept"
                                style={{ minWidth: 24, minHeight: 24 }}
                                onChange={(e) => setAccepted(e.target.value)}
                            />
                            <FormLabel htmlFor="getpostal-accept" className="text-theme-main fw-semibold mb-0" style={{ fontSize: "0.85rem" }}>
                                {typograph("Вы принимаете отправление?")}
                            </FormLabel>
                        </FormGroup>
                    </div>
                </div>

                <Button variant="primary" type="submit" className="champ-btn-primary mt-4" style={{ minHeight: 44 }}>
                    {typograph("Принять")}
                </Button>
            </Form>
        </div>
    )
}
export default GetPostal;
