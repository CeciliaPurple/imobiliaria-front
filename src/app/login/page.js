"use client";

import styles from './login.module.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAuthStore } from '../../stores/userStore';
import { showSuccessToast, showErrorToast } from '../../utils/toast';
import Logo from '../../../public/villa-logo-nome.png';
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState("");
  const router = useRouter();
  const { login } = useAuthStore();

  useEffect(() => {
    let dotInterval;

    if (loading) {
      dotInterval = setInterval(() => {
        setDots((prev) => (prev.length < 3 ? prev + "." : ""));
      }, 400); // Animação suave dos pontos
    } else {
      setDots(""); // Reseta os pontos quando não está loading
    }

    return () => {
      if (dotInterval) clearInterval(dotInterval);
    };
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Delay mínimo para garantir que o usuário veja o loading
    const minLoadingTime = new Promise(resolve => setTimeout(resolve, 800));

    try {
      const response = await fetch("http://localhost:3100/usuario/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      // Aguarda o tempo mínimo de loading
      await minLoadingTime;

      if (response.ok) {
        // Verifica se os dados essenciais existem
        if (!data.token || !data.id) {
          throw new Error("Resposta do servidor incompleta");
        }

        // Calcula tempo de expiração do token (24 horas por padrão)
        const expiryTime = Date.now() + (24 * 60 * 60 * 1000); // 24 horas
        
        // Salva o token e tempo de expiração no localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('tokenExpiry', expiryTime.toString());

        // Salva o usuário no Zustand
        login({ 
          id: data.id, 
          nome: data.nome || data.email.split('@')[0], // Usa parte do email se nome não existir
          email: data.email, 
          tipo: data.tipo 
        }, data.token);

        // Mensagem de boas-vindas com o nome do usuário
        const nomeUsuario = data.nome || data.email.split('@')[0];
        showSuccessToast(`🎉 Bem-vindo(a), ${nomeUsuario}!`);

        // Aguarda 2 segundos antes de redirecionar
        setTimeout(() => {
          router.push("/");
        }, 2000);

      } else {
        showErrorToast(data.error || "❌ Email ou senha incorretos");
      }
    } catch (error) {
      console.error("Falha ao fazer login:", error);
      showErrorToast("❌ Ocorreu um erro ao tentar fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

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
        <Link href="/">
          <Image src={Logo} alt='logo' className={styles.logo} />
        </Link>

        <h1 className={styles.title}>Login</h1>

        <form className={styles.input_container} onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />

          <div className={styles.password_container}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoComplete="current-password"
              required
              disabled={loading}
            />
            <span
              className={styles.eye_icon}
              onClick={() => !loading && setShowPassword(!showPassword)}
              style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? `Entrando${dots}` : "Entrar"}
          </button>
        </form>

        <p>
          Não possui uma conta?{" "}
          <Link href="/cadastro" className={styles.link}>
            <b>Clique aqui!</b>
          </Link>
        </p>
      </div>
    </div>
  );
}