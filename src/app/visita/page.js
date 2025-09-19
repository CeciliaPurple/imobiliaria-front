import Link from "next/link";
import ImovelP from "../components/ImovelP";
import styles from "./visita.module.css";

// Simulação de dados (depois substitui pelo que vem do backend)
const visita = {
    nome: "Daniel Santana",
    hora: "16:30",
    data: "25/08/2025",
    tel: "(12)9852376455",
    status: "Confirmado",
    obs: "Maria Celi",
};

export default function Visita() {
    return (

        <div>
            <div className={styles.container}>
                <div className={styles.card}>

                    {/* Card do imóvel */}
                    <div className={styles.container_visita}>
                       <ImovelP/>
                    </div>

                    {/* Dados da visita */}
                    <div className={styles.texto_visita}>
                        <h3 className={styles.titulo}>Visita Agendada</h3>
                        <p><b>Nome:</b> {visita.nome}</p>
                        <p><b>Horário:</b> {visita.hora}</p>
                        <p><b>Data:</b> {visita.data}</p>
                        <p><b>Tel:</b> {visita.tel}</p>

                        <div className={styles.btns}>
                          <Link href='/agenda'><button type="button">Editar</button></Link>
                            <button type="button">Cancelar</button>
                            <p className={styles.status}>
                                Status: <span>{visita.status}</span>
                            </p>
                        </div>
                    </div>

                    {/* Observações */}
                    <div className={styles.obs}>
                        <label htmlFor="obs"><b>Obs:</b></label>
                        <textarea id="obs" value={visita.obs} readOnly />
                    </div>

                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.card}>

                    {/* Card do imóvel */}
                    <div className={styles.container_visita}>
                        <ImovelP />
                    </div>

                    {/* Dados da visita */}
                    <div className={styles.texto_visita}>
                        <h3 className={styles.titulo}>Visita Agendada</h3>
                        <p><b>Nome:</b> {visita.nome}</p>
                        <p><b>Horário:</b> {visita.hora}</p>
                        <p><b>Data:</b> {visita.data}</p>
                        <p><b>Tel:</b> {visita.tel}</p>

                        <div className={styles.btns}>
                            <button type="button">Editar</button>
                            <button type="button">Cancelar</button>
                            <p className={styles.status}>
                                Status: <span>{visita.status}</span>
                            </p>
                        </div>
                    </div>

                    {/* Observações */}
                    <div className={styles.obs}>
                        <label htmlFor="obs"><b>Obs:</b></label>
                        <textarea id="obs" value={visita.obs} readOnly />
                    </div>

                </div>
            </div>

            <div className={styles.container}>
            <div className={styles.card}>

                {/* Card do imóvel */}
                <div className={styles.container_visita}>
                    <ImovelP />
                </div>

                {/* Dados da visita */}
                <div className={styles.texto_visita}>
                    <h3 className={styles.titulo}>Visita Agendada</h3>
                    <p><b>Nome:</b> {visita.nome}</p>
                    <p><b>Horário:</b> {visita.hora}</p>
                    <p><b>Data:</b> {visita.data}</p>
                    <p><b>Tel:</b> {visita.tel}</p>

                    <div className={styles.btns}>
                        <button type="button">Editar</button>
                        <button type="button">Cancelar</button>
                        <p className={styles.status}>
                            Status: <span>{visita.status}</span>
                        </p>
                    </div>
                </div>

                {/* Observações */}
                <div className={styles.obs}>
                    <label htmlFor="obs"><b>Obs:</b></label>
                    <textarea id="obs" value={visita.obs} readOnly />
                </div>

            </div>
        </div>
        </div>
    );
}
