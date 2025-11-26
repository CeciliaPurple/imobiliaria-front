"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ImovelP from "../components/ImovelP";
import { ToastContainer } from 'react-toastify';
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

    const hasRedirected = useRef(false);

    useEffect(() => {
        if (hasRedirected.current) {
            return;
        }

        if (!token || !user) {
            hasRedirected.current = true;
            showWarningToast('Você precisa fazer login para ver suas visitas');
            router.push('/login');
            return;
        }

        buscarAgendamentos();

        // Recuperar último imóvel visualizado
        const ultimoImovelSalvo = localStorage.getItem("ultimoImovel");
        if (ultimoImovelSalvo) {
            try {
                const imovelData = JSON.parse(ultimoImovelSalvo);
                // Normalizar o campo de foto para fotoPrincipal
                if (imovelData.foto && !imovelData.fotoPrincipal) {
                    imovelData.fotoPrincipal = imovelData.foto;
                }
                setUltimoImovel(imovelData);
            } catch (e) {
                console.error("Erro ao parsear último imóvel:", e);
            }
        }

    }, [user, token, router]);

    const buscarAgendamentos = async () => {
        try {
            if (!token || !user) {
                setError('Usuário não autenticado');
                setLoading(false);
                return;
            }

            const url = `http://localhost:3100/agenda/usuario/${user.id}`;
            console.log('🔍 Buscando agendamentos em:', url);

            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ Resposta do servidor:', errorText);
                throw new Error(`Erro ao buscar agendamentos: ${response.status}`);
            }

            const data = await response.json();
            console.log('✅ Dados recebidos:', data);
            
            let agendamentosData = data.agenda || data.agendamentos || data;

            if (!Array.isArray(agendamentosData)) {
                agendamentosData = [];
            }

            // Normalizar campo de foto nos imóveis dos agendamentos
            agendamentosData = agendamentosData.map(ag => {
                if (ag.imovel) {
                    // Se existe 'foto' mas não 'fotoPrincipal', faz a conversão
                    if (ag.imovel.foto && !ag.imovel.fotoPrincipal) {
                        ag.imovel.fotoPrincipal = ag.imovel.foto;
                    }
                }
                return ag;
            });

            // 🔥 LÓGICA DE PRIORIZAÇÃO E LIMITAÇÃO A 4 AGENDAMENTOS
            
            // Separa por status
            const pendentes = agendamentosData.filter(ag => ag.status === 'pendente');
            const outros = agendamentosData.filter(ag => ag.status !== 'pendente');
            
            // Ordena cada grupo por data mais recente
            pendentes.sort((a, b) => new Date(b.dataVisita) - new Date(a.dataVisita));
            outros.sort((a, b) => new Date(b.dataVisita) - new Date(a.dataVisita));
            
            // Monta a lista final: primeiro os pendentes, depois os outros (até completar 4)
            let agendamentosFinais = [...pendentes];
            
            // Se ainda não tiver 4, adiciona dos outros até completar
            const espacoRestante = 4 - agendamentosFinais.length;
            if (espacoRestante > 0) {
                agendamentosFinais = [...agendamentosFinais, ...outros.slice(0, espacoRestante)];
            } else {
                // Se já tiver 4 ou mais pendentes, limita a 4
                agendamentosFinais = agendamentosFinais.slice(0, 4);
            }

            console.log('✅ Agendamentos finais (máximo 4, pendentes prioritários):', agendamentosFinais);
            setAgendamentos(agendamentosFinais);
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

    // Verifica se o agendamento pode ser editado/cancelado (apenas se pendente)
    const podeEditar = (status) => status === 'pendente';

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
                <div className={styles.cardEmpty}>
                    <h3>Erro ao carregar agendamentos</h3>
                    <p style={{ marginTop: "1rem", color: "#f44336" }}>
                        {error}
                    </p>
                    <p style={{ marginTop: "0.5rem", color: "#666", fontSize: "0.9rem" }}>
                        Por favor, verifique se o servidor backend está rodando na porta 3100.
                    </p>
                    <button
                        type="button"
                        onClick={() => {
                            setLoading(true);
                            setError(null);
                            buscarAgendamentos();
                        }}
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
                        Tentar Novamente
                    </button>
                </div>
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
                            <h3 style={{ marginBottom: '15px', marginTop: 0, textAlign: 'center' }}>Visita Agendada</h3>
                            <p><b>Nome:</b> {agendamento.usuario?.nome || "Não informado"}</p>
                            <p><b>Horário:</b> {agendamento.horario}</p>
                            <p><b>Data:</b> {formatarData(agendamento.dataVisita)}</p>
                            <p><b>Tel:</b> {formatarTelefone(agendamento.telefone || agendamento.usuario?.telefone)}</p>

                            <p className={styles.status}>
                                <b>Status:</b>
                                <span style={{ color: getStatusColor(agendamento.status) }}>
                                    {' '}{formatarStatus(agendamento.status)}
                                </span>
                            </p>

                            <div className={styles.btns}>
                                {podeEditar(agendamento.status) ? (
                                    <Link href={`/agenda?edit=${agendamento.id}`}>
                                        <button type="button">Editar</button>
                                    </Link>
                                ) : (
                                    <button 
                                        type="button" 
                                        disabled
                                        style={{
                                            backgroundColor: '#ccc',
                                            cursor: 'not-allowed',
                                            color: '#666'
                                        }}
                                    >
                                        Editar
                                    </button>
                                )}

                                <button
                                    type="button"
                                    onClick={() => openCancelConfirmation(agendamento.id)}
                                    disabled={!podeEditar(agendamento.status)}
                                    style={{
                                        backgroundColor: podeEditar(agendamento.status) ? '#f00404ff' : '#ccc',
                                        cursor: podeEditar(agendamento.status) ? 'pointer' : 'not-allowed',
                                        color: podeEditar(agendamento.status) ? '#fff' : '#666'
                                    }}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>

                        <div className={styles.obs}>
                            <label htmlFor={`obs-${agendamento.id}`}><b>Obs:</b></label>
                            <textarea 
                                id={`obs-${agendamento.id}`}
                                value={agendamento.observacoes || 'Sem observações'} 
                                readOnly 
                            />
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