import Icon from "../component/Icon.jsx";
import { Table } from "react-bootstrap";
import Header from "../component/Header.jsx";
import { EmptyState } from "../component/States.jsx";
import { AtlantContext } from "../../core/context.jsx";
import {useContext, useEffect, useState} from "react";
import { typograph } from "../../core/typograph";

const BlockchainState = () => {
    const { contractId } = useContext(AtlantContext);
    const [data, setData] = useState([]);



    useEffect(() => {
        (async () => {
            fetch(`http://localhost:6882/contracts/${contractId}`)
                .then(res => res.json())
                .then(setData);
        })()
    },[contractId])

    const sections = {
        USER_MAPPING: "Профили",
        POSTAL_MAPPING: "Посылки",
        TRANSFER_MAPPING: "Переводы",
        TRANSIT_MAPPING: "Транзиты"
    };

    return (
        <div>
            <Header />
            <main id="main-content" className="container">
                <div className="d-flex align-items-center gap-2.5 mb-4">
                    <Icon kind="document" />
                    <div>
                        <h1 className="fs-4 fw-bold text-theme-main mb-0">
                            {typograph("Вся информация из блокчейна")}
                        </h1>
                        <p className="text-theme-muted mb-0" style={{ fontSize: "0.85rem" }}>
                            {typograph("Публичный реестр смарт-контракта модуля B2 по разделам")}
                        </p>
                    </div>
                </div>

                <div className="d-flex flex-column gap-4">
                    {Object.entries(sections).map(([prefix, title]) => {
                        const rows = data.filter((i) => i.key.includes(prefix));
                        return (
                            <section key={prefix} className="champ-card p-0 overflow-hidden">
                                <div className="p-3 px-4" style={{ borderBottom: "1px solid var(--border)", background: "var(--surface-2)" }}>
                                    <h2 className="fs-6 fw-bold text-theme-main mb-0">{typograph(title)}</h2>
                                </div>
                                <div className="p-3">
                                    {rows.length === 0 ? (
                                        <EmptyState
                                            className="border-0 p-3"
                                            title={`${title}: записей нет`}
                                            description="В этом разделе реестра пока нет ни одной записи."
                                        />
                                    ) : (
                                        <Table className="mb-0" responsive>
                                            <tbody>
                                            {rows.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="mono-champ" style={{ fontSize: "0.82rem" }}>
                                                        <pre className="mb-0" style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                                                            {JSON.stringify(JSON.parse(item.value), null, 2).replace(/[{}"]/g, "")}
                                                        </pre>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </Table>
                                    )}
                                </div>
                            </section>
                        );
                    })}
                </div>
            </main>

        </div>
    );
};

export default BlockchainState;
