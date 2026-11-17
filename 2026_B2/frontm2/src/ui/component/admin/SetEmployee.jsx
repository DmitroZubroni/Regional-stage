import Icon from "../Icon.jsx";
import {useContext, useState} from "react";
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {AtlantContext} from "../../../core/context.jsx";
import {typograph} from "../../../core/typograph";

const SetEmployee = () => {

    const { post} = useContext(AtlantContext);

    const [userAddress, setUserAddress] = useState('');
    const [postId, setPostId] = useState('');
    const [isEmployee, setIsEmployee] = useState('');


        const handleSubmit = async (e) => {
            e.preventDefault();

            await post([
                {"key": "action", "type": "string", "value": "setEmployee"},
                {"key": "userAddress","type": "string","value": userAddress},
                {"key": "postId","type": "string", "value": postId},
                {"key": "isEmployee","type": "boolean", "value": isEmployee}
            ]);
        };

    return (
        <div className="champ-card p-4 p-md-5 mb-4">
            <div className="d-flex align-items-center gap-2.5 mb-2">
                <Icon kind="document" />
                <h2 className="fs-5 fw-bold text-theme-main mb-0">
                    {typograph("Изменить роль пользователя")}
                </h2>
            </div>

            <Form className="mt-4" onSubmit={handleSubmit}>
                <div className="row g-3">
                    <div className="col-md-6">
                        <FormGroup>
                            <FormLabel htmlFor="emp-address" className="text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
                                {typograph("Укажите адрес пользователя")}
                            </FormLabel>
                            <FormControl
                                id="emp-address"
                                type="text"
                                className="champ-input mono-champ"
                                placeholder="3Nu65wwizkHH6E8KcNQyckFsfnUvyFb1qvm"
                                autoComplete="off"
                                onChange={(e) => setUserAddress(e.target.value)}
                            />
                        </FormGroup>
                    </div>

                    <div className="col-md-3">
                        <FormGroup>
                            <FormLabel htmlFor="emp-postid" className="text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
                                {typograph("Айди почтового отделения")}
                            </FormLabel>
                            <FormControl
                                id="emp-postid"
                                type="text"
                                className="champ-input mono-champ"
                                placeholder="344000"
                                autoComplete="off"
                                onChange={(e) => setPostId(e.target.value)}
                            />
                        </FormGroup>
                    </div>

                    <div className="col-md-3">
                        <FormGroup>
                            <FormLabel htmlFor="emp-flag" className="text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
                                {typograph("Назначить или снять статус сотрудника")}
                            </FormLabel>
                            <FormControl
                                id="emp-flag"
                                type="text"
                                className="champ-input"
                                placeholder="true/false"
                                autoComplete="off"
                                onChange={(e) => setIsEmployee(e.target.value)}
                            />
                        </FormGroup>
                    </div>
                </div>

                <Button variant="primary" type="submit" className="champ-btn-primary mt-4" style={{ minHeight: 44 }}>
                    {typograph("Изменить")}
                </Button>
            </Form>
        </div>
    )
}
export default SetEmployee;
