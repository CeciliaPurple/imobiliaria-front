import styles from './Imovel.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Heart from '../../../../public/icons/white-heart-outline.svg';
import Area from '../../../../public//icons/home-outline.svg';
import Bedroom from '../../../../public/icons/bed-outline.svg';
import Bathroom from '../../../../public/icons/water-outline.svg';
import Car from '../../../../public/icons/car-outline.svg';
import Location from '../../../../public/icons/location-outline.svg';
import Casa1 from "/public/img/casaModerna.jpg";

export default function Imovel({ imagemSrc, titulo, area, bed, bath, car, location, city, price }) {
    return (  
        <div className={styles.container_home}>
            <div className={styles.image_container}>
                <Image 
                    src={imagemSrc || Casa1} 
                    alt={titulo || 'Imóvel'} 
                    className={styles.background_image}
                    width={400}
                    height={225}
                />
                <div className={styles.gradient}></div>
                <div className={styles.image_content}>
                    <h3>{titulo || 'Sinta-se em um resort'}</h3>
                    <Image src={Heart} alt='favoritar' className={styles.heart} />
                </div>
            </div>

            <div className={styles.info_home}>
                <div className={styles.info_group}>
                    <div className={styles.info}>
                        <Image src={Area} alt='área m²' />
                        <p><b>{area || 178}</b>m²</p>
                    </div>

                    <div className={styles.info}>
                        <Image src={Bedroom} alt='quartos' />
                        <p><b>{bed || 4}</b></p>
                    </div>

                    <div className={styles.info}>
                        <Image src={Bathroom} alt='banheiros' />
                        <p><b>{bath || 2}</b></p>
                    </div>

                    <div className={styles.info}>
                        <Image src={Car} alt='vagas' />
                        <p><b>{car || 2}</b></p>
                    </div>
                </div>

                {/*Localização*/}
                <div className={styles.location}>
                    <Image src={Location} alt='localização' />
                    <div>
                        <p><b>{location || "Rua João Maetini - barravelha"}</b></p>
                        <p>{city || "Ilhabela"}- SP</p>
                    </div>
                </div>
                {/*Preço e Ver mais*/}
                <div className={styles.price}>
                    <h3>R${price || "2.596.000"}</h3>
                    <Link href="/imovelCasa"><button className={styles.more}>Ver mais</button></Link>
                </div>
            </div>
        </div>
    )
}