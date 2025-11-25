"use client"; // necessário para usar useState


import styles from './login.module.css'
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import Link from 'next/link'
import { useAuthStore } from '../../stores/userStore';
import { showSuccessToast, showErrorToast } from '../../utils/toast';
import Logo from '../../../public/villa-logo-nome.png';
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { login } = useAuthStore();


    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:3100/usuario/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha }),
        });

        const data = await response.json();

        if (response.ok) {
            showSuccessToast("Login realizado com sucesso!");
            login({ id: data.id, email: data.email, tipo: data.tipo }, data.token);
            router.push("/");

        } else {
            showErrorToast(data.error || "Email ou Senha incorreto ");
        }
    };

    return (
        <div className={styles.back}>
            <div className={styles.container}>
                <Link href="/"><Image src={Logo} alt='logo' className={styles.logo} /></Link>

                <h1 className={styles.title}>Login</h1>

                <form className={styles.input_container} onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <div className={styles.password_container}>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            autoComplete="current-password"
                            required
                        />
                        <span
                            className={styles.eye_icon}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    <button type="submit">Entrar</button>
                </form>

                <p>Não possui uma conta? <Link href="/cadastro" className={styles.link}><b>Clique aqui!</b></Link></p>
            </div>
        </div>
    )
}