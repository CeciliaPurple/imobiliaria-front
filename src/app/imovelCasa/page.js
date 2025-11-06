'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './casas.module.css';

// Ícones
const Heart = "/icons/heart.svg";
const Home = "/icons/home.svg";
const Location = "/icons/location.svg";
const Bed = "/icons/bed.svg";
const Car = "/icons/car.svg";
const Water = "/icons/water.svg";

export default function ImovelDetalhes() {
  const params = useParams();
  const [imovel, setImovel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImovel = async () => {
      try {
        console.log('Buscando imóvel ID:', params.id);
        const response = await fetch(`http://localhost:3100/imoveis/${params.id}`);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Dados recebidos:', data);
          // A resposta pode vir em data.imovel ou direto em data
          setImovel(data.imovel || data);
          setLoading(false);
        } else {
          setError('Imóvel não encontrado');
          setLoading(false);
        }
      } catch (error) {
        console.error('Erro ao buscar imóvel:', error);
        setError('Erro ao carregar imóvel');
        setLoading(false);
      }
    };

    if (params.id) {
      fetchImovel();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <p>Carregando imóvel...</p>
      </div>
    );
  }

  if (error || !imovel) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', gap: '20px' }}>
        <p>{error || 'Imóvel não encontrado'}</p>
        <Link href="/">
          <button style={{ padding: '10px 20px', cursor: 'pointer', background: '#222020ff', color: 'white', border: 'none', borderRadius: '8px' }}>
            Voltar para Home
          </button>
        </Link>
      </div>
    );
  }

  // Processar arrays de ambiente e conveniências
  const ambientes = imovel.ambiente ? imovel.ambiente.split(',').map(a => a.trim()) : [];
  const conveniencias = imovel.conveniencias ? imovel.conveniencias.split(',').map(c => c.trim()) : [];

  // Formatar valores
  const valorFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(imovel.valor);

  const iptuFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(imovel.iptu);

  return (
    <div>
      {/* Galeria de Imagens */}
      <div className={styles.imageGallery}>
        <div className={styles.leftImage}>
          <img src={imovel.foto} alt={imovel.titulo} className={styles.largeImage} />
        </div>
        <div className={styles.rightImages}>
          {/* Por enquanto usa a mesma foto 3x. Futuramente pode adicionar mais fotos */}
          <img src={imovel.foto} alt={imovel.titulo} className={styles.smallImage1} />
          <img src={imovel.foto} alt={imovel.titulo} className={styles.smallImage2} />
        </div>
      </div>

      {/* Informações da Propriedade */}
      <div className={styles.propriedadeInfo}>
        <div className={styles.bloco1}>
          <h2 className={styles.title}>
            {imovel.titulo}
          </h2>

          <h3 className={styles.subtitle}>
            {imovel.localizacao}
            <div className={styles.locationicon}>
              <Image src={Location} alt="location" width={30} height={30} />
            </div>
          </h3>

          <div className={styles.caracteristicas}>
            <div className={styles.item}>
              <Image src={Bed} alt="quartos" width={30} height={30} />
              <span>{imovel.quartos} Quartos</span>
            </div>
            <div className={styles.item}>
              <Image src={Water} alt="banheiros" width={30} height={30} />
              <span>{imovel.banheiros} Banheiros</span>
            </div>
            <div className={styles.item}>
              <Image src={Car} alt="vagas" width={30} height={30} />
              <span>{imovel.garagens} Vagas</span>
            </div>
            <div className={styles.item}>
              <Image src={Home} alt="metragem" width={30} height={30} />
              <span>{imovel.metrosQuadrados} m²</span>
            </div>
          </div>
        </div>

        {/* Informações de Venda */}
        <div className={styles.venda}>
          <div className={styles.infovenda}>
            <div className={styles.vendalista}>
              <p>{valorFormatado}</p>
            </div>
            <p className={styles.vendalista2}>
              <span>Venda</span>
            </p>
            <div className={styles.iptu}>
              <p>IPTU</p>
            </div>
            <div className={styles.numero}>
              <p>{iptuFormatado}/ano</p>
            </div>
          </div>

          <Link href={'/agenda'}>
            <button className={styles.agendarButton}>Agendar Visita</button>
          </Link>

          <Link href={'/'}>
            <button className={styles.contactButton}>Entrar em Contato</button>
          </Link>
        </div>
      </div>

      {/* Ambiente */}
      {ambientes.length > 0 && (
        <>
          <div className={styles.objambiente}>
            <p>ambiente</p>
          </div>
          <div className={styles.ambientelista}>
            {ambientes.map((ambiente, index) => (
              <p key={index}>{ambiente}</p>
            ))}
          </div>
        </>
      )}

      {/* Conveniências */}
      {conveniencias.length > 0 && (
        <div className={styles.Conveniencias}>
          <p className={styles.objConveniencias}>Conveniências</p>
          <div className={styles.listaConveniencias}>
            {conveniencias.map((conveniencia, index) => (
              <p key={index}>{conveniencia}</p>
            ))}
          </div>
        </div>
      )}

      {/* Descrição */}
      <div className={styles.descrição}>
        <p className={styles.objdescrição}>Descrição</p>
        <div className={styles.textodescriçãoo}>
          <p>{imovel.descricao}</p>
        </div>
      </div>
    </div>
  );
}