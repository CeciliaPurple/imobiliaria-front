"use client";

import styles from './perfil.module.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../../public/villa-logo-nome.png';
import { useState, useEffect } from "react";
import { useAuthStore } from "@/stores/userStore";

export default function Perfil() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const { logout, token, user, isLoggedIn } = useAuthStore();

    // ✅ Pegar dados do usuário ao carregar a página
    useEffect(() => {
       

        if (!isLoggedIn || !token || !user?.id) {
            console.log("❌ Usuário não autenticado - redirecionando para login");
            router.push("/login");
            return;
        }

        fetch(`http://localhost:3100/usuario/${user.id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Erro HTTP: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                console.log("✅ Resposta completa da API:", data);
                
           
                const usuario = data.profile || data.usuario || data.data || data;
                
                
                setNome(usuario.nome || "");
                setEmail(usuario.email || "");
                setLoading(false);
            })
            .catch(err => {
                console.error("❌ Erro ao buscar usuário:", err);
                alert("Erro ao carregar dados do perfil. Verifique o console.");
                setLoading(false);
            });
    }, [token, user, isLoggedIn, router]);


    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!userId) {
            alert("Erro: usuário não identificado");
            return;
        }

        try {
            const bodyData = { nome, email };
            
            // Só envia senha se foi preenchida
            if (senha && senha.trim() !== "") {
                bodyData.senha = senha;
            }

            const res = await fetch(`http://localhost:3100/usuario/${userId}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bodyData),
            });

            if (!res.ok) throw new Error("Erro ao atualizar");

            alert("Dados atualizados com sucesso!");
            setSenha("");
        } catch (err) {
            console.error(err);
            alert("Erro ao atualizar usuário");
        }
    };

    // ✅ Excluir usuário
    const handleDelete = async () => {
        if (!confirm("Tem certeza que deseja excluir sua conta?")) return;

        if (!userId) {
            alert("Erro: usuário não identificado");
            return;
        }

        try {
            const res = await fetch(`http://localhost:3100/usuario/${userId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) throw new Error("Erro ao excluir usuário");

            logout();
            alert("Conta excluída com sucesso!");
            router.push("/");
        } catch (err) {
            console.error(err);
            alert("Erro ao excluir usuário");
        }
    };

    // ✅ Logout
    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    if (loading) {
        return (
            <div className={styles.back}>
                <div className={styles.container}>
                    <p>Carregando...</p>
                </div>
            </div>
        );
    }

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
                        placeholder='Nova senha (deixe em branco para manter)'
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />

                    <button className={styles.atualizar} type='submit'>Atualizar</button>
                    <button className={styles.excluir} type='button' onClick={handleDelete}>Excluir</button>
                    <button className={styles.logout} type='button' onClick={handleLogout}>Sair</button>
                </form>
            </div>
        </div>
    );
}