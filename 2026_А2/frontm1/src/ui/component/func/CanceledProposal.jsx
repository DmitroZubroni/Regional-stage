import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {useContext} from "react";
import {AtlantContext} from "../../../core/context.jsx";
import VotingService from "../../../servise/VotingService.jsx";

const CanceledProposal = () => {

    const {wallet} = useContext(AtlantContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{

            const proposalId = e.target[0].value

            await VotingService.canceledProposal(proposalId, wallet) ;
            alert("голосование успешно отмененно")
        } catch {
            alert("не получилось отменить голосование")
        }
    }

    return (
        <Form className="container" onSubmit={handleSubmit}>
            <h2> отменить голосование </h2>
            <FormGroup >
                <FormLabel column={1}> укажите айди голосования </FormLabel>
                <FormControl type="number" placeholder="47445512608963282444866689225822515492372600702266932293386661379275502793113" min="0"/>
            </FormGroup>
            <Button variant="primary" type="submit" className='container'> отменить </Button>
        </Form>
    )
}
export default CanceledProposal;