"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./adm.module.css";
import dynamic from "next/dynamic";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthStore } from "@/stores/userStore";
import { showSuccessToast, showErrorToast, showWarningToast } from "@/utils/toast";

// Dynamic import do Select
const Select = dynamic(() => import("react-select"), {
  ssr: false,
  loading: () => <p>Carregando...</p>
});

export default function CriarEditarImovel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id'); // ID do imóvel para edição
  const isEdit = !!editId;

  const { user, token, isLoggedIn } = useAuthStore();
  const [loading, setLoading] = useState(isEdit);

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

  // Função para formatar valor em Real brasileiro
  const formatarMoeda = (valor) => {
    // Remove tudo que não é número
    const apenasNumeros = valor.replace(/\D/g, '');
    
    // Converte para número e divide por 100 para ter os centavos
    const numero = parseFloat(apenasNumeros) / 100;
    
    // Formata para Real brasileiro
    return numero.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // Função para converter valor formatado de volta para número
  const desformatarMoeda = (valorFormatado) => {
    return valorFormatado.replace(/\./g, '').replace(',', '.');
  };

  useEffect(() => {
    // Verificar se está logado
    if (!isLoggedIn || !token || !user) {
      showWarningToast('Você precisa estar logado para acessar esta página');
      router.push('/login');
      return;
    }

    // Carregar dados do imóvel se for edição
    if (editId) {
      carregarImovel();
    }
  }, [editId, user, token, isLoggedIn, router]);

  const carregarImovel = async () => {
    try {
      console.log('📥 Carregando imóvel:', editId);
      
      const response = await fetch(`http://localhost:3100/imoveis/${editId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao carregar imóvel');
      }

      const data = await response.json();
      console.log('📦 Dados do imóvel:', data);

      const imovel = data.imovel || data;

      // Converter ambiente e conveniências de string para array de objetos
      const ambienteArray = imovel.ambiente 
        ? imovel.ambiente.split(',').map(a => ({ 
            value: a.trim(), 
            label: ambienteOptions.find(opt => opt.value === a.trim())?.label || a.trim() 
          }))
        : [];

      const convenienciasArray = imovel.conveniencias 
        ? imovel.conveniencias.split(',').map(c => ({ 
            value: c.trim(), 
            label: convenienciaOptions.find(opt => opt.value === c.trim())?.label || c.trim() 
          }))
        : [];

      setFormData({
        foto: imovel.foto || '',
        titulo: imovel.titulo || '',
        localizacao: imovel.localizacao || '',
        valor: imovel.valor ? formatarMoeda(String(imovel.valor * 100)) : '',
        iptu: imovel.iptu ? formatarMoeda(String(imovel.iptu * 100)) : '',
        metros_quadrados: imovel.metrosQuadrados || imovel.metros_quadrados || '',
        quartos: imovel.quartos || '',
        banheiros: imovel.banheiros || '',
        garagens: imovel.garagens || '',
        ambiente: ambienteArray,
        conveniencias: convenienciasArray,
        destaque: imovel.destaque || false,
        lancamento: imovel.lancamento || false,
        descricao: imovel.descricao || ''
      });

      setLoading(false);
    } catch (error) {
      console.error('❌ Erro ao carregar imóvel:', error);
      showErrorToast('Erro ao carregar dados do imóvel');
      router.push('/perfiladm');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dadosParaEnviar = {
      foto: formData.foto,
      titulo: formData.titulo,
      localizacao: formData.localizacao,
      valor: parseFloat(desformatarMoeda(formData.valor)),
      iptu: parseFloat(desformatarMoeda(formData.iptu)),
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
      console.log(isEdit ? '🔄 Atualizando imóvel:' : '📤 Criando imóvel:', dadosParaEnviar);

      const url = isEdit 
        ? `http://localhost:3100/imoveis/${editId}` 
        : 'http://localhost:3100/imoveis';

      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosParaEnviar)
      });

      console.log('📥 Status da resposta:', response.status);

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Resposta do servidor:', result);
        showSuccessToast(isEdit ? '✅ Imóvel atualizado com sucesso!' : '✅ Imóvel criado com sucesso!');
        router.push('/perfiladm');
      } else {
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

        console.error('❌ Erro do servidor:', errorData);
        showErrorToast(`Erro ao ${isEdit ? 'atualizar' : 'criar'} imóvel (${response.status}): ${errorData.message || 'Erro desconhecido'}`);
      }
    } catch (error) {
      console.error('❌ Erro de rede/conexão:', error);

      if (error.message.includes('fetch')) {
        showErrorToast('Erro de conexão: Verifique se o servidor backend está rodando em http://localhost:3100');
      } else {
        showErrorToast('Erro de conexão: ' + error.message);
      }
    }
  };

  const ambienteOptions = [
    { value: "area-de-servicos", label: "Área de Serviços" },
    { value: "area-gourmet", label: "Área Gourmet" },
    { value: "closet", label: "Closet" },
    { value: "escritorio", label: "Escritório" },
    { value: "jardim", label: "Jardim" },
    { value: "lavanderia", label: "Lavanderia" },
    { value: "piscina", label: "Piscina" },
    { value: "quintal", label: "Quintal" },
    { value: "sala-integrada", label: "Sala integrada" },
  ];

  const convenienciaOptions = [
    { value: "academia", label: "Academia" },
    { value: "ar-condicionado", label: "Ar-Condicionado" },
    { value: "armarios-planejados", label: "Armários Planejados" },
    { value: "hidromassagem", label: "Hidromassagem" },
    { value: "mobiliado", label: "Mobiliado" },
    { value: "seguranca-24h", label: "Segurança 24h" },
  ];

  if (loading) {
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
      <ToastContainer theme="dark" position="top-center" autoClose={3000} />
      <div className={styles.container}>
        <p className={styles.agenda}>
          {isEdit ? 'Editar Imóvel' : 'Criar Imóvel'}
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <p className={styles.perfil}>
            {isEdit ? 'Editar Imóvel' : 'Criar Imóvel'}
          </p>

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
            <label htmlFor="valor">Valor (R$)</label>
            <input
              id="valor"
              className={styles.hora}
              type="text"
              value={formData.valor}
              onChange={(e) => {
                const valorFormatado = formatarMoeda(e.target.value);
                setFormData({ ...formData, valor: valorFormatado });
              }}
              placeholder="0,00"
              required
            />
          </div>

          {/* Iptu */}
          <div className={styles.campo}>
            <label htmlFor="Iptu">IPTU (R$)</label>
            <input
              id="Iptu"
              type="text"
              className={styles.ajuste}
              value={formData.iptu}
              onChange={(e) => {
                const valorFormatado = formatarMoeda(e.target.value);
                setFormData({ ...formData, iptu: valorFormatado });
              }}
              placeholder="0,00"
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

          {/* Ambiente */}
          <div className={styles.campo}>
            <label>Ambiente:</label>
            <Select
              className={styles.ambiente}
              classNamePrefix="ambiente"
              isMulti
              options={ambienteOptions}
              value={formData.ambiente}
              onChange={(selected) => setFormData({ ...formData, ambiente: selected || [] })}
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
              value={formData.conveniencias}
              onChange={(selected) => setFormData({ ...formData, conveniencias: selected || [] })}
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
            <label htmlFor="Destaque?">Deseja colocar imóvel em destaque?</label>
            <input
              id="destaque"
              type="checkbox"
              className={styles.check}
              checked={formData.destaque}
              onChange={(e) => setFormData({ ...formData, destaque: e.target.checked })}
            />
          </div>

          {/* Lançamento */}
          <div className={styles.campo}>
            <label htmlFor="Lancamento?">Deseja colocar imóvel em lançamento?</label>
            <input
              id="lancamento"
              type="checkbox"
              className={styles.check}
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

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit">
              {isEdit ? 'Atualizar' : 'Criar'}
            </button>
            
            <button 
              type="button"
              onClick={() => router.push('/perfiladm')}
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