import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {useContext} from "react";
import {AtlantContext} from "../../../core/context.jsx";
import VotingService from "../../../servise/VotingService.jsx";

const BuyRTK = () => {

    const {wallet} = useContext(AtlantContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const amount = e.target[0].value
            const valueAmount = amount * 10 ** 11
            await VotingService.buyRTK(amount, valueAmount, wallet);
            alert("токен успешно куплен")
        } catch {
            alert("не получилось купить токен")
        }
    }

    return (
        <Form className="container" onSubmit={handleSubmit}>
            <h2> купить герда токен </h2>
            <FormGroup >
            <FormLabel column={1}> какое количество вы хотите купить ? </FormLabel>
                <FormControl type="number" placeholder="100" min="0"/>
            </FormGroup>
            <Button variant="primary" type="submit" className='container'> купить </Button>
        </Form>
    )
}
export default BuyRTK;