"use client";
import { useState, useEffect } from 'react';
import styles from './filtro.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Local from '../../../public/icons/location-sharp.svg';
import Filter from '../../../public/icons/Vector.svg';
import Area from '../../../public/icons/home-outline.svg';
import Bedroom from '../../../public/icons/bed-outline.svg';
import Bathroom from '../../../public/icons/water-outline.svg';
import Car from '../../../public/icons/car-outline.svg';

export default function Filtro() {
    const [imoveis, setImoveis] = useState([]);
    const [imoveisFiltrados, setImoveisFiltrados] = useState([]);
    const [loading, setLoading] = useState(true);

    // Estados dos filtros
    const [filtros, setFiltros] = useState({
        localizacao: '',
        tipos: [],
        precoMin: '',
        precoMax: '',
        quartos: [],
        banheiros: [],
        vagas: [],
        ambientes: [],
        conveniencias: []
    });

    // Buscar imóveis da API
    useEffect(() => {
        const buscarImoveis = async () => {
            try {
                const response = await fetch('http://localhost:3100/imoveis');
                const data = await response.json();
                // A resposta vem dentro de data.imovel
                setImoveis(data.imovel || []);
                setImoveisFiltrados(data.imovel || []);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar imóveis:', error);
                setLoading(false);
            }
        };

        buscarImoveis();
    }, []);

    // Aplicar filtros sempre que mudarem
    useEffect(() => {
        let resultado = [...imoveis];

        // Filtro de localização (busca em titulo e localizacao)
        if (filtros.localizacao.trim()) {
            const busca = filtros.localizacao.toLowerCase();
            resultado = resultado.filter(imovel =>
                imovel.localizacao?.toLowerCase().includes(busca) ||
                imovel.titulo?.toLowerCase().includes(busca)
            );
        }

        // Filtro de tipo (baseado no título ou ambiente)
        if (filtros.tipos.length > 0) {
            resultado = resultado.filter(imovel => {
                const tituloLower = imovel.titulo?.toLowerCase() || '';
                return filtros.tipos.some(tipo =>
                    tituloLower.includes(tipo.toLowerCase())
                );
            });
        }

        // Filtro de preço mínimo
        if (filtros.precoMin) {
            resultado = resultado.filter(imovel =>
                parseFloat(imovel.valor) >= parseFloat(filtros.precoMin)
            );
        }

        // Filtro de preço máximo
        if (filtros.precoMax) {
            resultado = resultado.filter(imovel =>
                parseFloat(imovel.valor) <= parseFloat(filtros.precoMax)
            );
        }

        // Filtro de quartos (mínimo selecionado)
        if (filtros.quartos.length > 0) {
            const minQuartos = Math.min(...filtros.quartos);
            resultado = resultado.filter(imovel =>
                imovel.quartos >= minQuartos
            );
        }

        // Filtro de banheiros (mínimo selecionado)
        if (filtros.banheiros.length > 0) {
            const minBanheiros = Math.min(...filtros.banheiros);
            resultado = resultado.filter(imovel =>
                imovel.banheiros >= minBanheiros
            );
        }

        // Filtro de vagas (mínimo selecionado)
        if (filtros.vagas.length > 0) {
            const minVagas = Math.min(...filtros.vagas);
            resultado = resultado.filter(imovel =>
                imovel.garagens >= minVagas
            );
        }

        // Filtro de ambientes
        if (filtros.ambientes.length > 0) {
            resultado = resultado.filter(imovel => {
                const ambienteImovel = imovel.ambiente?.toLowerCase() || '';
                return filtros.ambientes.some(amb =>
                    ambienteImovel.includes(amb.toLowerCase())
                );
            });
        }

        // Filtro de conveniências
        if (filtros.conveniencias.length > 0) {
            resultado = resultado.filter(imovel => {
                const convenienciasImovel = imovel.conveniencias?.toLowerCase() || '';
                return filtros.conveniencias.some(conv =>
                    convenienciasImovel.includes(conv.toLowerCase())
                );
            });
        }

        setImoveisFiltrados(resultado);
    }, [filtros, imoveis]);

    // Handlers para atualizar filtros
    const handleLocalizacao = (e) => {
        setFiltros({ ...filtros, localizacao: e.target.value });
    };

    const handleCheckbox = (categoria, valor) => {
        setFiltros(prev => {
            const lista = prev[categoria];
            const novaLista = lista.includes(valor)
                ? lista.filter(item => item !== valor)
                : [...lista, valor];
            return { ...prev, [categoria]: novaLista };
        });
    };

    const handlePreco = (campo, valor) => {
        setFiltros({ ...filtros, [campo]: valor });
    };

    const limparFiltros = () => {
        setFiltros({
            localizacao: '',
            tipos: [],
            precoMin: '',
            precoMax: '',
            quartos: [],
            banheiros: [],
            vagas: [],
            ambientes: [],
            conveniencias: []
        });
    };

    const formatarPreco = (valor) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    };

    // Componente interno para o Card do Imóvel com lógica de favorito
    const ImovelCard = ({ imovel }) => {
        const [isFavorited, setIsFavorited] = useState(false);

        // Sincroniza o estado do coração com o localStorage
        useEffect(() => {
            if (!imovel?.id) return;
            const favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
            const jaEhFavorito = favoritos.some(fav => fav.id === imovel.id);
            setIsFavorited(jaEhFavorito);
        }, [imovel.id]);

        const handleFavoriteClick = () => {
            const favoritosAtuais = JSON.parse(localStorage.getItem('favoritos') || '[]');
            const imovelIndex = favoritosAtuais.findIndex(fav => fav.id === imovel.id);

            let novosFavoritos;

            if (imovelIndex > -1) {
                // Remove dos favoritos
                novosFavoritos = favoritosAtuais.filter(fav => fav.id !== imovel.id);
                setIsFavorited(false);
            } else {
                // 🔥 CORRIGIDO: Garante que a foto seja salva
                const imovelParaSalvar = {
                    ...imovel,
                    // Se a foto estiver null/undefined, usa a imagem padrão
                    foto: imovel.foto || '/img/luxo.jpg'
                };
                novosFavoritos = [...favoritosAtuais, imovelParaSalvar];
                setIsFavorited(true);
            }

            localStorage.setItem('favoritos', JSON.stringify(novosFavoritos));

            // Dispara um evento para que outras partes da aplicação (como a página de favoritos) possam ouvir
            window.dispatchEvent(new Event('storage'));
        };

        return (
            <div className={styles.heart} onClick={handleFavoriteClick} style={{ cursor: 'pointer', zIndex: 2 }}>
                {isFavorited ? (
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.679 4.6875C16.8751 4.6875 15.0001 8.4375 15.0001 8.4375C15.0001 8.4375 13.1251 4.6875 9.3212 4.6875C6.2298 4.6875 3.78175 7.27383 3.75011 10.36C3.68566 16.766 8.83195 21.3217 14.4728 25.1502C14.6283 25.256 14.812 25.3126 15.0001 25.3126C15.1882 25.3126 15.3719 25.256 15.5275 25.1502C21.1677 21.3217 26.314 16.766 26.2501 10.36C26.2185 7.27383 23.7704 4.6875 20.679 4.6875Z" fill="#DE302A"/></svg>
                ) : (
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.679 4.6875C16.8751 4.6875 15.0001 8.4375 15.0001 8.4375C15.0001 8.4375 13.1251 4.6875 9.3212 4.6875C6.2298 4.6875 3.78175 7.27383 3.75011 10.36C3.68566 16.766 8.83195 21.3217 14.4728 25.1502C14.6283 25.256 14.812 25.3126 15.0001 25.3126C15.1882 25.3126 15.3719 25.256 15.5275 25.1502C21.1677 21.3217 26.314 16.766 26.2501 10.36C26.2185 7.27383 23.7704 4.6875 20.679 4.6875Z" stroke="#DE302A" strokeWidth="1.875" strokeLinecap="round" strokeLinejoin="round"/></svg>
                )}
            </div>
        );
    };

    return (
        <div className={styles.container}>
            <section className={styles.container_filter}>
                {/* Cabeçalho com Filtros */}
                <div className={styles.icon_group}>
                    <h2>Filtros</h2>
                    <Image src={Filter} alt='ícone filtro' />
                </div>

                {/* Botão Limpar Filtros */}
                {(filtros.localizacao || filtros.tipos.length > 0 || filtros.precoMin ||
                    filtros.precoMax || filtros.quartos.length > 0 || filtros.banheiros.length > 0 ||
                    filtros.vagas.length > 0) && (
                        <button
                            onClick={limparFiltros}
                            style={{
                                padding: '8px 16px',
                                background: '#222020ff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                marginBottom: '16px'
                            }}
                        >
                            Limpar Filtros
                        </button>
                    )}

                {/* Localização */}
                <div className={styles.container_group}>
                    <h3>Localização</h3>
                    <div className={styles.location_group}>
                        <Image src={Local} alt='ícone localização' className={styles.icon} />
                        <input
                            type='text'
                            placeholder='Digite bairro, cidade...'
                            value={filtros.localizacao}
                            onChange={handleLocalizacao}
                        />
                    </div>
                </div>

                {/* Tipos de imóveis */}
                <div className={styles.container_group}>
                    <h3>Tipos de Imóveis</h3>
                    <div className={styles.container_grid}>
                        {['Casa', 'Apartamento', 'Cobertura', 'Loft', 'Sítio', 'Flat'].map(tipo => (
                            <div className={styles.select} key={tipo}>
                                <input
                                    type='checkbox'
                                    id={`tipo-${tipo}`}
                                    checked={filtros.tipos.includes(tipo)}
                                    onChange={() => handleCheckbox('tipos', tipo)}
                                />
                                <label htmlFor={`tipo-${tipo}`}>{tipo}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Preço */}
                <div className={styles.container_price}>
                    <div className={styles.container_group}>
                        <h3>Preço à partir de</h3>
                        <input
                            type='number'
                            placeholder='R$ 0.00'
                            value={filtros.precoMin}
                            onChange={(e) => handlePreco('precoMin', e.target.value)}
                        />
                    </div>

                    <div className={styles.container_group}>
                        <h3>Até</h3>
                        <input
                            type='number'
                            placeholder='R$ 0.00'
                            value={filtros.precoMax}
                            onChange={(e) => handlePreco('precoMax', e.target.value)}
                        />
                    </div>
                </div>

                {/* Quartos */}
                <div className={styles.container_group}>
                    <h3>Quartos</h3>
                    <div className={styles.container_number}>
                        {[1, 2, 3, 4, 5].map(num => (
                            <div className={styles.select_number} key={num}>
                                <input
                                    type='checkbox'
                                    id={`quartos-${num}`}
                                    checked={filtros.quartos.includes(num)}
                                    onChange={() => handleCheckbox('quartos', num)}
                                />
                                <label htmlFor={`quartos-${num}`}>+{num}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Banheiros */}
                <div className={styles.container_group}>
                    <h3>Banheiros</h3>
                    <div className={styles.container_number}>
                        {[1, 2, 3, 4, 5].map(num => (
                            <div className={styles.select_number} key={num}>
                                <input
                                    type='checkbox'
                                    id={`banheiros-${num}`}
                                    checked={filtros.banheiros.includes(num)}
                                    onChange={() => handleCheckbox('banheiros', num)}
                                />
                                <label htmlFor={`banheiros-${num}`}>+{num}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Vagas */}
                <div className={styles.container_group}>
                    <h3>Vagas</h3>
                    <div className={styles.container_number}>
                        {[1, 2, 3, 4, 5].map(num => (
                            <div className={styles.select_number} key={num}>
                                <input
                                    type='checkbox'
                                    id={`vagas-${num}`}
                                    checked={filtros.vagas.includes(num)}
                                    onChange={() => handleCheckbox('vagas', num)}
                                />
                                <label htmlFor={`vagas-${num}`}>+{num}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Ambientes */}
                <div className={styles.container_group}>
                    <h3>Ambientes</h3>
                    <div className={styles.container_grid}>
                        {[
                            'Área de Serviços', 
                            'Área Gourmet',
                            'Closet', 
                            'Escritório', 
                            'Jardim', 
                            'Lavanderia', 
                            'Piscina', 
                            'Quintal',
                            'Sala integrada',
                            
                        ].map(amb => (
                            <div className={styles.select} key={amb}>
                                <input
                                    type='checkbox'
                                    id={`amb-${amb}`}
                                    checked={filtros.ambientes.includes(amb)}
                                    onChange={() => handleCheckbox('ambientes', amb)}
                                />
                                <label htmlFor={`amb-${amb}`}>{amb}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Conveniências */}
                <div className={styles.container_group}>
                    <h3>Conveniências</h3>
                    <div className={styles.container_grid}>
                        {[
                            'Academia', 
                            'Ar-condicionado',
                            'Armários Planejados', 
                            'Hidromassagem', 
                            'Mobiliado',
                            'Segurança 24h'
                        ].map(conv => (
                            <div className={styles.select} key={conv}>
                                <input
                                    type='checkbox'
                                    id={`conv-${conv}`}
                                    checked={filtros.conveniencias.includes(conv)}
                                    onChange={() => handleCheckbox('conveniencias', conv)}
                                />
                                <label htmlFor={`conv-${conv}`}>{conv}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lista de Imóveis */}
            <section className={styles.container_house}>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '40px', width: '100%' }}>
                        <p>Carregando imóveis...</p>
                    </div>
                ) : imoveisFiltrados.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', width: '100%' }}>
                        <p>Nenhum imóvel encontrado com os filtros selecionados.</p>
                    </div>
                ) : (
                    imoveisFiltrados.map(imovel => (
                        <div className={styles.container_home} key={imovel.id}>
                            <img
                                src={imovel.foto || '/img/luxo.jpg'}
                                alt={imovel.titulo}
                                className={styles.image}
                            />
                            <div className={styles.card_content}>
                                <ImovelCard imovel={imovel} />
                                <div className={styles.info_group}>
                                    <h2>{imovel.titulo}</h2>
                                    <div>
                                        <p>{imovel.localizacao}</p>
                                    </div>

                                    <div className={styles.info_icon}>
                                        <div className={styles.info}>
                                            <Image src={Area} alt='área m²' />
                                            <p><b>{imovel.metrosQuadrados}</b>m²</p>
                                        </div>

                                        <div className={styles.info}>
                                            <Image src={Bedroom} alt='quartos' />
                                            <p><b>{imovel.quartos}</b></p>
                                        </div>

                                        <div className={styles.info}>
                                            <Image src={Bathroom} alt='banheiros' />
                                            <p><b>{imovel.banheiros}</b></p>
                                        </div>

                                        <div className={styles.info}>
                                            <Image src={Car} alt='vagas' />
                                            <p><b>{imovel.garagens}</b></p>
                                        </div>
                                    </div>

                                    <div className={styles.home_price}>
                                        <div>
                                            <h2>{formatarPreco(imovel.valor)}</h2>
                                            <h5>IPTU: {formatarPreco(imovel.iptu)}</h5>
                                        </div>
                                        <Link href={`/imovelCasa/${imovel.id}`}>
                                            <button className={styles.more}>Ver mais</button>
                                        </Link>

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </section>
        </div>
    );
}