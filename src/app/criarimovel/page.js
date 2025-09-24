"use client";

import { useState } from "react";
import styles from "./adm.module.css";
import Select from "react-select";
import dynamic from "next/dynamic";

export default function CriarIMovelAdm() {
  const Select = dynamic(() => import("react-select"), { ssr: false });

  const [formData, setFormData] = useState({
    foto: '',
    titulo: '',
    localizacao: '',
    valor: '',
    iptu: '',
    metros_quadrados: '',
    quartos: '',
    banheiros: '',
    garagens: '',
    descricao: ''
  });

  const [ambientes, setAmbientes] = useState([]);
  const [conveniencias, setConveniencias] = useState([]);

  // Enviar form pro back
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dadosParaEnviar = {
      ...formData,
      ambiente: ambientes.map(a => a.value).join(','),
      conveniencias: conveniencias.map(c => c.value).join(','),
      valor: parseFloat(formData.valor),
      iptu: parseFloat(formData.iptu),
      metros_quadrados: parseFloat(formData.metros_quadrados),
      quartos: parseInt(formData.quartos),
      banheiros: parseInt(formData.banheiros),
      garagens: parseInt(formData.garagens)
    };

    try {
      const response = await fetch('http://localhost:3001/imovel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosParaEnviar)
      });

      if (response.ok) {
        alert('Imóvel criado com sucesso!');
        // Limpar formulário
        setFormData({
          foto: '', titulo: '', localizacao: '', valor: '',
          iptu: '', metros_quadrados: '', quartos: '',
          banheiros: '', garagens: '', descricao: ''
        });
        setAmbientes([]);
        setConveniencias([]);
      } else {
        alert('Erro ao criar imóvel');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro de conexão');
    }
  };

  const ambienteOptions = [
    { value: "piscina", label: "Piscina" },
    { value: "escritorio", label: "Escritório" },
    { value: "closet", label: "Closet" },
  ];

  const convenienciaOptions = [
    { value: "ar-condicionado", label: "Ar-Condicionado" },
    { value: "mobilhada", label: "Mobilhada" },
  ];

  return (
    <div className={styles.visita}>
      <div className={styles.container}>
        <p className={styles.agenda}>Criar Imóvel</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <p className={styles.perfil}>Criar Imóvel</p>

          {/* Foto */}
          <div className={styles.campo}>
            <label htmlFor="foto">Foto</label>
            <input
              id="foto"
              aria-label="Foto"
              type="url"
              value={formData.foto}
              onChange={(e) => setFormData({...formData, foto: e.target.value})}
              placeholder="Cole o link da imagem"
              required
            />
          </div>

          {/* Título */}
          <div className={styles.campo}>
            <label htmlFor="titulo">Título</label>
            <input
              id="titulo"
              type="text"
              value={formData.titulo}
              onChange={(e) => setFormData({...formData, titulo: e.target.value})}
              placeholder="Digite o título"
              required
            />
          </div>

          {/* Localização */}
          <div className={styles.campo}>
            <label htmlFor="localizacao">Localização</label>
            <input
              id="localizacao"
              type="text"
              value={formData.localizacao}
              onChange={(e) => setFormData({...formData, localizacao: e.target.value})}
              placeholder="Digite a localização"
              required
            />
          </div>

          {/* Valor */}
          <div className={styles.campo}>
            <label htmlFor="valor">Valor</label>
            <input
              id="valor"
              className={styles.hora}
              type="number"
              value={formData.valor}
              onChange={(e) => setFormData({...formData, valor: e.target.value})}
              placeholder="R$ 0,00"
              required
            />
          </div>

          {/* Iptu */}
          <div className={styles.campo}>
            <label htmlFor="Iptu">Iptu</label>
            <input
              id="Iptu"
              type="number"
              className={styles.ajuste}
              value={formData.iptu}
              onChange={(e) => setFormData({...formData, iptu: e.target.value})}
              placeholder="R$ 0,00"
              required
            />
          </div>

          {/* M² da casa */}
          <div className={styles.campo}>
            <label htmlFor="metros">M² Da Casa</label>
            <input
              id="metros"
              type="number"
              className={styles.ajuste}
              value={formData.metros_quadrados}
              onChange={(e) => setFormData({...formData, metros_quadrados: e.target.value})}
              placeholder="M²"
              required
            />
          </div>

          {/* Quantidade de quartos */}
          <div className={styles.campo}>
            <label htmlFor="quartos">Quantidade de quartos</label>
            <input
              id="quartos"
              type="number"
              className={styles.ajuste}
              value={formData.quartos}
              onChange={(e) => setFormData({...formData, quartos: e.target.value})}
              placeholder="03"
              required
            />
          </div>

          {/* Quantidade de banheiros */}
          <div className={styles.campo}>
            <label htmlFor="banheiros">Quantidade de banheiros</label>
            <input
              id="banheiros"
              type="number"
              className={styles.ajuste}
              value={formData.banheiros}
              onChange={(e) => setFormData({...formData, banheiros: e.target.value})}
              placeholder="02"
              required
            />
          </div>

          {/* Quantidade de garagens */}
          <div className={styles.campo}>
            <label htmlFor="garagens">Quantidade de garagens</label>
            <input
              id="garagens"
              type="number"
              className={styles.ajuste}
              value={formData.garagens}
              onChange={(e) => setFormData({...formData, garagens: e.target.value})}
              placeholder="02"
              required
            />
          </div>

          {/* Ambiente */}
          <div className={styles.campo}>
            <label>Ambiente:</label>
            <Select
              className={styles.ambiente}
              classNamePrefix="ambiente"
              isMulti
              options={ambienteOptions}
              value={ambientes}
              onChange={setAmbientes}
              placeholder="Selecione os ambientes"
              styles={{
                control: (base, state) => ({
                  ...base,
                  border: "3px solid var(--azulClaro)",
                  borderRadius: "8px",
                  boxShadow: state.isFocused ? "0 0 0 1px var(--vibrante)" : "none",
                  "&:hover": {
                    border: "3px solid var(--clean)"
                  }
                })
              }}
            />
          </div>

          {/* Conveniências */}
          <div className={styles.campo}>
            <label>Conveniências:</label>
            <Select
              className={styles.conveniencias}
              classNamePrefix="rs"
              isMulti
              options={convenienciaOptions}
              value={conveniencias}
              onChange={setConveniencias}
              placeholder="Selecione as conveniências"
              styles={{
                control: (base, state) => ({
                  ...base,
                  border: "3px solid var(--azulClaro)",
                  borderRadius: "8px",
                  boxShadow: state.isFocused ? "0 0 0 1px var(--vibrante)" : "none",
                  "&:hover": {
                    border: "3px solid var(--clean)"
                  }
                })
              }}
            />
          </div>

          {/* Descrição */}
          <div className={styles.campo}>
            <label htmlFor="observacoes">Descrição</label>
            <textarea
              id="observacoes"
              className={styles.obs}
              value={formData.descricao}
              onChange={(e) => setFormData({...formData, descricao: e.target.value})}
              placeholder="Digite a descrição do imóvel"
              required
            ></textarea>
          </div>

          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
}