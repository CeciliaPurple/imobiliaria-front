"use client";

import styles from './perfil.module.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../../public/villa-logo-nome.png';
import { useState, useEffect } from "react";
import { useAuthStore } from "@/stores/userStore";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Perfil() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { logout, token, user, isLoggedIn } = useAuthStore();

  // ✅ Buscar dados do usuário
  useEffect(() => {
    if (!isLoggedIn || !token || !user?.id) {
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
        if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);
        return res.json();
      })
      .then(data => {
        const usuario = data.profile || data.usuario || data.data || data;
        setNome(usuario.nome || "");
        setEmail(usuario.email || "");
        setLoading(false);
      })
      .catch(err => {
        console.error("❌ Erro ao buscar usuário:", err);
        toast.error("Erro ao carregar dados do perfil ❌", {
          position: "top-center",
          autoClose: 4000,
          closeButton: false,
          hideProgressBar: false,
          theme: "colored",
          transition: Bounce,
        });
        setLoading(false);
      });
  }, [token, user, isLoggedIn, router]);

  // ✅ Atualizar usuário
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      toast.error("Erro: usuário não identificado ❌", {
        position: "top-center",
        closeButton: false,
        theme: "colored",
      });
      return;
    }

    try {
      const bodyData = { nome, email };
      if (senha.trim()) bodyData.senha = senha;

      const res = await fetch(`http://localhost:3100/usuario/${user.id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Erro ao atualizar");
      }

      toast.success("Dados atualizados com sucesso! ✅", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeButton: false,
        pauseOnHover: true,
        theme: "light",
        transition: Bounce,
      });

      setSenha("");
    } catch (err) {
      console.error('❌ Erro ao atualizar:', err);
      toast.error("Erro ao atualizar usuário ❌", {
        position: "top-center",
        closeButton: false,
        theme: "colored",
      });
    }
  };

  // ✅ Excluir usuário
  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita!")) return;

    try {
      const res = await fetch(`http://localhost:3100/usuario/${user.id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Erro ao excluir usuário");
      }

      logout();
      toast.success("Conta excluída com sucesso! 🗑️", {
        position: "top-center",
        autoClose: 4000,
        closeButton: false,
        theme: "light",
        transition: Bounce,
      });

      setTimeout(() => router.push("/"), 1500);
    } catch (err) {
      console.error('❌ Erro ao excluir:', err);
      toast.error("Erro ao excluir usuário ❌", {
        position: "top-center",
        closeButton: false,
        theme: "colored",
      });
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    logout();
    toast.info("Logout realizado! 👋", {
      position: "top-center",
      autoClose: 2000,
      closeButton: false,
      theme: "light",
      transition: Bounce,
    });
    setTimeout(() => router.push("/login"), 1500);
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
            placeholder='Nova senha '
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
