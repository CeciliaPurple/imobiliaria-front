"use client"; // necessário para usar useState


import styles from './login.module.css'
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../../public/villa-logo-nome.png';
import { useState } from "react";

export default function Login() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:3001/usuario/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Login realizado com sucesso!");
            localStorage.setItem("token", data.token);
            router.push("/"); // ✅ redireciona para a página Home

        } else {
            alert(data.error || "Email ou Senha incorreto ");
        }
    };

    return (
        <div className={styles.back}>
            <div className={styles.container}>
                <Link href="/"><Image src={Logo} alt='logo' className={styles.logo}/></Link>

                <form className={styles.input_conatiner} onSubmit={handleSubmit}>

                    <input
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />

                    <input
                        type='password'
                        placeholder='Senha'
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required />

                    <button type='submit'>Entrar</button>
                </form>



                <p>Nâo possui uma conta? <Link href="/cadastro" className={styles.link}><b>Clique aqui!</b></Link></p>
            </div>
        </div>
    )
}