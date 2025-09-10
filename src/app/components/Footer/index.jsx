import styles from './Footer.module.css';
import Logo from '../../../../public/villa-logo-nome.png';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className={styles.container_footer}>
            <Image src={Logo} alt='logo' className={styles.logo}></Image>
            <div className={styles.list}>
                <p className={styles.title_list}>Navegação</p>
                <p className={styles.text_list}>Imóveis</p>
                <p className={styles.text_list}>Sobre</p>
                <p className={styles.text_list}>Contatos</p>
            </div>

            <div className={styles.list}>
                <p className={styles.title_list}>Imóveis</p>
                <p className={styles.text_list}>Apartamentos</p>
                <p className={styles.text_list}>Casas</p>
                <p className={styles.text_list}>Sobrados</p>
            </div>

            <div className={styles.list}>
                <p className={styles.title_list}>Contatos</p>
                <p className={styles.text_list}>(12) 99000-0000</p>
                <p className={styles.text_list}>(12) 98000-0000</p>
                <p className={styles.text_list}>@villa_indaia</p>
            </div>
        </footer>
    )
}