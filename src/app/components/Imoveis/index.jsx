'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import styles from '../Imoveis/imoveis.module.css';

export default function Imoveis() {
    const params = useParams();
    const [imovel, setImovel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        const fetchImovel = async () => {
            try {
                const response = await fetch(`http://localhost:3100/imoveis/${params.id}`);
                
                if (response.ok) {
                    const data = await response.json();
                    setImovel(data.imovel || data);
                    
                    // Verifica favoritos
                    const favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
                    const jaEhFavorito = favoritos.some(fav => String(fav.id) === String(params.id));
                    setIsFavorited(jaEhFavorito);
                    
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            } catch (error) {
                console.error('❌ Erro ao buscar imóvel:', error);
                setLoading(false);
            }
        };

        if (params.id) {
            fetchImovel();
        }
    }, [params.id]);

    const handleToggleFavorite = () => {
        if (!imovel) return;

        const favoritosAtuais = JSON.parse(localStorage.getItem('favoritos') || '[]');
        const imovelIndex = favoritosAtuais.findIndex(fav => String(fav.id) === String(imovel.id));

        let novosFavoritos;

        if (imovelIndex > -1) {
            novosFavoritos = favoritosAtuais.filter(fav => String(fav.id) !== String(imovel.id));
            setIsFavorited(false);
        } else {
            const imovelParaAdicionar = {
                id: imovel.id,
                imagemSrc: imovel.fotoPrincipal,
                titulo: imovel.titulo,
                area: imovel.metrosQuadrados,
                bed: imovel.quartos,
                bath: imovel.banheiros,
                car: imovel.garagens,
                location: imovel.localizacao,
                price: imovel.valor
            };

            novosFavoritos = [...favoritosAtuais, imovelParaAdicionar];
            setIsFavorited(true);
        }

        localStorage.setItem('favoritos', JSON.stringify(novosFavoritos));
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <p>Carregando imóvel...</p>
            </div>
        );
    }

    if (!imovel) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <p>Imóvel não encontrado</p>
            </div>
        );
    }

    // Processar dados
    const ambientes = imovel.ambiente ? imovel.ambiente.split(',').map(a => a.trim()) : [];
    const conveniencias = imovel.conveniencias ? imovel.conveniencias.split(',').map(c => c.trim()) : [];

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
        <div>
            <div className={styles.imageGallery}>
                <div className={styles.imageGallery}>
                    <div className={styles.leftImage}>
                        <img src={imovel.fotoPrincipal} alt={imovel.titulo} className={styles.largeImage} />
                    </div>
                    <div className={styles.rightImages}>
                        <img src={imovel.fotoPrincipal} alt={imovel.titulo} className={styles.smallImage1} />
                        <img src={imovel.fotoPrincipal} alt={imovel.titulo} className={styles.smallImage2} />
                    </div>
                </div>
            </div>

            <div className={styles.propriedadeInfo}>
                <div className={styles.bloco1}>
                    <h2 className={styles.title}>
                        {imovel.titulo}
                        <div className={styles.Hearticon} onClick={handleToggleFavorite} style={{ cursor: 'pointer' }}>
                            <svg width="50" height="50" viewBox="0 0 24 24" fill={isFavorited ? '#DE302A' : 'none'} stroke={isFavorited ? '#DE302A' : 'currentColor'} strokeWidth="2">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                        </div>
                    </h2>

                    <h3 className={styles.subtitle}>
                        {imovel.localizacao}
                        <div className={styles.locationicon}>
                            <Image src="/icons/location.svg" alt="location" width={30} height={30} />
                        </div>
                    </h3>

                    <div className={styles.caracteristicas}>
                        <div className={styles.item}>
                            <Image src="/icons/bed.svg" alt="quartos" width={30} height={30} />
                            <span>{imovel.quartos} Quartos</span>
                        </div>
                        <div className={styles.item}>
                            <Image src="/icons/Water.svg" alt="banheiros" width={30} height={30} />
                            <span>{imovel.banheiros} Banheiros</span>
                        </div>
                        <div className={styles.item}>
                            <Image src="/icons/car.svg" alt="vagas" width={30} height={30} />
                            <span>{imovel.garagens} Vagas</span>
                        </div>
                        <div className={styles.item}>
                            <Image src="/icons/Home.svg" alt="metragem" width={30} height={30} />
                            <span>{imovel.metrosQuadrados} m²</span>
                        </div>
                    </div>
                </div>

                <div className={styles.venda}>
                    <div className={styles.infovenda}>
                        <div className={styles.vendalista}>
                            <p>{valorFormatado}</p>
                        </div>
                        <p className={styles.vendalista2}>
                            <p>Venda</p>
                        </p>
                        <div className={styles.iptu}>
                            <p>IPTU</p>
                        </div>
                        <div className={styles.numero}>
                            <p>{iptuFormatado}</p>
                        </div>
                    </div>
                    <button className={styles.agendarButton}>
                        Agendar Visita
                    </button>

                    <button className={styles.contactButton}>
                        Entrar em Contato
                    </button>
                </div>
            </div>

            {ambientes.length > 0 && (
                <>
                    <div className={styles.objambiente}>
                        <p>Ambiente</p>
                    </div>
                    <div className={styles.ambientelista}>
                        {ambientes.map((ambiente, index) => (
                            <p key={index}>{ambiente}</p>
                        ))}
                    </div>
                </>
            )}

            {conveniencias.length > 0 && (
                <div className={styles.Conveniencias}>
                    <p className={styles.objConveniencias}>Conveniências</p>
                    <p className={styles.listaConveniencias}>
                        {conveniencias.map((conveniencia, index) => (
                            <p key={index}>{conveniencia}</p>
                        ))}
                    </p>
                </div>
            )}

            <div className={styles.descriçao}>
                <p className={styles.objdescrição}>Descrição</p>
                <div className={styles.textodescrição}>
                    <p>{imovel.descricao}</p>
                </div>
            </div>
        </div>
    );
}