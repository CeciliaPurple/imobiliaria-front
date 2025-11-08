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
import Heart from '../../../public/icons/heart-outline.svg';

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
                        {['Área de Serviços', 'Closet', 'Escritório', 'Jardim', 'Lavanderia', 'Piscina', 'Quintal'].map(amb => (
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
                        {['Ar-condicionado', 'Armários Planejados', 'Hidromassagem', 'Mobiliado'].map(conv => (
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
                            <div>
                                <Image src={Heart} alt='favoritar' className={styles.heart} />

                                <div className={styles.info_group}>
                                    <h2>{imovel.titulo}</h2>

                                    <div>
                                        <h3>{imovel.localizacao}</h3>
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