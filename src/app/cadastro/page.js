"use client"; // necessário para usar useState


import styles from './cadastro.module.css'
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../../public/villa-logo-nome.png';
import { useState } from "react";

export default function Cadastro() {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:3100/usuario", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, email, senha }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Cadastro realizado com sucesso!");
            router.push("/login"); // ✅ redireciona para a página de login

        } else {
            alert(data.error || "Erro ao cadastrar");
        }
    };

    return (
        <div className={styles.back}>
            <div className={styles.container}>
                <Link href="/" >
                    <Image src={Logo} alt='logo' className={styles.logo} />
                </Link>

                <form className={styles.input_conatiner} onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='Nome de usuário'
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required />

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

                    <button type='submit'>Cadastrar</button>
                </form>



                <p>Já possui uma conta? <Link href="/login" className={styles.link}><b>Entre aqui!</b></Link></p>
            </div>
        </div>
    )
}