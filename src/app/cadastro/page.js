import styles from './cadastro.module.css'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../../public/villa-logo-nome.PNG';

export default function Cadastro() {
    return (
        <div className={styles.back}>
            <div className={styles.container}>
                <Image src={Logo} alt='logo' className={styles.logo} />

                <div className={styles.input_conatiner}>
                    <input type='text' placeholder='Nome de usuário'></input>
                    <input type='email' placeholder='Email'></input>
                    <input type='password' placeholder='Senha'></input>
                </div>

                <button>Cadastrar</button>

                <p>Já possui uma conta? <Link href="/" className={styles.link}><b>Entre aqui!</b></Link></p>
            </div>
        </div>
    )
}