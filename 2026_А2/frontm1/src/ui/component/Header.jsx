import {useContext} from "react";
import {AtlantContext} from "../../core/context.jsx";
import {Link} from "react-router-dom";

const Header = () => {

    const {wallet, logout} = useContext(AtlantContext);

    return (
        <div className='navbar' style={{background: '#ac6aee', color: "white"}}>
            <h2> Профессионалы 2026 </h2>
            {
                wallet === "" ?
                    <>
                        <Link to="/" className="btn" style={{color:"whitesmoke"}}>авторизоваться </Link>
                        <Link to="/" className="btn" style={{color:"whitesmoke"}}> выполненные предложения</Link>
                    </> :
                    <>
                        <Link to="/" className="btn" style={{color:"whitesmoke"}}>личный кабинет</Link>
                        <Link to="/execute" className="btn" style={{color:"whitesmoke"}}> выполненные предложения </Link>
                        <Link to="/proposal" className="btn" style={{color:"whitesmoke"}}> все голсования </Link>
                        <Link to="/func" className="btn" style={{color:"whitesmoke"}}> функции голосования </Link>
                        <Link to="/" className="btn" style={{color:"whitesmoke"}} onClick={logout}> выйти</Link>
                    </>
            }

        </div>
    )
}
export default Header;