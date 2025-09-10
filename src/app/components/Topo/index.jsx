import styles from './Topo.module.css';
import Logo from '../../../../public/villa-logo-nome.png';
import Link from 'next/link';
import Image from 'next/image';

export default function Topo() {
    return (
        <div className={styles.container}>
            <Image className={styles.logo} src={Logo} alt='logo'/>

            <div className={styles.nav}>
                <Link href="/" className={styles.nav_link}>Imóveis</Link>
                <Link href="/" className={styles.nav_link}>Sobre</Link>
                <Link href="/" className={styles.nav_link}>Minhas Visitas</Link>
            </div>
            <div className={styles.container_icons}>
                <div className={styles.icon}></div>
                <div className={styles.icon}></div>
            </div>
        </div>
    )
}