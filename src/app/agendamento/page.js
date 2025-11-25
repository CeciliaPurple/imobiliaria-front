"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ImovelP from "../components/ImovelP";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthStore } from "../../stores/userStore";
import { showWarningToast, showSuccessToast, showErrorToast } from "../../utils/toast";
import styles from "./visitaAdm.module.css";
import ConfirmationDialog from '../components/Confirmation';

export default function VisitaAdm() {
    const router = useRouter();
    const { user, token } = useAuthStore();
    const [agendamentos, setAgendamentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [isConfirmingAction, setIsConfirmingAction] = useState(false);
    const [actionType, setActionType] = useState(null); // 'accept' ou 'reject'
    const [agendamentoToActionId, setAgendamentoToActionId] = useState(null);

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

        buscarTodosAgendamentos();

    }, [user, token]);

    const buscarTodosAgendamentos = async () => {
        try {
            if (!token || !user) {
                setError('Usuário não autenticado');
                setLoading(false);
                return;
            }

            // Busca TODOS os agendamentos do banco (rota admin)
            const url = `http://localhost:3100/agenda`;

            console.log('🔍 Buscando agendamentos na URL:', url);
            console.log('🔑 Token:', token ? 'Presente' : 'Ausente');

            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            console.log('📡 Status da resposta:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ Erro na resposta:', errorText);
                throw new Error(`Erro ao buscar agendamentos: ${response.status}`);
            }

            const data = await response.json();
            console.log('📦 Dados recebidos:', data);
            
            let agendamentosData = data.agenda || data.agendamentos || data;
            console.log('📋 Agendamentos extraídos:', agendamentosData);
            console.log('📊 Tipo de dados:', Array.isArray(agendamentosData) ? 'Array' : typeof agendamentosData);
            console.log('🔢 Quantidade:', Array.isArray(agendamentosData) ? agendamentosData.length : 'N/A');

            if (!Array.isArray(agendamentosData)) {
                console.warn('⚠️ Dados não são um array, convertendo para array vazio');
                agendamentosData = [];
            }

            // Ordenar por data mais recente
            agendamentosData.sort((a, b) => new Date(b.dataVisita) - new Date(a.dataVisita));

            console.log('✅ Agendamentos finais:', agendamentosData);
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

    const openConfirmation = (id, type) => {
        setAgendamentoToActionId(id);
        setActionType(type);
        setIsConfirmingAction(true);
    };

    const executeAction = async () => {
        setIsConfirmingAction(false);

        const id = agendamentoToActionId;
        const action = actionType;
        
        setAgendamentoToActionId(null);
        setActionType(null);

        if (!id) {
            showErrorToast('Erro: ID do agendamento não encontrado.');
            return;
        }

        try {
            // PUT para aceitar (confirmado) ou recusar (recusado)
            const novoStatus = action === 'accept' ? 'confirmado' : 'recusado';
            
            const response = await fetch(`http://localhost:3100/agenda/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: novoStatus })
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar agendamento');
            }

            const successMessages = {
                accept: 'Agendamento confirmado com sucesso!',
                reject: 'Agendamento recusado.'
            };

            showSuccessToast(successMessages[action]);
            buscarTodosAgendamentos();
            
        } catch (error) {
            console.error('❌ Erro ao executar ação:', error);
            showErrorToast('Erro ao atualizar agendamento');
        }
    };

    const getConfirmationMessage = () => {
        const messages = {
            accept: 'Deseja confirmar este agendamento?',
            reject: 'Deseja recusar este agendamento?'
        };
        return messages[actionType] || 'Confirmar ação?';
    };

    const getConfirmButtonText = () => {
        const texts = {
            accept: 'Sim, Confirmar',
            reject: 'Sim, Recusar'
        };
        return texts[actionType] || 'Confirmar';
    };

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loadingCard}>
                    <p>Carregando agendamentos...</p>
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
                    <h3>Nenhum agendamento encontrado</h3>
                    <p style={{ marginTop: "1rem", color: "#666" }}>
                        Não há agendamentos no sistema no momento.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <ToastContainer theme="dark" position="top-center" autoClose={3000} />
            
            <div style={{ padding: '2rem 1rem', textAlign: 'center' }}>
                <h1>Gerenciar Agendamentos</h1>
                <p style={{ color: '#666', marginTop: '0.5rem' }}>
                    Total de agendamentos: {agendamentos.length}
                </p>
            </div>

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
                            <p><b>Email:</b> {agendamento.usuario?.email || "Não informado"}</p>
                            <p><b>Horário:</b> {agendamento.horario}</p>
                            <p><b>Data:</b> {formatarData(agendamento.dataVisita)}</p>
                            <p><b>Tel:</b> {formatarTelefone(agendamento.telefone || agendamento.usuario?.telefone)}</p>

                            <div className={styles.btns}>
                                <button
                                    type="button"
                                    onClick={() => openConfirmation(agendamento.id, 'accept')}
                                    disabled={agendamento.status === 'confirmado' || agendamento.status === 'cancelado'}
                                    style={{
                                        backgroundColor: agendamento.status === 'confirmado' ? '#ccc' : '#4CAF50',
                                        cursor: agendamento.status === 'confirmado' || agendamento.status === 'cancelado' ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    {agendamento.status === 'confirmado' ? 'Confirmado' : 'Aceitar'}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => openConfirmation(agendamento.id, 'reject')}
                                    disabled={agendamento.status === 'recusado' || agendamento.status === 'cancelado'}
                                    style={{
                                        backgroundColor: agendamento.status === 'recusado' ? '#ccc' : '#f44336',
                                        cursor: agendamento.status === 'recusado' || agendamento.status === 'cancelado' ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    {agendamento.status === 'recusado' ? 'Recusado' : 'Recusar'}
                                </button>
                            </div>

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
            ))}

            {isConfirmingAction && (
                <ConfirmationDialog
                    message={getConfirmationMessage()}
                    onConfirm={executeAction}
                    onCancel={() => setIsConfirmingAction(false)}
                    messageConfirm={getConfirmButtonText()}
                />
            )}
        </div>
    );
}