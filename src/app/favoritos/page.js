"use client";

import { useState, useEffect } from 'react';
import styles from './favoritos.module.css'
import Imovel from '../components/Imovel'

export default function Favoritos() {
    const [favoritos, setFavoritos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavoritos = () => {
            try {
                // Pega os objetos completos dos imóveis do localStorage
                const favoritosStorage = JSON.parse(localStorage.getItem('favoritos') || '[]');
                
                console.log('📦 Favoritos carregados:', favoritosStorage);
                
                setFavoritos(favoritosStorage);
            } catch (error) {
                console.error("❌ Erro ao carregar favoritos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFavoritos();

        // Recarrega favoritos quando o localStorage muda
        const handleStorageChange = (event) => {
            if (event.key === 'favoritos') {
                fetchFavoritos();
            }
        };

        const handleFocus = () => fetchFavoritos();

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('focus', handleFocus);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('focus', handleFocus);
        };
    }, []);

    return (
        <div className={styles.container_fave}>
             <h2>Favoritos</h2>

             {loading ? (
                <p>Carregando favoritos...</p>
             ) : favoritos.length > 0 ? (
                <div className={styles.container_imoveis}>
                    {favoritos.map((imovel) => (
                        <Imovel 
                            key={imovel.id} 
                            id={imovel.id}
                            imagemSrc={imovel.imagemSrc}
                            titulo={imovel.titulo}
                            area={imovel.area}
                            bed={imovel.bed}
                            bath={imovel.bath}
                            car={imovel.car}
                            location={imovel.location}
                            city={imovel.city}
                            price={imovel.price}
                        />
                    ))}
                </div>
             ) : (
                <p>Você ainda não adicionou nenhum imóvel aos favoritos.</p>
             )}
        </div>
    )
}