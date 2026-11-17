import Icon from "../../Icon.jsx";
import {useContext, useState} from "react";
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {AtlantContext} from "../../../../core/context.jsx";
import {typograph} from "../../../../core/typograph";

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
        <div className="champ-card p-4 p-md-5 mb-4">
            <div className="d-flex align-items-center gap-2.5 mb-2">
                <Icon kind="document" />
                <h2 className="fs-5 fw-bold text-theme-main mb-0">
                    {typograph("Записать данные об отправлении")}
                </h2>
            </div>

            <Form className="mt-4" onSubmit={handleSubmit}>
                <FormGroup>
                    <FormLabel htmlFor="transit-track" className="text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
                        {typograph("Укажите трек-номер отправления")}
                    </FormLabel>
                    <FormControl
                        id="transit-track"
                        type="text"
                        className="champ-input mono-champ"
                        placeholder="RR2509202025347901346783"
                        autoComplete="off"
                        onChange={(e) => setTrackNumber(e.target.value)}
                    />
                </FormGroup>

                <Button variant="primary" type="submit" className="champ-btn-primary mt-4" style={{ minHeight: 44 }}>
                    {typograph("Записать")}
                </Button>
            </Form>
        </div>
    )
}
export default AddTransitPoint;
