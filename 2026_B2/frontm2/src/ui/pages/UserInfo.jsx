import Icon from "../component/Icon.jsx";
import { Table } from "react-bootstrap";
import Header from "../component/Header.jsx";
import { EmptyState } from "../component/States.jsx";
import { AtlantContext } from "../../core/context.jsx";
import {useContext, useEffect, useState} from "react";
import { typograph } from "../../core/typograph";

const UserInfo = () => {
    const { contractId, sender } = useContext(AtlantContext);
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            fetch(`http://localhost:6882/contracts/${contractId}`)
                .then(res => res.json())
                .then(setData)
        })()
    }, [contractId, sender])

    const sections = {
        USER_MAPPING: "Профиль",
        POSTAL_MAPPING: "Посылки пользователя",
        TRANSFER_MAPPING: "Переводы пользователя",
        TRANSIT_MAPPING: "Транзиты пользователя"
    };

    return (
        <div>
            <Header />

            <main id="main-content" className="container">
                <div className="d-flex align-items-center gap-2.5 mb-4">
                    <Icon kind="user" />
                    <h1 className="fs-4 fw-bold text-theme-main mb-0">
                        {typograph("Личный кабинет")}
                    </h1>
                </div>

                <div className="d-flex flex-column gap-4">
                    {Object.entries(sections).map(([prefix, title]) => {
                        const rows = data.filter((i) => i.key.includes(prefix) && i.value.includes(sender));
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
                                            description="По вашему адресу в этом разделе пока нет записей."
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

export default UserInfo;
