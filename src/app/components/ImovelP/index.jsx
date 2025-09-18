import styles from './ImovelP.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Heart from '../../../../public/icons/white-heart-outline.svg';
import Area from '../../../../public//icons/home-outline.svg';
import Bedroom from '../../../../public/icons/bed-outline.svg';
import Bathroom from '../../../../public/icons/water-outline.svg';
import Car from '../../../../public/icons/car-outline.svg';
import Location from '../../../../public/icons/location-outline.svg';
import Home from '../../../../public/img/sobrado1.jpg';

export default function ImovelP() {
    return (
        <div className={styles.container_home}>
            <div className={styles.image_container}>
                <h3>Sinta-se em um resort</h3>
                <Image src={Heart} alt='favoritar' className={styles.heart}/>
            </div>

            <div className={styles.info_home}>
                <div className={styles.info_group}>
                    <div className={styles.info}>
                        <Image src={Area} alt='área m²' />
                        <p><b>178</b>m²</p>
                    </div>

                    <div className={styles.info}>
                        <Image src={Bedroom} alt='quartos' />
                        <p><b>4</b></p>
                    </div>

                    <div className={styles.info}>
                        <Image src={Bathroom} alt='banheiros' />
                        <p><b>2</b></p>
                    </div>

                    <div className={styles.info}>
                        <Image src={Car} alt='vagas' />
                        <p><b>2</b></p>
                    </div>
                </div>

                {/*Localização*/}
                <div className={styles.location}>
                    <Image src={Location} alt='localização' />
                    <div>
                        <p><b>Rua João Maetini - barravelha</b></p>
                        <p>Ilhabela- SP</p>
                    </div>
                </div>
                {/*Preço e Ver mais*/}
                <div className={styles.price}>
                    <h3>R$2.596.000</h3>
                    <button className={styles.more}>Ver mais</button>
                </div>
            </div>
        </div>
    )
}