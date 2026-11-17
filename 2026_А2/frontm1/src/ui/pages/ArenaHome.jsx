import Header from "../component/Header.jsx";
import {Link} from "react-router-dom";
import ChampionshipHeroArt from "../component/ChampionshipHeroArt.jsx";
export default function ArenaHome() {
 return <><Header/><main id="main-content" className="container">
 <section className="workspace-intro"><div><p className="text-theme-muted">Совместное управление</p><h1>Решения начинаются<br/>с вашего голоса</h1><p>Предложения, делегирование и исполнение решений DAO — в одном рабочем пространстве.</p><Link to="/proposal" className="champ-btn-primary">Открыть предложения</Link></div><ChampionshipHeroArt className="workspace-art"/></section>
 <div className="task-grid">{[
 ['/cabinet','Личный кабинет','Проверьте баланс токенов и делегированные права голоса.'],
 ['/func','Операции DAO','Создайте предложение, проголосуйте или делегируйте голос.'],
 ['/execute','Исполненные решения','Посмотрите результаты исполнения предложений.']
 ].map(([url,title,text])=><Link className="task-link" to={url} key={url}><h2>{title}</h2><p>{text}</p><span>Открыть раздел</span></Link>)}</div>
 </main></>;
}