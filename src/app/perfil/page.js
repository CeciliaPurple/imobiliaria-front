"use client";

import styles from './perfil.module.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../../public/villa-logo-nome.png';
import { useState, useEffect } from "react";

export default function Perfil() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const router = useRouter();
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    // Pegar dados do usuário ao carregar a página
    useEffect(() => {

        if (!token) return;

        const userId = localStorage.getItem("userId");
        if (!userId) return;

        fetch(`http://localhost:3001/usuario/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log("Dados do usuário:", data);
                setNome(data.nome || "");
                setEmail(data.email || "");
                setNome(data.senha || "");
            })
            .catch(err => console.error(err));
    }, [token]);

    // Atualizar usuário
    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3001/usuario/${userId}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nome, email, senha }),
            });

            if (!res.ok) throw new Error("Erro ao atualizar");

            alert("Dados atualizados com sucesso!");
            setSenha(""); // limpa campo senha
        } catch (err) {
            console.error(err);
            alert("Erro ao atualizar usuário");
        }
    };

    // Excluir usuário
    const handleDelete = async () => {
        if (!confirm("Tem certeza que deseja excluir sua conta?")) return;

        try {
            const res = await fetch(`http://localhost:3100/usuario/${userId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) throw new Error("Erro ao excluir usuário");

            localStorage.removeItem("token");
            alert("Conta excluída com sucesso!");
            router.push("/"); // redireciona
        } catch (err) {
            console.error(err);
            alert("Erro ao excluir usuário");
        }
    };

    // Logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    return (
        <div className={styles.back}>
            <div className={styles.container}>
                <Link href="/" >
                    <Image src={Logo} alt='logo' className={styles.logo} />
                </Link>

                <form className={styles.input_conatiner} onSubmit={handleUpdate}>
                    <input
                        type='text'
                        placeholder='Nome de usuário'
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />

                    <input
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type='password'
                        placeholder='Senha'
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />

                    <button className={styles.atualizar} type='submit'>Atualizar</button>
                    <button className={styles.excluir} type='button' onClick={handleDelete}>Excluir</button>
                    <Link href="/" >
                        <button className={styles.logout} type='button' onClick={handleLogout}>Sair</button>
                    </Link>
                </form>
            </div>
        </div>
    );
}
