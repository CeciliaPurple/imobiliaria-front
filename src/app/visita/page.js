"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ImovelP from "../components/ImovelP";
import { useAuthStore } from "../../stores/userStore";
import styles from "./visita.module.css";

export default function Visita() {
    const router = useRouter();
    const { user, token } = useAuthStore(); // Pega do Zustand
    const [agendamentos, setAgendamentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        // Verifica autenticação
        if (!token || !user) {
            console.log('❌ Redirecionando para login...');
            alert('Você precisa fazer login para ver suas visitas');
            router.push('/login');
            return;
        }

        buscarAgendamentos();
    }, [user, token]);

    const buscarAgendamentos = async () => {
        try {

            if (!token || !user) {
                setError('Usuário não autenticado');
                setLoading(false);
                return;
            }

            const url = `http://localhost:3100/agenda/usuario/${user.id}`;

            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });


            if (!response.ok) {
                const errorText = await response.text();
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
            console.error('❌ Erro ao buscar agendamentos:', error);
            setError(error.message);
            setLoading(false);
        }
    };

    const formatarData = (data) => {
        const dataObj = new Date(data);
        return dataObj.toLocaleDateString('pt-BR');
    };

    const formatarStatus = (status) => {
        const statusMap = {
            'pendente': 'Pendente',
            'confirmado': 'Confirmado',
            'recusado': 'Recusado',
            'cancelado': 'Cancelado'
        };
        return statusMap[status] || status;
    };

    const getStatusColor = (status) => {
        const colors = {
            'pendente': '#FFA500',
            'confirmado': '#4CAF50',
            'recusado': '#f44336',
            'cancelado': '#9E9E9E'
        };
        return colors[status] || '#000';
    };

    const handleCancelar = async (id) => {
        if (!confirm('Deseja realmente cancelar este agendamento?')) {
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

            alert('Agendamento cancelado com sucesso!');
            buscarAgendamentos(); // Recarrega a lista
        } catch (error) {
            console.error('❌ Erro ao cancelar:', error);
            alert('Erro ao cancelar agendamento');
        }
    };
    
    if (loading) {
        return (
            <div className={styles.container}>
                <p style={{ textAlign: 'center', padding: '2rem' }}>Carregando agendamentos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.container}>
                <p style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
                    Erro: {error}
                </p>
            </div>
        );
    }

    if (agendamentos.length === 0) {
        return (
            <div className={styles.container}>
                <div className={styles.card} style={{ textAlign: 'center', padding: '3rem' }}>
                    <h3>Nenhuma visita agendada</h3>
                    <p style={{ marginTop: '1rem', color: '#666' }}>
                        Você ainda não agendou nenhuma visita.
                    </p>
                    <Link href="/">
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
            {agendamentos.map((agendamento) => (
                <div key={agendamento.id} className={styles.container}>
                    <div className={styles.card}>
                        {/* Card do imóvel */}
                        <div className={styles.container_visita}>
                            {agendamento.imovel ? (
                                <ImovelP
                                    foto={agendamento.imovel.foto}
                                    titulo={agendamento.imovel.titulo}
                                    localizacao={agendamento.imovel.localizacao}
                                    valor={agendamento.imovel.valor}
                                    id={agendamento.imovel.id}
                                />
                            ) : (
                                <p>Imóvel não disponível</p>
                            )}
                        </div>

                        {/* Dados da visita */}
                        <div className={styles.texto_visita}>
                            <h3 className={styles.titulo}>Visita Agendada</h3>
                            <p><b>Nome:</b> {agendamento.usuario?.nome || 'Não informado'}</p>
                            <p><b>Horário:</b> {agendamento.horario}</p>
                            <p><b>Data:</b> {formatarData(agendamento.dataVisita)}</p>
                            <p><b>Tel:</b> {agendamento.telefone || 'Não informado'}</p>

                            <div className={styles.btns}>
                                <Link href={`/agenda?edit=${agendamento.id}`}>
                                    <button type="button">Editar</button>
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => handleCancelar(agendamento.id)}
                                    disabled={agendamento.status === 'cancelado'}
                                >
                                    Cancelar
                                </button>
                                <p className={styles.status}>
                                    Status: <span style={{ color: getStatusColor(agendamento.status) }}>
                                        {formatarStatus(agendamento.status)}
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Observações */}
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
        </div>
    );
}