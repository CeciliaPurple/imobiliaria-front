'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './casas.module.css';

// Ícones
const Location = "/icons/location.svg";
const Bed = "/icons/bed.svg";
const Car = "/icons/car.svg";
const Water = "/icons/water.svg";
const Home = "/icons/home.svg";

export default function ImovelDetalhes() {
  const params = useParams();
  const [imovel, setImovel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImovel = async () => {
      try {
        console.log('🔍 Buscando imóvel ID:', params.id);
        const response = await fetch(`http://localhost:3100/imoveis/${params.id}`);

        if (response.ok) {
          const data = await response.json();
          console.log('✅ Dados recebidos:', data);
          setImovel(data.imovel || data);
          setLoading(false);
        } else {
          setError('Imóvel não encontrado');
          setLoading(false);
        }
      } catch (error) {
        console.error('❌ Erro ao buscar imóvel:', error);
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
    currency: 'BRL',
    minimumFractionDigits: 2
  }).format(imovel.valor);

  const iptuFormatado = imovel.iptu ? new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  }).format(imovel.iptu) : 'Não informado';

  return (
    <div className={styles.container}>
      {/* Galeria de Imagens */}
      <div className={styles.imageGallery}>
        <div className={styles.mainImage}>
          <img src={imovel.foto} alt={imovel.titulo} />
        </div>
        <div className={styles.thumbnails}>
          <div className={styles.thumbnail}>
            <img src={imovel.foto} alt={imovel.titulo} />
          </div>
          <div className={styles.thumbnail}>
            <img src={imovel.foto} alt={imovel.titulo} />
            <div className={styles.morePhotos}>+ 5</div>
          </div>
        </div>
      </div>

      {/* Container Principal */}
      <div className={styles.mainContent}>
        {/* Informações da Propriedade (Esquerda) */}
        <div className={styles.propertyInfo}>
          <div className={styles.headerSection}>
            <div>
              <h1 className={styles.title}>{imovel.titulo}</h1>
              <div className={styles.location}>
                <Image src={Location} alt="localização" width={16} height={16} />
                <span>{imovel.localizacao}</span>
              </div>
            </div>
            <button className={styles.favoriteButton}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>

          <div className={styles.features}>
            <div className={styles.feature}>
              <Image src={Home} alt="área" width={20} height={20} />
              <span>{imovel.metrosQuadrados} m²</span>
            </div>
            <div className={styles.feature}>
              <Image src={Bed} alt="quartos" width={20} height={20} />
              <span>{imovel.quartos} Quartos</span>
            </div>
            <div className={styles.feature}>
              <Image src={Water} alt="banheiros" width={20} height={20} />
              <span>{imovel.banheiros} Banheiros</span>
            </div>
            <div className={styles.feature}>
              <Image src={Car} alt="vagas" width={20} height={20} />
              <span>{imovel.garagens} Vagas</span>
            </div>
          </div>

          {/* Ambientes */}
          {ambientes.length > 0 && (
            <div className={styles.section}>
              <h3>Ambientes</h3>
              <div className={styles.tags}>
                {ambientes.map((ambiente, index) => (
                  <span key={index} className={styles.tag}>{ambiente}</span>
                ))}
              </div>
            </div>
          )}

          {/* Conveniências */}
          {conveniencias.length > 0 && (
            <div className={styles.section}>
              <h3>Conveniências</h3>
              <div className={styles.tags}>
                {conveniencias.map((conveniencia, index) => (
                  <span key={index} className={styles.tag}>{conveniencia}</span>
                ))}
              </div>
            </div>
          )}

          {/* Descrição */}
          <div className={styles.section}>
            <h3>Descrição</h3>
            <p className={styles.description}>{imovel.descricao}</p>
          </div>
        </div>

        {/* Card de Venda (Direita) */}
        <div className={styles.saleCard}>
          <div className={styles.saleType}>Venda</div>

          <div className={styles.priceSection}>
            <h2 className={styles.price}>{valorFormatado}</h2>
          </div>

          <div className={styles.iptuSection}>
            <span className={styles.iptuLabel}>IPTU</span>
            <span className={styles.iptuValue}>{iptuFormatado}</span>
          </div>

          {/* ✅ MANTÉM APENAS ESTE BOTÃO COM O ID */}
          <Link href={`/agenda?imovel=${params.id}`}>
            <button className={styles.scheduleButton}>Agendar visita</button>
          </Link>
        </div>
      </div>
    </div>
  );
}