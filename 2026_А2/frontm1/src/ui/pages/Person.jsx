import Header from "../component/Header.jsx";
import {useContext} from "react";
import {AtlantContext} from "../../core/context.jsx";
import {Button} from "react-bootstrap";
import GetPerson from "../component/getInfo/GetPerson.jsx";
import GetDelegates from "../component/getInfo/GetDelegates.jsx";

const Person = () => {

    const {login, wallet} = useContext(AtlantContext)

    return (
        <div>
            <Header/>
            {
                wallet === "" ?
                    <Button onClick={login} className="container"> авторизоваться </Button>  :
                    <>
                        <GetPerson/>
                        <GetDelegates/>
                    </>
            }
        </div>
    )
}
export default Person