"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./agenda.module.css";

export default function Visitas() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const imovelId = Number(searchParams.get("imovel")); // pega ID do imóvel da URL

  const [telefone, setTelefone] = useState("");
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    dataVisita: "",
    horario: "",
    observacoes: ""
  });
  const [loading, setLoading] = useState(false);

  // Máscara de telefone
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

  // Atualiza campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Enviar agendamento
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Recupera o token e o ID do usuário logado
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const usuarioId =
        typeof window !== "undefined"
          ? Number(localStorage.getItem("usuarioId"))
          : null;

      // Verifica se o usuário está logado
      if (!token || !usuarioId) {
        alert("Você precisa estar logado para agendar uma visita.");
        setLoading(false);
        return;
      }

      // Verifica se o imóvel é válido
      if (!imovelId || isNaN(imovelId)) {
        alert("Erro: ID do imóvel inválido. Retorne à página do imóvel.");
        setLoading(false);
        return;
      }

      // ✅ Monta o objeto de agendamento
      const agendamento = {
        usuarioId,
        imovelId,
        dataVisita: new Date(formData.dataVisita).toISOString(),
        horario: formData.horario,
        telefone: telefone.replace(/\D/g, ""),
        observacoes: formData.observacoes,
        status: "pendente"
      };

      console.log("Enviando agendamento:", agendamento);

      const response = await fetch("http://localhost:3100/agenda", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(agendamento)
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Agendamento criado:", data);
        alert("✅ Visita agendada com sucesso!");
        router.push("/visitas");
      } else {
        const error = await response.json();
        console.error("Erro:", error);
        alert("❌ Erro ao agendar visita: " + (error.message || "Tente novamente."));
      }
    } catch (error) {
      console.error("Erro ao agendar visita:", error);
      alert("❌ Erro ao agendar visita. Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.visita}>
      <div className={styles.container}>
        <p className={styles.agenda}>Agendar Visita</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.tamanho1}
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />

          <input
            className={styles.tamanho1}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
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

          <button type="submit" disabled={loading}>
            {loading ? "Agendando..." : "Agendar Visita"}
          </button>
        </form>
      </div>
    </div>
  );
}
