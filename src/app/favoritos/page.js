import styles from './favoritos.module.css'
import Imovel from '../components/Imovel'

export default function Favoritos() {
    return (
        <div className={styles.container_fave}>
             <h2>Favoritos</h2>

             <div className={styles.container_imoveis}>
                <Imovel/>
                <Imovel/>
                <Imovel/>
                <Imovel/>
                <Imovel/>
                <Imovel/>
             </div>
        </div>
    )
}