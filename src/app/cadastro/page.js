"use client";

import styles from './cadastro.module.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import Logo from '../../../public/villa-logo-nome.png';
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState("");
  const router = useRouter();

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
      const response = await fetch("http://localhost:3100/usuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await response.json();

      // Aguarda o tempo mínimo de loading
      await minLoadingTime;

      if (response.ok) {
        toast.success('✅ Cadastro realizado com sucesso!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          closeButton: false,
          theme: "dark",
          transition: Bounce,
        });

        // espera um pequeno tempo antes de redirecionar (para mostrar o toast)
        setTimeout(() => router.push("/login"), 1500);

      } else {
        toast.error(data.error || "❌ Erro ao cadastrar", {
          position: "top-center",
          theme: "colored",
        });
      }
    } catch (err) {
      toast.error("❌ Erro de conexão. Tente novamente.", {
        position: "top-center",
        theme: "colored",
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.back}>
      <div className={styles.container}>
        <Link href="/">
          <Image src={Logo} alt='logo' className={styles.logo} width={240} height={64} />
        </Link>

        <h1 className={styles.title}>Cadastro</h1>

        <form className={styles.input_container} onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Nome de usuário'
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            disabled={loading}
          />

          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />

          <div className={styles.password_container}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder='Senha'
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoComplete='new-password'
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

          <button type='submit' disabled={loading}>
            {loading ? `Cadastrando${dots}` : "Cadastrar"}
          </button>
        </form>

        <p>Já possui uma conta? <Link href="/login" className={styles.link}><b>Entre aqui!</b></Link></p>
        
        <ToastContainer />
      </div>
    </div>
  );
}