"use client"; // se estiver em /app do Next.js

import { useState, useEffect } from "react";
import styles from './Topo.module.css';
import Logo from '../../../../public/villa-logo-nome.png';
import Heart from '../../../../public/icons/heart-outline.svg';
import User from '../../../../public/icons/person-circle-outline.svg';
import Link from 'next/link';
import Image from 'next/image';

export default function Topo() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Checa no localStorage se o usuário está logado
        const token = localStorage.getItem("token"); // ou outro nome que você use
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <div
            className={styles.container}
        >
            <Link href="/">
                <Image className={styles.logo} src={Logo} alt="logo" />
            </Link>

            <div className={styles.nav}>
                <Link href="/filtro" className={styles.nav_link}>Imóveis</Link>
                <Link href="/#sobre" className={styles.nav_link}>Sobre</Link>
                <Link href="/visita" className={styles.nav_link}>Minhas Visitas</Link>
            </div>

            <div className={styles.container_icons}>
                <Link href="/"><Image src={Heart} alt="favoritos" /></Link>

                {isLoggedIn ? (
                    <Link href="/perfil">
                        <Image src={User} alt="perfil" />
                    </Link>
                ) : (
                    <Link href="/cadastro">
                        <button type="button">Login</button>
                    </Link>
                )}
            </div>
        </div>
    );
}
