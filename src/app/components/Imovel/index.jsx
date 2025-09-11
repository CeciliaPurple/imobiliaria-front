import styles from './Imovel.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Heart from '../../../../public/heart-outline.svg';
import { ST } from 'next/dist/shared/lib/utils';

export default function Imovel() {
    return (
        <div className={styles.container_home}>
            <div className={styles.image_home}></div>

            <div className={styles.info_home}>
                <div className={styles.info_group}>
                    <div className={styles.info}>
                        <Image src={Heart} alt='área m²' />
                        <p><b>178</b>m²</p>
                    </div>

                    <div className={styles.info}>
                        <Image src={Heart} alt='quartos' />
                        <p><b>4</b></p>
                    </div>

                    <div className={styles.info}>
                        <Image src={Heart} alt='banheiros' />
                        <p><b>2</b></p>
                    </div>

                    <div className={styles.info}>
                        <Image src={Heart} alt='vagas' />
                        <p><b>2</b></p>
                    </div>
                </div>

                {/*Localização*/}
                <div className={styles.location}>
                    <Image src={Heart} alt='localização' />
                    <div>
                        <p><b>Rua João Maetini - barravelha</b></p>
                        <p>Ilhabela- SP</p>
                    </div>
                </div>
                <div >
                    <h3 className={styles.price}>R$2.596.000</h3>
                    <p>Ver mais</p>
                </div>

            </div>
        </div>
    )
}