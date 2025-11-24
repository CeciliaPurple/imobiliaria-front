"use client";

import { useState, useEffect, useRef } from "react"; // 👈 Importando useRef
import { useRouter } from "next/navigation";
import Link from "next/link";
import ImovelP from "../components/ImovelP";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthStore } from "../../stores/userStore";
import { showWarningToast, showSuccessToast, showErrorToast } from "../../utils/toast";
import styles from "./visita.module.css";
import ConfirmationDialog from '../components/Confirmation';

export default function Visita() {
    const router = useRouter();
    const { user, token } = useAuthStore();
    const [agendamentos, setAgendamentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [ultimoImovel, setUltimoImovel] = useState(null);

    const [isConfirmingCancel, setIsConfirmingCancel] = useState(false);
    const [agendamentoToCancelId, setAgendamentoToCancelId] = useState(null);

    // 👈 NOVO: Ref para garantir que o redirecionamento só aconteça uma vez.
    const hasRedirected = useRef(false);

    useEffect(() => {
        // Se já tentamos redirecionar (ou já estamos logados e buscando), saímos
        if (hasRedirected.current) {
            return;
        }

        if (!token || !user) {
            // Se não está autenticado e ainda não fizemos o redirecionamento
            hasRedirected.current = true; // Sinaliza que o redirecionamento está ocorrendo
            showWarningToast('Você precisa fazer login para ver suas visitas');
            router.push('/login');
            return;
        }

        // Se autenticado, busca os agendamentos
        buscarAgendamentos();

    }, [user, token]);

    const buscarAgendamentos = async () => {
        try {
            if (!token || !user) {
                // Esta verificação aqui ainda é útil como fallback para erro interno, 
                // mas a lógica principal está no useEffect.
                setError('Usuário não autenticado');
                setLoading(false);
                return;
            }

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

            agendamentosData.sort((a, b) => new Date(b.dataVisita) - new Date(a.dataVisita));

            setAgendamentos(agendamentosData);
            setLoading(false);

        } catch (error) {
            console.error("❌ Erro ao buscar agendamentos:", error);
            setError(error.message);
            setLoading(false);
        }
    };

    const formatarTelefone = (telefone) => {
        if (!telefone) return 'Não informado';

        const apenasDigitos = telefone.replace(/\D/g, '');

        if (apenasDigitos.length === 10) {
            return apenasDigitos.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
        } else if (apenasDigitos.length === 11) {
            return apenasDigitos.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
        }

        return telefone;
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

    const openCancelConfirmation = (id) => {
        setAgendamentoToCancelId(id);
        setIsConfirmingCancel(true);
    };

    const executeCancel = async () => {
        setIsConfirmingCancel(false);

        const id = agendamentoToCancelId;
        setAgendamentoToCancelId(null);

        if (!id) {
            showErrorToast('Erro: ID do agendamento não encontrado.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3100/agenda/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao cancelar agendamento');
            }

            showSuccessToast('Agendamento cancelado com sucesso!');
            buscarAgendamentos();
        } catch (error) {
            console.error('❌ Erro ao cancelar:', error);
            showErrorToast('Erro ao cancelar agendamento');
        }
    };

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
                    <Link href="/filtro">
                        <button
                            type="button"
                            style={{
                                marginTop: '1.5rem',
                                padding: '0.75rem 2rem',
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
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
                        <div className={styles.container_visita}>
                            {agendamento.imovel ? (
                                <ImovelP imovel={agendamento.imovel} />
                            ) : (
                                <p>Imóvel não disponível</p>
                            )}
                        </div>

                        <div className={styles.texto_visita}>
                            <h3 className={styles.titulo}>Visita Agendada</h3>
                            <p><b>Nome:</b> {agendamento.usuario?.nome || "Não informado"}</p>
                            <p><b>Horário:</b> {agendamento.horario}</p>
                            <p><b>Data:</b> {formatarData(agendamento.dataVisita)}</p>

                            <p><b>Tel:</b> {formatarTelefone(agendamento.telefone || agendamento.usuario?.telefone)}</p>

                            <div className={styles.btns}>
                                <Link href={`/agenda?edit=${agendamento.id}`}>
                                    <button type="button">Editar</button>
                                </Link>

                                <button
                                    type="button"
                                    onClick={() => openCancelConfirmation(agendamento.id)}
                                    disabled={agendamento.status === 'cancelado'}
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

                        <div className={styles.obs}>
                            <label><b>Obs:</b></label>
                            <div className={styles.observacoes}>
                                {agendamento.observacoes || 'Sem observações'}
                            </div>
                        </div>

                    </div>
                </div>
            ))}

            {isConfirmingCancel && (
                <ConfirmationDialog
                    message="Deseja realmente cancelar este agendamento?"
                    onConfirm={executeCancel}
                    onCancel={() => setIsConfirmingCancel(false)}
                    messageConfirm="Sim, Cancelar"
                />
            )}
        </div>
    );
}
