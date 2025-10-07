"use client";

import Link from "next/link";
import styles from "./pefil.module.css";
import heart from '../../../public/icons/heart-outline.svg';
import Image from 'next/image';
import casa from "../../../public/img/casaModerna.jpg"
import { Edit2, Trash2, Plus } from "lucide-react";

export default function PerfilAdm() {

  return (
    <div className={styles.perfil}>
      <p className={styles.agenda}>Perfil Administrativo</p>

      <div className={styles.container}>

      <Link href="/criarimovel" className={styles.botao}>
          <span className={styles.texto}>Novo Imóvel</span>
          <Plus size={24} color="#000" />
      </Link>


        <p className={styles.listagem}>Listagem Imóveis</p>

        <div className={styles.campo}>
          <input
            id="localizacao"
            type="search"
            placeholder="Buscar Imóvel"
            required
          />
        </div>

        <div className={styles.card}>
          <div className={styles.imageWrapper}>
            <Image src={casa} alt="Sobrado beira mar" className={styles.imagem} />
          </div>
          <div className={styles.info}>
            <p className={styles.titulo}>Sobrado beira mar</p>
            <p className={styles.endereco}>Rua Doutor Arthur da Costa Filho<br />Caraguatatuba - SP</p>
          </div>
          <div className={styles.icons}>
            <Image src={heart} alt="Favoritos" className={styles.heart} />
            <button className={styles.editar}><Edit2 size={24} color="#375A76" /></button>
            <button className={styles.lixeira}><Trash2 size={24} color="#375A76" /></button>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.imageWrapper}>
            <Image src={casa} alt="Sobrado beira mar" className={styles.imagem} />
          </div>
          <div className={styles.info}>
            <p className={styles.titulo}>Sobrado beira mar</p>
            <p className={styles.endereco}>Rua Doutor Arthur da Costa Filho<br />Caraguatatuba - SP</p>
          </div>
          <div className={styles.icons}>
            <Image src={heart} alt="Favoritos" className={styles.heart} />
            <button className={styles.editar}><Edit2 size={24} color="#375A76" /></button>
            <button className={styles.lixeira}><Trash2 size={24} color="#375A76" /></button>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.imageWrapper}>
            <Image src={casa} alt="Sobrado beira mar" className={styles.imagem} />
          </div>
          <div className={styles.info}>
            <p className={styles.titulo}>Sobrado beira mar</p>
            <p className={styles.endereco}>Rua Doutor Arthur da Costa Filho<br />Caraguatatuba - SP</p>
          </div>
          <div className={styles.icons}>
            <Image src={heart} alt="Favoritos" className={styles.heart} />
            <button className={styles.editar}><Edit2 size={24} color="#375A76" /></button>
            <button className={styles.lixeira}><Trash2 size={24} color="#375A76" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
