"use client";

import { useState } from "react";
import styles from "./agenda.module.css";

export default function Visitas() {
  const [telefone, setTelefone] = useState("");

  const handleTelefoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // remove tudo que não for número

    if (value.length > 11) value = value.slice(0, 11); // limita em 11 dígitos

    if (value.length <= 10) {
      // Telefone fixo -> (99) 9999-9999
      value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else {
      // Celular -> (99) 99999-9999
      value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    }

    setTelefone(value);
  };

  return (
    <div className={styles.visita}>
      <div className={styles.container}>

        <p className={styles.agenda}>Agendar Visita</p>

        <form className={styles.form}>
          {/* Nome */}
          <input
            className={styles.tamanho1}
            type="text"
            placeholder="Nome"
            required
          />

          {/* Email */}
          <input
            className={styles.tamanho1}
            type="email"
            placeholder="Email"
            required
          />

          {/* Horário */}
          <input
            className={styles.hora}
            type="time"
            required
          />

          {/* Data */}
          <input
            className={styles.hora}
            type="date"
            required
          />

          {/* Telefone com máscara manual */}
          <input
            type="tel"
            className={styles.ajuste}
            placeholder="(99) 99999-9999"
            value={telefone}
            onChange={handleTelefoneChange}
            required
          />

          {/* Observações */}
          <textarea
            className={styles.obs}
            placeholder="Observações"
            required
          ></textarea>

          <button type='submit'>Agendar Visita</button>
        </form>
      </div>
    </div>
  );
}
