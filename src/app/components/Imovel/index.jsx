"use client";

import { useState, useEffect } from 'react';
import styles from './Imovel.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Area from '../../../../public/icons/home-outline.svg';
import Bedroom from '../../../../public/icons/bed-outline.svg';
import Bathroom from '../../../../public/icons/water-outline.svg';
import Car from '../../../../public/icons/car-outline.svg';
import Location from '../../../../public/icons/location-outline.svg';
import Casa1 from "/public/img/casaModerna.jpg";

export default function Imovel({ id, imagemSrc, titulo, area, bed, bath, car, location, city, price }) {
    const [isFavorited, setIsFavorited] = useState(false);

    // 👉 Função para formatar preço no padrão do Brasil
    const formatarPreco = (valor) => {
        if (!valor) return "0,00";
        return Number(valor).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    };

    useEffect(() => {
        const favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
        const jaEhFavorito = favoritos.some(fav => fav.id === id);
        setIsFavorited(jaEhFavorito);
    }, [id]);

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        e.preventDefault();

        const favoritosAtuais = JSON.parse(localStorage.getItem('favoritos') || '[]');
        const imovelIndex = favoritosAtuais.findIndex(fav => fav.id === id);

        let novosFavoritos;

        if (imovelIndex > -1) {
            novosFavoritos = favoritosAtuais.filter(fav => fav.id !== id);
            setIsFavorited(false);
        } else {
            const imovelParaAdicionar = { id, imagemSrc, titulo, area, bed, bath, car, location, city, price };
            novosFavoritos = [...favoritosAtuais, imovelParaAdicionar];
            setIsFavorited(true);
        }

        localStorage.setItem('favoritos', JSON.stringify(novosFavoritos));
    };

    return (
        <div className={styles.container_home}>
            <div className={styles.image_container}>
                <Image
                    src={imagemSrc || Casa1}
                    alt={titulo || 'Imóvel'}
                    className={styles.background_image}
                    width={400}
                    height={225}
                />
                <div className={styles.gradient}></div>
                <div className={styles.image_content}>
                    <h3>{titulo || 'Sinta-se em um resort'}</h3>
                    <div onClick={handleFavoriteClick} className={styles.heart}>
                        {isFavorited ? (
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.679 4.6875C16.8751 4.6875 15.0001 8.4375 15.0001 8.4375C15.0001 8.4375 13.1251 4.6875 9.3212 4.6875C6.2298 4.6875 3.78175 7.27383 3.75011 10.36C3.68566 16.766 8.83195 21.3217 14.4728 25.1502C14.6283 25.256 14.812 25.3126 15.0001 25.3126C15.1882 25.3126 15.3719 25.256 15.5275 25.1502C21.1677 21.3217 26.314 16.766 26.2501 10.36C26.2185 7.27383 23.7704 4.6875 20.679 4.6875Z" fill="#DE302A"/>
                            </svg>
                        ) : (
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.679 4.6875C16.8751 4.6875 15.0001 8.4375 15.0001 8.4375C15.0001 8.4375 13.1251 4.6875 9.3212 4.6875C6.2298 4.6875 3.78175 7.27383 3.75011 10.36C3.68566 16.766 8.83195 21.3217 14.4728 25.1502C14.6283 25.256 14.812 25.3126 15.0001 25.3126C15.1882 25.3126 15.3719 25.256 15.5275 25.1502C21.1677 21.3217 26.314 16.766 26.2501 10.36C26.2185 7.27383 23.7704 4.6875 20.679 4.6875Z" stroke="#F2F1F6" strokeWidth="1.875" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.info_home}>
                <div className={styles.info_group}>
                    <div className={styles.info}>
                        <Image src={Area} alt='área m²' />
                        <p><b>{area || 178}</b>m²</p>
                    </div>

                    <div className={styles.info}>
                        <Image src={Bedroom} alt='quartos' />
                        <p><b>{bed || 4}</b></p>
                    </div>

                    <div className={styles.info}>
                        <Image src={Bathroom} alt='banheiros' />
                        <p><b>{bath || 2}</b></p>
                    </div>

                    <div className={styles.info}>
                        <Image src={Car} alt='vagas' />
                        <p><b>{car || 2}</b></p>
                    </div>
                </div>

                <div className={styles.location}>
                    <Image src={Location} alt='localização' />
                    <div>
                        <p><b>{location || "Rua João Maetini - barravelha"}</b></p>
                    </div>
                </div>

                <div className={styles.price}>
                    {/* 👉 Preço agora está formatado como dinheiro brasileiro */}
                    <h3>{formatarPreco(price || 2596000)}</h3>

                    <Link href={`/imovelCasa/${id}`}>
                        <button className={styles.more}>Ver mais</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
