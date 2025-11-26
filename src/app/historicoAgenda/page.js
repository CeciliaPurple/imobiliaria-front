"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ImovelP from "../components/ImovelP";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthStore } from "../../stores/userStore";
import { showWarningToast, showErrorToast } from "../../utils/toast";
import styles from "../agendamento/visitaAdm.module.css";

export default function HistoricoAgendas() {
    const router = useRouter();
    const { user, token } = useAuthStore();
    const [agendamentos, setAgendamentos] = useState([]);
    const [agendamentosFiltrados, setAgendamentosFiltrados] = useState([]);
    const [filtroStatus, setFiltroStatus] = useState('todos'); // 'todos', 'confirmado', 'recusado'
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const hasRedirected = useRef(false);

    useEffect(() => {
        if (hasRedirected.current) {
            return;
        }

        if (!token || !user) {
            hasRedirected.current = true;
            showWarningToast('Você precisa fazer login');
            router.push('/login');
            return;
        }

        buscarHistoricoAgendamentos();

    }, [user, token, router]);

    const buscarHistoricoAgendamentos = async () => {
        try {
            if (!token || !user) {
                setError('Usuário não autenticado');
                setLoading(false);
                return;
            }

            const url = `http://localhost:3100/agenda`;

            console.log('🔍 Buscando histórico de agendamentos na URL:', url);

            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ Erro na resposta:', errorText);
                throw new Error(`Erro ao buscar agendamentos: ${response.status}`);
            }

            const data = await response.json();
            let agendamentosData = data.agenda || data.agendamentos || data;

            if (!Array.isArray(agendamentosData)) {
                agendamentosData = [];
            }

            // 🔥 FILTRA APENAS CONFIRMADOS E RECUSADOS
            const agendamentosFinalizados = agendamentosData.filter(
                ag => ag.status === 'confirmado' || ag.status === 'recusado'
            );

            // Ordenar por data mais recente
            agendamentosFinalizados.sort((a, b) => new Date(b.dataVisita) - new Date(a.dataVisita));

            // 🔥 LIMITA A APENAS 5 AGENDAMENTOS MAIS RECENTES
            const agendamentosLimitados = agendamentosFinalizados.slice(0, 5);

            console.log('✅ Histórico de agendamentos (limitados a 5):', agendamentosLimitados);
            setAgendamentos(agendamentosLimitados);
            setAgendamentosFiltrados(agendamentosLimitados);
            setLoading(false);

        } catch (error) {
            console.error("❌ Erro ao buscar histórico:", error);
            setError(error.message);
            setLoading(false);
        }
    };

    const aplicarFiltro = (status) => {
        setFiltroStatus(status);
        
        if (status === 'todos') {
            setAgendamentosFiltrados(agendamentos);
        } else {
            const filtrados = agendamentos.filter(ag => ag.status === status);
            setAgendamentosFiltrados(filtrados);
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
            confirmado: "Confirmado",
            recusado: "Recusado",
        };
        return statusMap[status] || status;
    };

    const getStatusColor = (status) => {
        const colors = {
            confirmado: "#4CAF50",
            recusado: "#f44336",
        };
        return colors[status] || "#000";
    };

    const contarPorStatus = (status) => {
        return agendamentos.filter(ag => ag.status === status).length;
    };

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loadingCard}>
                    <p>Carregando histórico...</p>
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

    return (
        <div>
            <ToastContainer theme="dark" position="top-center" autoClose={3000} />
            
            <div style={{ padding: '2rem 1rem', textAlign: 'center' }}>
                <h1>Histórico de Agendamentos</h1>
                <p style={{ color: '#666', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
                    Últimos 5 agendamentos finalizados
                </p>

                {/* Filtros */}
                <div style={{ 
                    display: 'flex', 
                    gap: '1rem', 
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    marginBottom: '1rem'
                }}>
                    <button
                        onClick={() => aplicarFiltro('todos')}
                        style={{
                            padding: '0.5rem 1.5rem',
                            backgroundColor: filtroStatus === 'todos' ? '#375A76' : '#E0E0E0',
                            color: filtroStatus === 'todos' ? '#fff' : '#333',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: filtroStatus === 'todos' ? 'bold' : 'normal',
                            transition: 'all 0.3s'
                        }}
                    >
                        Todos ({agendamentos.length})
                    </button>
                    <button
                        onClick={() => aplicarFiltro('confirmado')}
                        style={{
                            padding: '0.5rem 1.5rem',
                            backgroundColor: filtroStatus === 'confirmado' ? '#4CAF50' : '#E0E0E0',
                            color: filtroStatus === 'confirmado' ? '#fff' : '#333',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: filtroStatus === 'confirmado' ? 'bold' : 'normal',
                            transition: 'all 0.3s'
                        }}
                    >
                        Confirmados ({contarPorStatus('confirmado')})
                    </button>
                    <button
                        onClick={() => aplicarFiltro('recusado')}
                        style={{
                            padding: '0.5rem 1.5rem',
                            backgroundColor: filtroStatus === 'recusado' ? '#f44336' : '#E0E0E0',
                            color: filtroStatus === 'recusado' ? '#fff' : '#333',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: filtroStatus === 'recusado' ? 'bold' : 'normal',
                            transition: 'all 0.3s'
                        }}
                    >
                        Recusados ({contarPorStatus('recusado')})
                    </button>
                </div>
            </div>

            {agendamentosFiltrados.length === 0 ? (
                <div className={styles.container}>
                    <div className={styles.cardEmpty}>
                        <h3>Nenhum agendamento encontrado</h3>
                        <p style={{ marginTop: "1rem", color: "#666" }}>
                            Não há agendamentos {filtroStatus !== 'todos' ? `${filtroStatus}s` : 'finalizados'} no histórico.
                        </p>
                    </div>
                </div>
            ) : (
                agendamentosFiltrados.map((agendamento) => (
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
                                <p><b>Email:</b> {agendamento.usuario?.email || "Não informado"}</p>
                                <p><b>Horário:</b> {agendamento.horario}</p>
                                <p><b>Data:</b> {formatarData(agendamento.dataVisita)}</p>
                                <p><b>Tel:</b> {formatarTelefone(agendamento.telefone || agendamento.usuario?.telefone)}</p>

                                <p className={styles.status} style={{ 
                                    position: 'absolute', 
                                    top: '10px', 
                                    right: '10px',
                                    margin: 0
                                }}>
                                    <b>Status:</b>
                                    <span style={{ color: getStatusColor(agendamento.status) }}>
                                        {' '}{formatarStatus(agendamento.status)}
                                    </span>
                                </p>
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
                ))
            )}
        </div>
    );
}