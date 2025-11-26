"use client";

import styles from './perfil.module.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../../public/villa-logo-nome.png';
import { useState, useEffect } from "react";
import { useAuthStore } from "@/stores/userStore";
import { showErrorToast, showSuccessToast, showInfoToast } from "@/utils/toast";
import ConfirmationDialog from '../components/Confirmation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Perfil() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(true);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const router = useRouter();
  const { logout, token, user, isLoggedIn } = useAuthStore();

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
        if (!res.ok) {
          throw new Error(`Erro HTTP: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        const usuario = data.profile || data.usuario || data.data || data;

        setNome(usuario.nome || "");
        setEmail(usuario.email || "");
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao buscar usuário:", err);
        showErrorToast("Erro ao carregar dados do perfil. Verifique o console.");
        setLoading(false);
      });
  }, [token, user, isLoggedIn, router]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      showErrorToast("Erro: usuário não identificado");
      return;
    }

    try {
      const bodyData = { nome, email };

      if (senha && senha.trim() !== "") {
        bodyData.senha = senha;
      }

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

      showSuccessToast(" Dados atualizados com sucesso!");
      setSenha("");
    } catch (err) {
      console.error('Erro ao atualizar:', err);
      showErrorToast("❌ Erro ao atualizar usuário: " + err.message);
    }
  };

  const openDeleteConfirmation = () => {
    setIsConfirmingDelete(true);
  };

  const executeDelete = async () => {
    setIsConfirmingDelete(false);

    if (!user?.id) {
      showErrorToast("Erro: usuário não identificado");
      return;
    }

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

      showSuccessToast(" Conta excluída com sucesso!");
      
      
      setTimeout(() => {
        logout();
        router.push("/");
      }, 2000);
    } catch (err) {
      console.error('Erro ao excluir:', err);
      showErrorToast("❌ Erro ao excluir usuário: " + err.message);
    }
  };

  const handleLogout = () => {
    showInfoToast("Logout feito com sucesso. Até logo👋.");
    
    // Aguarda 2 segundos para mostrar a mensagem antes de sair
    setTimeout(() => {
      logout();
      router.push("/login");
    }, 2000);
  };

  if (loading) {
    return (
      <div className={styles.back}>
        <ToastContainer />
        <div className={styles.container}>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.back}>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className={styles.container}>
        <Link href="/" >
          <Image src={Logo} alt='logo' className={styles.logo} />
        </Link>

        <h1 className={styles.title}>Perfil</h1>

        <form className={styles.input_container} onSubmit={handleUpdate}>
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
            placeholder='Nova senha (opcional)'
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <div className={styles.buttonGroup}>
            <button className={styles.atualizar} type='submit'>Atualizar</button>
            <button className={styles.excluir} type='button' onClick={openDeleteConfirmation}>Excluir</button>
          </div>

          <button className={styles.logout} type='button' onClick={handleLogout}>Sair</button>
        </form>
      </div>

      {isConfirmingDelete && (
        <ConfirmationDialog
          message="Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita!"
          onConfirm={executeDelete}
          onCancel={() => setIsConfirmingDelete(false)}
        />
      )}
    </div>
  );
}