import styles from './Footer.module.css';
import Logo from '../../../../public/villa-logo-nome.png';
import Insta from '../../../../public/icons/instagram.svg';
import Twitter from '../../../../public/icons/twitter.svg';
import Whatsapp from '../../../../public/icons/whatsapp.svg';
import Facebook from '../../../../public/icons/facebook.svg';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer({ isVisitaPage }) {
    
    const footerClass = isVisitaPage 
        ? `${styles.footer} ${styles.fixedFooter}`
        : styles.footer;

    return (
        <footer className={footerClass}>
            <div className={styles.container_contact}>
                <Link href='/'><Image src={Logo} alt='logo' className={styles.logo}></Image></Link>
                <div className={styles.list}>
                    <p className={styles.title_list}>Navegação</p>
                    <Link href="/filtro" className={styles.text_listS}>Imóveis</Link>
                    <Link href="/#sobre" className={styles.text_listS}>Sobre</Link>
                    <Link href="/visita" className={styles.text_listS}>Agenda</Link>
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

                {/*Redes Sociais*/}
                <div className={styles.list}>
                    <p className={styles.title_social}>Redes Sociais</p>
                    <div className={styles.list_social}>

                        <Link href="https://www.instagram.com/" className={styles.icon_group} target="_blank">
                            <Image src={Insta} alt='instagram' className={styles.icon} />
                            <p>Instagram</p>
                        </Link>

                        <Link href="https://x.com/?lang=pt" className={styles.icon_group} target="_blank">
                            <Image src={Twitter} alt='twitter' className={styles.icon} />
                            <p>Twitter</p>
                        </Link>

                        <Link href="https://web.whatsapp.com/" className={styles.icon_group} target="_blank">
                            <Image src={Whatsapp} alt='whatsapp' className={styles.icon} />
                            <p>Whatsapp</p>
                        </Link>

                        <Link href="https://www.facebook.com/?locale=pt_BR" className={styles.icon_group} target="_blank">
                            <Image src={Facebook} alt='facebook' className={styles.icon} />
                            <p>Facebook</p>
                        </Link>
                    </div>
                </div>
            </div>

            {/*Copyright*/}
            <p className={styles.copy}>
                &copy;2025 Vila Indaiá. Todos os direitos reservados. | 
                <Link href="/politica-privacidade" className={styles.copy_link}>Política de Privacidade</Link> | 
                <Link href="/termos" className={styles.copy_link}>Termos de Uso</Link>
            </p>
        </footer>
    )
}