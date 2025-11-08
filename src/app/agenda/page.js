"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "../../stores/userStore";
import styles from "./agenda.module.css";

export default function Visitas() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const imovelId = Number(searchParams.get("imovel"));
  const editId = searchParams.get("edit"); // ID do agendamento para edição

  const { user, token } = useAuthStore();

  const [telefone, setTelefone] = useState("");
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    dataVisita: "",
    horario: "",
    observacoes: ""
  });
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const isEdit = !!editId;

  // Verificar autenticação
  useEffect(() => {
    console.log('🔍 Debug - Parâmetros:', { editId, imovelId, isEdit });
    console.log('🔍 Debug - User:', user);
    console.log('🔍 Debug - Token:', token ? 'Presente' : 'Ausente');

    if (!token || !user) {
      alert('Você precisa estar logado para agendar uma visita');
      router.push('/login');
      return;
    }

    // Carregar dados do usuário APENAS se NÃO for modo edição
    if (user && !editId) {
      setFormData(prev => ({
        ...prev,
        nome: user.nome || "",
        email: user.email || ""
      }));
    }

    // Carregar dados da visita se for edição
    if (editId) {
      console.log('✏️ Modo edição ativado, ID:', editId);
      carregarVisita();
    }
  }, [editId, user, token]);

  const carregarVisita = async () => {
    setLoadingData(true);
    try {
      const response = await fetch(`http://localhost:3100/agenda/${editId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao carregar agendamento');
      }

      const data = await response.json();
      console.log('📥 Dados carregados:', data);

      // A API pode retornar { agendamentos: {...} } ou diretamente o objeto
      const visita = data.agendamentos || data;
      console.log('📥 Visita extraída:', visita);

      // Verificar se tem os dados necessários
      if (!visita || !visita.dataVisita) {
        throw new Error('Dados do agendamento inválidos');
      }

      // Formatar data para o input (YYYY-MM-DD)
      const dataFormatada = new Date(visita.dataVisita).toISOString().split('T')[0];

      setFormData({
        nome: visita.usuario?.nome || user?.nome || "",
        email: visita.usuario?.email || user?.email || "",
        dataVisita: dataFormatada,
        horario: visita.horario,
        observacoes: visita.observacoes || ""
      });

      // Formatar telefone
      if (visita.telefone) {
        let tel = visita.telefone.replace(/\D/g, "");
        if (tel.length <= 10) {
          tel = tel.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
        } else {
          tel = tel.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
        }
        setTelefone(tel);
      }
    } catch (error) {
      console.error("❌ Erro ao carregar visita:", error);
      alert('Erro ao carregar dados do agendamento');
      router.push('/visita');
    } finally {
      setLoadingData(false);
    }
  };

  const handleTelefoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length <= 10) {
      value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else {
      value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    }
    setTelefone(value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!token || !user?.id) {
        alert("Você precisa estar logado para agendar uma visita.");
        router.push('/login');
        setLoading(false);
        return;
      }

      if (isEdit) {
        // ATUALIZAR agendamento existente
        const dadosAtualizacao = {
          dataVisita: new Date(formData.dataVisita).toISOString(),
          horario: formData.horario,
          telefone: telefone.replace(/\D/g, ""),
          observacoes: formData.observacoes
        };

        console.log('🔄 Atualizando agendamento:', dadosAtualizacao);

        const response = await fetch(`http://localhost:3100/agenda/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(dadosAtualizacao)
        });

        console.log('📥 Status da resposta:', response.status);

        if (response.ok) {
          const data = await response.json();
          console.log("✅ Resposta:", data);
          alert("✅ Visita atualizada com sucesso!");
          router.push("/visita");
        } else {
          const error = await response.json();
          console.error("❌ Erro do servidor:", error);
          alert("❌ Erro: " + (error.message || "Tente novamente."));
        }
      } else {
        // CRIAR novo agendamento
        const agendamento = {
          usuarioId: user.id,
          imovelId: imovelId,
          dataVisita: new Date(formData.dataVisita).toISOString(),
          horario: formData.horario,
          telefone: telefone.replace(/\D/g, ""),
          observacoes: formData.observacoes,
          status: "pendente"
        };

        console.log('📤 Criando agendamento:', agendamento);

        const response = await fetch("http://localhost:3100/agenda", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(agendamento)
        });

        console.log('📥 Status da resposta:', response.status);

        if (response.ok) {
          const data = await response.json();
          console.log("✅ Resposta:", data);
          alert("✅ Visita agendada com sucesso!");
          router.push("/visita");
        } else {
          const error = await response.json();
          console.error("❌ Erro do servidor:", error);
          alert("❌ Erro: " + (error.message || "Tente novamente."));
        }
      }
    } catch (error) {
      console.error("❌ Erro:", error);
      alert(isEdit ? "❌ Erro ao atualizar visita." : "❌ Erro ao agendar visita.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className={styles.visita}>
        <div className={styles.container}>
          <p style={{ textAlign: 'center', padding: '2rem' }}>Carregando dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.visita}>
      <div className={styles.container}>
        <p className={styles.agenda}>
          {isEdit ? "Editar Visita" : "Agendar Visita"}
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.tamanho1}
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleChange}
            required
            disabled={isEdit}
          />

          <input
            className={styles.tamanho1}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isEdit}
          />

          <input
            className={styles.hora}
            type="time"
            name="horario"
            value={formData.horario}
            onChange={handleChange}
            required
          />

          <input
            className={styles.hora}
            type="date"
            name="dataVisita"
            value={formData.dataVisita}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
            required
          />

          <input
            type="tel"
            className={styles.ajuste}
            placeholder="(99) 99999-9999"
            value={telefone}
            onChange={handleTelefoneChange}
            required
          />

          <textarea
            className={styles.obs}
            name="observacoes"
            placeholder="Observações"
            value={formData.observacoes}
            onChange={handleChange}
          ></textarea>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" disabled={loading}>
              {loading ? "Processando..." : isEdit ? "Atualizar Visita" : "Agendar Visita"}
            </button>
            
            <button 
              type="button" 
              onClick={() => router.push('/visita')}
              style={{
                backgroundColor: '#6c757d',
                cursor: 'pointer'
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}