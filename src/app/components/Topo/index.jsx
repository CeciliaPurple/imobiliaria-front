"use client"; // se estiver em /app do Next.js
import styles from './Topo.module.css';
import Logo from '../../../../public/villa-logo-nome.png';
import Heart from '../../../../public/icons/heart-outline.svg';
import Settings from '../../../../public/icons/settings.png';
import User from '../../../../public/icons/person-circle-outline.svg';
import Link from 'next/link';
import { useAuthStore } from "@/stores/userStore";
import Image from 'next/image';

export default function Topo() {

    const { user ,isLoggedIn } = useAuthStore();

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
               {user?.tipo === 'adm' ? <Link href="/agendamento" className={styles.nav_link}>Visitas Agendadas</Link> : <Link href="/agendar" className={styles.nav_link}>Agendar Visita</Link>}
            </div>

            <div className={styles.container_icons}>
                
                { user?.tipo === 'adm' ? <Link href="/perfiladm"><Image className={styles.setting} src={Settings} alt="Setting" /></Link> : <Link href="/favoritos"><Image src={Heart} alt="favoritos" /></Link>}

                {isLoggedIn ?(
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
