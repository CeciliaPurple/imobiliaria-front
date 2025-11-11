"use client";

import { useState, useEffect } from 'react';
import styles from './favoritos.module.css'
import Imovel from '../components/Imovel'

export default function Favoritos() {
    const [favoritos, setFavoritos] = useState([]);

    useEffect(() => {
        // Busca os favoritos do localStorage quando o componente é montado.
        const imoveisFavoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
        setFavoritos(imoveisFavoritos);
    }, []);

    return (
        <div className={styles.container_fave}>
             <h2>Favoritos</h2>

             {favoritos.length > 0 ? (
                <div className={styles.container_imoveis}>
                    {favoritos.map((imovel) => (
                        // Assumindo que o componente Imovel recebe os dados via props
                        // e que cada imovel tem um 'id' único.
                        <Imovel key={imovel.id} {...imovel} />
                    ))}
                </div>
             ) : (
                <p>Você ainda não adicionou nenhum imóvel aos favoritos.</p>
             )}
        </div>
    )
}