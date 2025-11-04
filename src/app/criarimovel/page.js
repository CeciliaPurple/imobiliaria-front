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
    ambiente: [],
    conveniencias: [],
    destaque: false,
    lancamento: false,
    descricao: ''
  });

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
      ambiente: formData.ambiente.map(a => a.value).join(','),        
      conveniencias: formData.conveniencias.map(c => c.value).join(','), 
      destaque: formData.destaque,
      lancamento: formData.lancamento,
      descricao: formData.descricao
    };

    try {
      console.log('Dados sendo enviados:', dadosParaEnviar);

      const response = await fetch('http://localhost:3100/imoveis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosParaEnviar)
      });

      console.log('Status da resposta:', response.status);

      if (response.ok) {
        const result = await response.json();
        console.log('Resposta do servidor:', result);
        alert('Imóvel criado com sucesso!');

        // Limpar formulário - CORRIGIDO
        setFormData({
          foto: '',
          titulo: '',
          localizacao: '',
          valor: '',
          iptu: '',
          metros_quadrados: '',
          quartos: '',
          banheiros: '',
          garagens: '',
          ambiente: [],           // ⬅️ CORRIGIDO
          conveniencias: [],      // ⬅️ CORRIGIDO
          destaque: false,        // ⬅️ CORRIGIDO (era "detaque")
          lancamento: false,
          descricao: ''
        });
      } else {
        // Verificar o Content-Type da resposta
        const contentType = response.headers.get('content-type');
        let errorData = {};

        try {
          if (contentType && contentType.includes('application/json')) {
            errorData = await response.json();
          } else {
            const responseText = await response.text();
            console.log('Resposta não-JSON do servidor:', responseText);
            errorData = {
              message: 'Erro no servidor. Verifique se a API está rodando corretamente.'
            };
          }
        } catch (parseError) {
          console.error('Erro ao processar resposta:', parseError);
          errorData = {
            message: 'Erro ao processar resposta do servidor'
          };
        }

        console.error('Erro do servidor:', errorData);
        alert(`Erro ao criar imóvel (${response.status}): ${errorData.message || 'Erro desconhecido'}`);
      }
    } catch (error) {
      console.error('Erro de rede/conexão:', error);

      if (error.message.includes('fetch')) {
        alert('Erro de conexão: Verifique se o servidor backend está rodando em http://localhost:3100');
      } else {
        alert('Erro de conexão: ' + error.message);
      }
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
              onChange={(e) => setFormData({ ...formData, foto: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, localizacao: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, iptu: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, metros_quadrados: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, quartos: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, banheiros: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, garagens: e.target.value })}
              placeholder="02"
              required
            />
          </div>

          {/* Ambiente - CORRIGIDO */}
          <div className={styles.campo}>
            <label>Ambiente:</label>
            <Select
              className={styles.ambiente}
              classNamePrefix="ambiente"
              isMulti
              options={ambienteOptions}
              value={formData.ambiente}
              onChange={(selected) => setFormData({ ...formData, ambiente: selected || [] })} // ⬅️ CORRIGIDO
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

          {/* Conveniências - CORRIGIDO */}
          <div className={styles.campo}>
            <label>Conveniências:</label>
            <Select
              className={styles.conveniencias}
              classNamePrefix="rs"
              isMulti
              options={convenienciaOptions}
              value={formData.conveniencias}
              onChange={(selected) => setFormData({ ...formData, conveniencias: selected || [] })} // ⬅️ CORRIGIDO
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

          {/* Destaque */}
          <div className={styles.campo}>
            <label htmlFor="Destaque?">Deseja Colocar imóvel em destaque?</label>
            <input
              id="destaque"
              type="checkbox"
              className={styles.ajuste}
              checked={formData.destaque}
              onChange={(e) => setFormData({ ...formData, destaque: e.target.checked })}
            />
          </div>

          {/* Lançamento */}
          <div className={styles.campo}>
            <label htmlFor="Lancamento?">Deseja Colocar imóvel em lançamento?</label>
            <input
              id="lancamento"
              type="checkbox"
              className={styles.ajuste}
              checked={formData.lancamento}
              onChange={(e) => setFormData({ ...formData, lancamento: e.target.checked })}
            />
          </div>

          {/* Descrição */}
          <div className={styles.campo}>
            <label htmlFor="observacoes">Descrição</label>
            <textarea
              id="observacoes"
              className={styles.obs}
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
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