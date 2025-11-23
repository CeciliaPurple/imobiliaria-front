"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./pefil.module.css";
import heart from '../../../public/icons/heart-outline.svg';
import Image from 'next/image';
import { Edit2, Trash2, Plus } from "lucide-react";
import { useAuthStore } from "@/stores/userStore";
import { showWarningToast, showSuccessToast, showErrorToast } from "@/utils/toast";
import ConfirmationDialog from '../components/Confirmation'; 

export default function PerfilAdm() {
  const router = useRouter();
  const { user, token, isLoggedIn } = useAuthStore();
  
  const [imoveis, setImoveis] = useState([]);
  const [imoveisFiltrados, setImoveisFiltrados] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [imovelToDeleteId, setImovelToDeleteId] = useState(null);

  useEffect(() => {
    if (!isLoggedIn || !token || !user) {
      showWarningToast('Você precisa estar logado para acessar esta página');
      router.push('/login');
      return;
    }

    buscarImoveis();
  }, [user, token, isLoggedIn, router]);

  const buscarImoveis = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3100/imoveis', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar imóveis');
      }

      const data = await response.json();
      const imoveisData = data.imovel || data.imoveis || data;
      
      const imoveisArray = Array.isArray(imoveisData) ? imoveisData : [];
      
      setImoveis(imoveisArray);
      setImoveisFiltrados(imoveisArray);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar imóveis:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleBusca = (e) => {
    const termo = e.target.value.toLowerCase();
    setBusca(termo);

    if (termo === "") {
      setImoveisFiltrados(imoveis);
    } else {
      const filtrados = imoveis.filter(imovel => 
        imovel.titulo?.toLowerCase().includes(termo) ||
        imovel.localizacao?.toLowerCase().includes(termo) ||
        imovel.endereco?.toLowerCase().includes(termo)
      );
      setImoveisFiltrados(filtrados);
    }
  };

  const handleEditar = (id) => {
    router.push(`/criarimovel?id=${id}`);
  };

  const openDeleteConfirmation = (id) => {
    setImovelToDeleteId(id);
    setIsConfirmingDelete(true);
  };

  const executeDelete = async () => {
    setIsConfirmingDelete(false); 

    const id = imovelToDeleteId;
    setImovelToDeleteId(null); 

    if (!id) {
        showErrorToast('Erro: ID do imóvel não identificado para exclusão.');
        return;
    }
    
    try {
      const response = await fetch(`http://localhost:3100/imoveis/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        let errorMessage = 'Erro ao excluir imóvel';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
          const errorText = await response.text();
          console.log('Resposta do servidor (erro):', errorText);
        }
        throw new Error(errorMessage);
      }

      showSuccessToast('✅ Imóvel excluído com sucesso!');
      buscarImoveis(); 
    } catch (error) {
      console.error('Erro ao excluir:', error);
      showErrorToast('Erro ao excluir imóvel: ' + error.message);
    }
  };


  if (loading) {
    return (
      <div className={styles.perfil}>
        <p style={{ textAlign: 'center', padding: '2rem' }}>Carregando imóveis...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.perfil}>
        <p style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
          Erro: {error}
        </p>
      </div>
    );
  }

  return (
    <div className={styles.perfil}>
      <p className={styles.agenda}>Perfil Administrativo</p>

      <div className={styles.container}>
        <Link href="/criarimovel" className={styles.botao}>
          <span className={styles.texto}>Novo Imóvel</span>
          <Plus size={24} color="#000" />
        </Link>

        <p className={styles.listagem}>
          Listagem Imóveis ({imoveisFiltrados.length})
        </p>

        <div className={styles.campo}>
          <input
            id="localizacao"
            type="search"
            placeholder="Buscar Imóvel"
            value={busca}
            onChange={handleBusca}
          />
        </div>

        {imoveisFiltrados.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
            {busca ? 'Nenhum imóvel encontrado com esse termo.' : 'Nenhum imóvel cadastrado.'}
          </p>
        ) : (
          imoveisFiltrados.map((imovel) => (
            <div key={imovel.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image 
                  src={imovel.foto || imovel.fotos?.[0] || '/img/casaModerna.jpg'} 
                  alt={imovel.titulo} 
                  className={styles.imagem}
                  width={200}
                  height={150}
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.info}>
                <p className={styles.titulo}>{imovel.titulo}</p>
                <p className={styles.endereco}>
                  {imovel.endereco || imovel.localizacao}
                  <br />
                  {imovel.cidade && imovel.estado ? `${imovel.cidade} - ${imovel.estado}` : ''}
                </p>
                {imovel.valor && (
                  <p style={{ fontWeight: 'bold', color: '#375A76', marginTop: '8px' }}>
                    R$ {Number(imovel.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                )}
              </div>
              <div className={styles.icons}>
                <button 
                  className={styles.editar}
                  onClick={() => handleEditar(imovel.id)}
                  title="Editar imóvel"
                >
                  <Edit2 size={24} color="#375A76" />
                </button>
                <button 
                  className={styles.lixeira}
                  onClick={() => openDeleteConfirmation(imovel.id)}
                  title="Excluir imóvel"
                >
                  <Trash2 size={24} color="#375A76" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      {isConfirmingDelete && (
        <ConfirmationDialog
          message="Tem certeza que deseja excluir este imóvel? Esta ação é irreversível!"
          onConfirm={executeDelete}
          onCancel={() => setIsConfirmingDelete(false)}
        />
      )}
    </div>
  );
}