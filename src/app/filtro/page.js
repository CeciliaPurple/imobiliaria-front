import styles from './filtro.module.css'
import Image from 'next/image'
import Local from '../../../public/icons/location-sharp.svg'
import Filter from '../../../public/icons/Vector.svg'

export default function Filtro() {
    return (
        <div>
            <section className={styles.container_filter}>
                {/*Texto filtros*/}
                <div className={styles.icon_group}>
                    <h2>Filtros</h2>
                    <Image src={Filter} alt='ícone filtro' />
                </div>

                {/*Localização*/}
                <div className={styles.container_group}>
                    <h3>Localização</h3>
                    <div className={styles.location_group}>
                        <Image src={Local} alt='ícone localização' className={styles.icon}/>
                        <input type='text' placeholder='Digite...' />
                    </div>
                </div>

                {/*Tipos de imóveis*/}
                <div className={styles.container_group}>
                    <h3>Tipos de Imóveis</h3>
                    <div className={styles.container_grid}>
                        <div className={styles.select}>
                            <input type='checkbox' />
                            <label>Casas</label>
                        </div>

                        <div className={styles.select}>
                            <input type='checkbox' />
                            <label>Apartamento</label>
                        </div>

                        <div className={styles.select}>
                            <input type='checkbox' />
                            <label>Coberturas</label>
                        </div>

                        <div className={styles.select}>
                            <input type='checkbox' />
                            <label>Loft</label>
                        </div>

                        <div className={styles.select}>
                            <input type='checkbox' />
                            <label>Sítios e Chácaras</label>
                        </div>

                        <div className={styles.select}>
                            <input type='checkbox' />
                            <label>Flat</label>
                        </div>
                    </div>
                </div>

                {/*Preço*/}
                <div>
                    <div className={styles.container_group}>
                        <h3>Preço à partir de</h3>
                        <input
                            type='number'
                            placeholder='R$ 0.00'
                        />
                    </div>

                    <div className={styles.container_group}>
                        <h3>Até</h3>
                        <input
                            type='number'
                            placeholder='R$ 0.00'
                        />
                    </div>
                </div>

                {/*Quantidade de quartos*/}
                <div className={styles.container_number}>
                    <h3>Quartos</h3>
                    <div className={styles.select_number}>
                        <input type='checkbox' />
                        <label>+1</label>
                    </div>

                    <div className={styles.select_number}>
                        <input type='checkbox' />
                        <label>+2</label>
                    </div>

                    <div className={styles.select_number}>
                        <input type='checkbox' />
                        <label>+3</label>
                    </div>

                    <div className={styles.select_number}>
                        <input type='checkbox' />
                        <label>+4</label>
                    </div>
                    <div className={styles.select_number}>
                        <input type='checkbox' />
                        <label>+5</label>
                    </div>
                </div>

                {/*Quantidade de banheiros*/}
                <div className={styles.container_number}>
                    <h3>Banheiros</h3>
                    <div className={styles.select_number}>
                        <input type='checkbox' />
                        <label>+1</label>
                    </div>

                    <div className={styles.select_number}>
                        <input type='checkbox' />
                        <label>+2</label>
                    </div>

                    <div className={styles.select_number}>
                        <input type='checkbox' />
                        <label>+3</label>
                    </div>

                    <div className={styles.select_number}>
                        <input type='checkbox' />
                        <label>+4</label>
                    </div>
                    <div className={styles.select_number}>
                        <input type='checkbox' />
                        <label>+5</label>
                    </div>
                </div>

                {/*Quantidade de vagas*/}
                <div className={styles.container_number}>
                    <h3>Banheiros</h3>
                    <div className={styles.select_number}>
                        <input type='checkbox' />
                        <label>+1</label>
                    </div>

                    <div className={styles.select_number}>
                        <input type='checkbox' />
                        <label>+2</label>
                    </div>

                    <div className={styles.select_number}>
                        <input type='checkbox' />
                        <label>+3</label>
                    </div>

                    <div className={styles.select_number}>
                        <input type='checkbox' />
                        <label>+4</label>
                    </div>
                    <div className={styles.select_number}>
                        <input type='checkbox' />
                        <label>+5</label>
                    </div>
                </div>

                {/*Tipos de ambientes*/}
                <div className={styles.container_group}>
                    <h3>Ambientes</h3>
                    <div className={styles.container_grid}>
                        <div className={styles.select}>
                            <input type='checkbox' />
                            <label>Área de Serviços</label>
                        </div>

                        <div className={styles.select}>
                            <input type='checkbox' />
                            <label>Closet</label>
                        </div>

                        <div className={styles.select}>
                            <input type='checkbox' />
                            <label>Escritório</label>
                        </div>

                        <div className={styles.select}>
                            <input type='checkbox' />
                            <label>Jardim</label>
                        </div>

                        <div className={styles.select}>
                            <input type='checkbox' />
                            <label>Lavanderia</label>
                        </div>

                        <div className={styles.select}>
                            <input type='checkbox' />
                            <label>Piscina</label>
                        </div>

                        <div className={styles.select}>
                            <input type='checkbox' />
                            <label>Quintal</label>
                        </div>
                    </div>
                </div>

                {/*Tipos de Convêniencias*/}
                <div className={styles.container_group}>
                    <h3>Convêniencias</h3>
                    <div className={styles.container_grid}>
                        <div className={styles.select}>
                            <input type='checkbox' />
                            <label>Ar-condicionado</label>
                        </div>

                        <div className={styles.select}>
                            <input type='checkbox' />
                            <label>Armários Planejados</label>
                        </div>

                        <div className={styles.select}>
                            <input type='checkbox' />
                            <label>Hidromassagem</label>
                        </div>

                        <div className={styles.select}>
                            <input type='checkbox' />
                            <label>Mobiliado</label>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}