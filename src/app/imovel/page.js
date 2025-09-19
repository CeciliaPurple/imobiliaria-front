import styles from './imovel.module.css'
import Image from 'next/image'
import Link from 'next/link'
import imgHome from '../../../public/img/sobrado1.jpg'
import img1 from '../../../public/img/salaLuxo.jpg'
import img2 from '../../../public/img/luxo.jpg'

export default function Imovel() {
    return (
        <div className={styles.container}>
            {/*Galeria de imagens*/}
            <div className={styles.gallery_container}>
                <Image src={imgHome} alt='frente da casa' className={styles.imgG}/>

                <div className={styles.images_group}>
                    <Image src={img1} alt='cômodo' className={styles.imgP}/>
                    <Image src={img2} alt='cômodo' className={styles.imgP}/>
                </div>
            </div>
        </div>
    )
} 