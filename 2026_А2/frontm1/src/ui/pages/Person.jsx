import Header from "../component/Header.jsx";
import { useContext } from "react";
import { AtlantContext } from "../../core/context.jsx";
import GetPerson from "../component/getInfo/GetPerson.jsx";
import GetDelegates from "../component/getInfo/GetDelegates.jsx";
import { typograph } from "../../core/typograph";
import ChampionshipHeroArt from "../component/ChampionshipHeroArt.jsx";

const Person = () => {
  const { login, wallet, switchAccount } = useContext(AtlantContext);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Header />

      <main className="container">
        {!wallet ? (
          <div className="champ-hero-card p-4 p-md-5 my-5 text-center">
            <div className="mx-auto mb-4" style={{ maxWidth: 360 }}>
              <ChampionshipHeroArt width={320} height={180} className="w-100 h-auto" />
            </div>

            <span className="champ-badge-gold mb-3">ВХОД В СИСТЕМУ</span>
            <h1 className="fs-3 fw-bold text-theme-main mb-2">
              {typograph("Личный кабинет участника регионального этапа")}
            </h1>
            <p className="text-theme-muted mx-auto mb-4" style={{ maxWidth: 520, fontSize: "0.9rem", lineHeight: 1.6 }}>
              {typograph(
                "Для доступа к проверке балансов KSIPT/GERDA, управлению делегированием и голосованию в DAO выполните вход через браузерный кошелёк или тестовый демо-аккаунт."
              )}
            </p>

            <div className="d-flex flex-wrap align-items-center justify-content-center gap-3">
              <button
                onClick={login}
                className="champ-btn-primary"
                style={{ minHeight: 44, padding: "0.625rem 1.5rem" }}
              >
                <span>🦊</span>
                <span>{typograph("Подключить MetaMask")}</span>
              </button>
              <button
                onClick={() => switchAccount("expert")}
                className="champ-btn-gold"
                style={{ minHeight: 44, padding: "0.625rem 1.5rem" }}
              >
                <span>⭐</span>
                <span>{typograph("Демо-вход: Главный эксперт")}</span>
              </button>
              <button
                onClick={() => switchAccount("guest")}
                className="champ-btn-secondary"
                style={{ minHeight: 44, padding: "0.625rem 1.5rem" }}
              >
                <span>👤</span>
                <span>{typograph("Демо-вход: Конкурсант")}</span>
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div>
                <h1 className="fs-3 fw-bold text-theme-main mb-1">
                  {typograph("Кабинет участника чемпионата")}
                </h1>
                <p className="text-theme-muted mb-0" style={{ fontSize: "0.88rem" }}>
                  {typograph("Управление токенами, репутацией и правами голоса в смарт-контракте регионального этапа")}
                </p>
              </div>
              <span className="champ-badge-cyan">МОДУЛЬ А2</span>
            </div>

            <GetPerson />
            <GetDelegates />
          </div>
        )}
      </main>
    </div>
  );
};

export default Person;
