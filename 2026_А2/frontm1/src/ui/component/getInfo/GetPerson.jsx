import {FormLabel} from "react-bootstrap";
import {useContext} from "react";
import {AtlantContext} from "../../../core/context.jsx";

const GetPerson = () => {

    const {person} = useContext(AtlantContext);

    return(
        <div className="container">
            <FormLabel column={1}> вы участник дао - ?  {person.isDAO?.toString() || ""}</FormLabel>
            <hr/>
            <FormLabel column={1}> баланс ксипт -  {person.ksiptBalance?.toString() || 0}</FormLabel>
            <hr/>
            <FormLabel column={1}> баланс герда - {person.gerdaBalance?.toString() || 0} </FormLabel>
        </div>
    )
}
export default GetPerson