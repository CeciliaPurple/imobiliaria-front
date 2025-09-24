import Link from "next/link";
import ImovelP from "../components/ImovelP";
import styles from "./visitaAdm.module.css";

// Simulação de dados (depois substitui pelo que vem do backend)
const visita = {
    nome: "Daniel Santana",
    hora: "16:30",
    data: "25/08/2025",
    tel: "(12)9852376455",
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
                          <Link href='/'><button type="button">Aceitar</button></Link>
                            <button type="button">Cancelar</button>
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
                            <button type="button">Aceitar</button>
                            <button type="button">Cancelar</button>
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
                        <button type="button">Aceitar</button>
                        <button type="button">Cancelar</button>
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
