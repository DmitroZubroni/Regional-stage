import {useContext} from "react";
import {AtlantContext} from "../../core/context.jsx";
import {Link} from "react-router-dom";

const Header = () => {
    const {isAuthorized, logout} = useContext(AtlantContext);

    return (
        <div className="navbar" style={{background: "#ac6aee", color: "white", padding: "15px"}}>
            <h2> Waves Post Office</h2>
            {
                isAuthorized === false ?
                <>
                    <Link to="/" style={{color:"white"}} className="btn">страница авторизации</Link>
                </> :
                <>
                    <Link to="/admin" style={{color:"white"}} className="btn">функции админа</Link>
                    <Link to="/employee" style={{color:"white"}} className="btn">функции сотрудника</Link>
                    <Link to="/" style={{color:"white"}} className="btn">отправления и переводы</Link>
                    <Link to="/state" style={{color:"white"}} className="btn">вся информация в блокчейне </Link>
                    <Link to="/userInfo" style={{color:"white"}} className="btn">информация пользователя </Link>
                    <Link to="/" style={{color:"white"}} className="btn" onClick={logout}> выйти </Link>
                </>
            }
        </div>
    )
}
export default Header;