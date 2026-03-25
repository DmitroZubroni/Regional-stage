import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {useContext} from "react";
import {AtlantContext} from "../../../core/context.jsx";
import VotingService from "../../../servise/VotingService.jsx";

const  CreateProposal = () => {

    const {wallet} = useContext(AtlantContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{

            const period = e.target[0].value
            const target = e.target[1].value
            const value = e.target[2].value
            const quorumeType = e.target[3].value
            const proposalType = e.target[4].value

            await VotingService.createProposal(period,   target,   value,  quorumeType,  proposalType, wallet);
            alert("вы создали предложение")
        } catch {
            alert("не получилсоь создать предложение")
        }
    }

    return (
        <Form className="container" onSubmit={handleSubmit}>
            <h2> создать голосование </h2>

            <FormGroup >
                <FormLabel column={1}> длительность голосования</FormLabel>
                <FormControl type="number" placeholder="время в секундах" min="0"/>
            </FormGroup>

            <FormGroup >
                <FormLabel column={1}>адрес</FormLabel>
                <FormControl type="address" placeholder="куда инвистируете или чью роль изменяете" />
            </FormGroup>

            <FormGroup >
                <FormLabel column={1}>количество</FormLabel>
                <FormControl type="number" placeholder="сколько инвистируете или на какое значение изменяете силу токена" min="0"/>
            </FormGroup>

            <FormGroup >
                <FormLabel column={1}> тип кворума</FormLabel>
                <FormControl as="select">
                    <option value={0}>Супер большинство</option>
                    <option value={1}> Простое большинство</option>
                    <option value={2}>Взвешенное</option>
                </FormControl>
            </FormGroup>

            <FormGroup >
                <FormLabel column={1}>тип голосования </FormLabel>
                <FormControl as="select">
                    <option value={0}>A</option>
                    <option value={1}>B</option>
                    <option value={2}>C</option>
                    <option value={3}>D</option>
                    <option value={4}>E</option>
                    <option value={5}>F</option>
                </FormControl>
            </FormGroup>

            <Button variant="primary" type="submit" className='container'> создать  </Button>
        </Form>
    )
}
export default CreateProposal;