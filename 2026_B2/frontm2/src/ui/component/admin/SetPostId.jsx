import {useContext, useState} from "react";
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {AtlantContext} from "../../../core/context.jsx";

const SetPostId = () => {

    const {post} = useContext(AtlantContext);

    const [userAddress, setUserAddress] = useState('');
    const [postId, setPostId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        await post([
            {"key": "action", "type": "string", "value": "setPostId"},
            {"key": "userAddress","type": "string","value": userAddress},
            {"key": "postId","type": "string", "value": postId},
        ]);
    };
    return (
        <Form className="container" onSubmit={handleSubmit}>

            <h2> изменить айди почтового отделения у пользователя</h2>

            <FormGroup>

                <FormLabel column={1}> укажите адрес пользователя </FormLabel>
                <FormControl type="text" placeholder="3Nu65wwizkHH6E8KcNQyckFsfnUvyFb1qvm" onChange={(e) => setUserAddress(e.target.value)} />
            </FormGroup>

            <FormGroup>

                <FormLabel column={1}> укажите айди почтового отделения </FormLabel>
                <FormControl type="text" placeholder="344000" onChange={(e) => setPostId(e.target.value)} />
            </FormGroup>


            <Button variant="primary" type="submit" className="container">изменить </Button>
        </Form>
    )
}
export default SetPostId;