import {Button, Form, FormCheck, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {useContext} from "react";
import {AtlantContext} from "../../../core/context.jsx";
import VotingService from "../../../servise/VotingService.jsx";

const CastVoted = () => {

    const {wallet} = useContext(AtlantContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{

            const proposalId = e.target[0].value
            const amount = e.target[1].value
            const support = e.target[2].checked

            await VotingService.castVoted(proposalId, amount, support, wallet);
            alert("вы успешно проголосовали")
        } catch {
            alert("не получилось проголосовать")
        }
    }

    return (
        <Form className="container" onSubmit={handleSubmit}>
            <h2>проголосовать за определённое предложение  </h2>

            <FormGroup>
                <FormLabel column={1}>айди голосования </FormLabel>
                <FormControl type="number" placeholder="47445512608963282444866689225822515492372600702266932293386661379275502793113" min="0"/>
            </FormGroup>

            <FormGroup >
                <FormLabel column={1}>  количество токенов которое отдайте на голосование </FormLabel>
                <FormControl type="number" placeholder="100" min="0"/>
            </FormGroup>

            <FormGroup >
                <FormLabel column={1}> вы голосуете за ?</FormLabel>
                <FormCheck type="switch"/>
            </FormGroup>

            <Button variant="primary" type="submit" className='container'> проголосовать </Button>
        </Form>
    )
}
export default CastVoted;