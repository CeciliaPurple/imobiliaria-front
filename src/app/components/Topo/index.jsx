import styles from './Topo.module.css';
import Logo from '../../../../public/villa-logo-nome.png';
import Heart from '../../../../public/icons/heart-outline.svg';
import User from '../../../../public/icons/person-circle-outline.svg';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from "framer-motion";

export default function Topo() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={styles.container}
        >
            <Image className={styles.logo} src={Logo} alt='logo' />

            <div className={styles.nav}>
                <Link href="/" className={styles.nav_link}>Imóveis</Link>
                <Link href="/" className={styles.nav_link}>Sobre</Link>
                <Link href="/" className={styles.nav_link}>Minhas Visitas</Link>
            </div>

            <div className={styles.container_icons}>
                <Link href="/"><Image src={Heart} alt='favoritos' /></Link>
                <Link href="/cadastro"><button type='submit'>Login</button></Link>
                {/* <Link href="/cadastro"><Image src={User} alt='perfil' /></Link> */}
            </div>
        </motion.div>
    );
}
