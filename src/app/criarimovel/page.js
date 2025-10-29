"use client";

import { useState } from "react";
import styles from "./adm.module.css";
import dynamic from "next/dynamic";

// Dynamic import do Select
const Select = dynamic(() => import("react-select"), { 
  ssr: false,
  loading: () => <p>Carregando...</p>
});

export default function CriarIMovelAdm() {

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

    // Corrigindo os nomes dos campos para corresponder ao que o backend espera
    const dadosParaEnviar = {
      foto: formData.foto,
      titulo: formData.titulo,
      localizacao: formData.localizacao,
      valor: parseFloat(formData.valor),
      iptu: parseFloat(formData.iptu),
      metrosQuadrados: parseFloat(formData.metros_quadrados),
      quartos: parseInt(formData.quartos),
      banheiros: parseInt(formData.banheiros),
      garagens: parseInt(formData.garagens),
      ambiente: ambientes.map(a => a.value).join(','),
      conveniencias: conveniencias.map(c => c.value).join(','),
      descricao: formData.descricao
    };

    try {
      console.log('Dados sendo enviados:', dadosParaEnviar); // Para debug
      
      const response = await fetch('http://localhost:3100/imoveis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosParaEnviar)
      });

      console.log('Status da resposta:', response.status);
      console.log('Headers da resposta:', response.headers);

      if (response.ok) {
        const result = await response.json();
        console.log('Resposta do servidor:', result);
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
        // Primeiro, vamos ver o texto bruto da resposta
        const responseText = await response.text();
        console.log('Resposta bruta do servidor:', responseText);
        console.log('Status:', response.status, response.statusText);
        
        // Tentar fazer parse do JSON apenas se houver conteúdo
        let errorData = {};
        if (responseText) {
          try {
            errorData = JSON.parse(responseText);
          } catch (parseError) {
            console.error('Erro ao fazer parse da resposta:', parseError);
            errorData = { message: responseText };
          }
        }
        
        console.error('Erro do servidor:', errorData);
        alert(`Erro ao criar imóvel (${response.status}): ${errorData.message || responseText || 'Erro desconhecido'}`);
      }
    } catch (error) {
      console.error('Erro de rede/conexão:', error);
      alert('Erro de conexão: ' + error.message);
    }
  };

  const ambienteOptions = [
    { value: "piscina", label: "Piscina" },
    { value: "escritorio", label: "Escritório" },
    { value: "closet", label: "Closet" },
    { value: "amplo-arejado", label: "Amplo e arejado" },
    { value: "sala-integrada", label: "Sala integrada" },
  ];

  const convenienciaOptions = [
    { value: "ar-condicionado", label: "Ar-Condicionado" },
    { value: "mobilhada", label: "Mobilhada" },
    { value: "academia", label: "Academia" },
    { value: "piscina", label: "Piscina" },
    { value: "area-gourmet", label: "Área Gourmet" },
    { value: "seguranca-24h", label: "Segurança 24h" },
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
              step="0.01"
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
              step="0.01"
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
              step="0.01"
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