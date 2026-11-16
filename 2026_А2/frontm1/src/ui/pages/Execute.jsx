import Header from "../component/Header.jsx";
import GetExecute from "../component/getInfo/GetExecute.jsx";
import { typograph } from "../../core/typograph";

const Execute = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Header />
      <main className="container">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <h1 className="fs-3 fw-bold text-theme-main mb-1">
              {typograph("Исполненные предложения DAO")}
            </h1>
            <p className="text-theme-muted mb-0" style={{ fontSize: "0.88rem" }}>
              {typograph("Архив решений регионального этапа чемпионата, принятых консенсусом участников")}
            </p>
          </div>
          <span className="champ-badge-cyan">МОДУЛЬ А2</span>
        </div>

        <GetExecute />
      </main>
    </div>
  );
};

export default Execute;
