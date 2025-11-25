import styles from './ImovelP.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Heart from '../../../../public/icons/white-heart-outline.svg';
import Area from '../../../../public/icons/home-outline.svg';
import Bedroom from '../../../../public/icons/bed-outline.svg';
import Bathroom from '../../../../public/icons/water-outline.svg';
import Car from '../../../../public/icons/car-outline.svg';
import Location from '../../../../public/icons/location-outline.svg';

export default function ImovelP({ imovel }) {
    if (!imovel) {
        return (
            <div className={styles.container_home}>
                <p>Carregando imóvel...</p>
            </div>
        );
    }

    return (
        <div className={styles.container_home}>
            <div className={styles.image_container}>
                {/* Imagem de fundo */}
                <Image 
                    src={imovel.foto} 
                    alt={imovel.titulo} 
                    fill
                    style={{ objectFit: 'cover', zIndex: 0 }}
                    sizes="320px"
                />
                
                {/* Gradiente escuro */}
                <div className={styles.gradient}></div>
                
                {/* Título */}
                <h3>{imovel.titulo}</h3>
                
            </div>

            <div className={styles.info_home}>
                <div className={styles.info_group}>
                    <div className={styles.info}>
                        <Image src={Area} alt='área m²' />
                        <p><b>{imovel.metrosQuadrados}</b>m²</p>
                    </div>

                    <div className={styles.info}>
                        <Image src={Bedroom} alt='quartos' />
                        <p><b>{imovel.quartos}</b></p>
                    </div>

                    <div className={styles.info}>
                        <Image src={Bathroom} alt='banheiros' />
                        <p><b>{imovel.banheiros}</b></p>
                    </div>

                    <div className={styles.info}>
                        <Image src={Car} alt='vagas' />
                        <p><b>{imovel.garagens}</b></p>
                    </div>
                </div>

                {/*Localização*/}
                <div className={styles.location}>
                    <Image src={Location} alt='localização' />
                    <div>
                        <p><b>{imovel.localizacao}</b></p>
                    </div>
                </div>

                {/*Preço e Ver mais*/}
                <div className={styles.price}>
                    <h3>R$ {Number(imovel.valor).toLocaleString('pt-BR')}</h3>
                    <Link href={`/imovelCasa/${imovel.id}`}>
                        <button className={styles.more}>Ver mais</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}