"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ImovelP from "../components/ImovelP";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthStore } from "../../stores/userStore";
import styles from "./visita.module.css";

export default function Visita() {
    const router = useRouter();
    const { user, token } = useAuthStore();

    const [agendamentos, setAgendamentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [ultimoImovel, setUltimoImovel] = useState(null);

    useEffect(() => {
        const saved = localStorage.getItem("ultimoImovel");
        if (saved) {
            setUltimoImovel(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        if (!token || !user) {
            toast.warn("Você precisa fazer login para ver suas visitas");
            router.push("/login");
            return;
        }

        buscarAgendamentos();
    }, [user, token]);

    const buscarAgendamentos = async () => {
        try {
            const url = `http://localhost:3100/agenda/usuario/${user.id}`;

            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Erro ao buscar agendamentos: ${response.status}`);
            }

            const data = await response.json();
            let agendamentosData = data.agendamentos || data;

            if (!Array.isArray(agendamentosData)) {
                agendamentosData = [];
            }

            setAgendamentos(agendamentosData);
            setLoading(false);

        } catch (error) {
            console.error("❌ Erro ao buscar agendamentos:", error);
            setError(error.message);
            setLoading(false);
        }
    };

    const formatarData = (data) => {
        const dataObj = new Date(data);
        return dataObj.toLocaleDateString("pt-BR");
    };

    const formatarStatus = (status) => {
        const statusMap = {
            pendente: "Pendente",
            confirmado: "Confirmado",
            recusado: "Recusado",
            cancelado: "Cancelado",
        };
        return statusMap[status] || status;
    };

    const getStatusColor = (status) => {
        const colors = {
            pendente: "#FFA500",
            confirmado: "#4CAF50",
            recusado: "#f44336",
            cancelado: "#9E9E9E",
        };
        return colors[status] || "#000";
    };

    const handleCancelar = async (id) => {
        const toastId = `confirm-cancel-${id}`;

        // Impede que múltiplos toasts de confirmação sejam abertos para o mesmo item
        if (toast.isActive(toastId)) {
            console.log("A confirmação já está visível.");
            return;
        }

        const performDelete = async () => {
            try {
                const response = await fetch(`http://localhost:3100/agenda/${id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                if (!response.ok) throw new Error("Erro ao cancelar agendamento");
    
                toast.success("Agendamento cancelado com sucesso!");
                buscarAgendamentos();
    
            } catch (error) {
                console.error("❌ Erro ao cancelar:", error);
                toast.error("Erro ao cancelar agendamento.");
            }
        };

        // Componente para confirmação dentro do toast
        const Confirmation = ({ closeToast }) => (
            <div>
                <p>Deseja realmente cancelar?</p>
                <button className={styles.btnConfirm} onClick={() => { performDelete(); closeToast(); }}>Sim</button>
                <button className={styles.btnCancel} onClick={closeToast}>Não</button>
            </div>
        );

        // Exibe o toast de confirmação
        toast.warn(<Confirmation />, {
            toastId: toastId, // Atribui um ID único ao toast
            position: "top-center",
            autoClose: false,
            closeOnClick: false,
            draggable: false,
            closeButton: true,
        });
    };

    // ⭐ LOADING — APENAS O CARD DO ÚLTIMO IMÓVEL
    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loadingCard}>
                    {ultimoImovel && <ImovelP imovel={ultimoImovel} />}
                    <p>Carregando seus agendamentos...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.container}>
                <p style={{ textAlign: "center", padding: "2rem", color: "red" }}>
                    Erro: {error}
                </p>
            </div>
        );
    }

    if (agendamentos.length === 0) {
        return (
            <div className={styles.container}>
                <div className={styles.cardEmpty}>
                    <h3>Nenhuma visita agendada</h3>
                    <p style={{ marginTop: "1rem", color: "#666" }}>
                        Você ainda não agendou nenhuma visita.
                    </p>
                    <Link href="/">
                        <button className={styles.btnVerImoveis}>
                            Ver Imóveis
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div>
            <ToastContainer theme="dark" position="top-center" autoClose={3000} />
            {agendamentos.map((agendamento) => (
                <div key={agendamento.id} className={styles.container}>
                    <div className={styles.card}>
                        
                        {/* CARD DO IMÓVEL */}
                        <div className={styles.container_visita}>
                            {agendamento.imovel ? (
                                <ImovelP imovel={agendamento.imovel} />
                            ) : (
                                <p>Imóvel não disponível</p>
                            )}
                        </div>

                        {/* DADOS DA VISITA */}
                        <div className={styles.texto_visita}>
                            <h3 className={styles.titulo}>Visita Agendada</h3>
                            <p><b>Nome:</b> {agendamento.usuario?.nome || "Não informado"}</p>
                            <p><b>Horário:</b> {agendamento.horario}</p>
                            <p><b>Data:</b> {formatarData(agendamento.dataVisita)}</p>
                            <p><b>Tel:</b> {agendamento.telefone}</p>

                            <div className={styles.btns}>
                                <Link href={`/agenda?edit=${agendamento.id}`}>
                                    <button type="button">Editar</button>
                                </Link>

                                <button
                                    type="button"
                                    onClick={() => handleCancelar(agendamento.id)}
                                    disabled={agendamento.status === "cancelado"}
                                >
                                    Cancelar
                                </button>
                            </div>

                            <p className={styles.status}>
                                Status:
                                <span style={{ color: getStatusColor(agendamento.status) }}>
                                    {formatarStatus(agendamento.status)}
                                </span>
                            </p>
                        </div>

                        {/* OBSERVAÇÕES */}
                        <div className={styles.obs}>
                            <label><b>Obs:</b></label>
                            <textarea
                                value={agendamento.observacoes || "Sem observações"}
                                readOnly
                            />
                        </div>

                    </div>
                </div>
            ))}
        </div>
    );
}
