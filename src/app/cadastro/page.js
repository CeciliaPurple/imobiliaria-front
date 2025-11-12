"use client"; // necessário para usar useState

import styles from './cadastro.module.css'
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
      toast.success('Cadastro realizado com sucesso! ✅', {
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
      toast.error(data.error || "Erro ao cadastrar", {
        position: "top-center",
        theme: "colored",
      });
    }
  };

  return (
    <div className={styles.back}>
      <div className={styles.container}>
        <Link href="/" >
          <Image src={Logo} alt='logo' className={styles.logo} />
        </Link>

<<<<<<< HEAD
        <h1 className={styles.title}>Cadastro</h1>

        <form className={styles.input_container} onSubmit={handleSubmit}>
=======
<<<<<<< HEAD
        <form className={styles.input_conatiner} onSubmit={handleSubmit}>
>>>>>>> 6a84eeef721016b2eb5abf201b3e025008fc2f0d
          <input
            type='text'
            placeholder='Nome de usuário'
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
=======
                <h1 className={styles.title}>Cadastro</h1>

                <form className={styles.input_container} onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='Nome de usuário'
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required />
>>>>>>> dev

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
            autoComplete='new-password'
            required
          />

          <button type='submit'>Cadastrar</button>
        </form>

        <p>Já possui uma conta? <Link href="/login" className={styles.link}><b>Entre aqui!</b></Link></p>
        {/* ✅ Exibe os toasts (caso o RootLayout não tenha) */}
        <ToastContainer />
      </div>
    </div>
  );
}
