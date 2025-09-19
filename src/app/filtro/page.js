import styles from './filtro.module.css'
import Image from 'next/image'
import Link from 'next/link'
import Local from '../../../public/icons/location-sharp.svg'
import Filter from '../../../public/icons/Vector.svg'
import Home from '../../../public/img/luxo.jpg'
import Area from '../../../public//icons/home-outline.svg';
import Bedroom from '../../../public/icons/bed-outline.svg';
import Bathroom from '../../../public/icons/water-outline.svg';
import Car from '../../../public/icons/car-outline.svg';
import Heart from '../../../public/icons/heart-outline.svg'

export default function Filtro() {
    return (
        <div className={styles.container}>
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
                        <Image src={Local} alt='ícone localização' className={styles.icon} />
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
                <div className={styles.container_price}>
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
                <div className={styles.container_group}>
                    <h3>Quartos</h3>
                    <div className={styles.container_number}>

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

                </div>

                {/*Quantidade de banheiros*/}
                <div className={styles.container_group}>
                    <h3>Banheiros</h3>
                    <div className={styles.container_number}>

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

                </div>

                {/*Quantidade de vagas*/}
                <div className={styles.container_group}>
                    <h3>Vagas</h3>
                    <div className={styles.container_number}>

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

            <section className={styles.container_house}>
                <div className={styles.container_home}>
                    <Image src={Home} alt='foto casa' className={styles.image} />
                    <div>
                        <Image src={Heart} alt='favoritar' className={styles.heart} />

                        {/*Informações sobre o imóvel*/}
                        <div className={styles.info_group}>
                            {/*Nome*/}
                            <h2>Sobrado beira mar</h2>

                            {/*Localização*/}
                            <div>
                                <h3>Rua Doutor Arthur da Costa Filho</h3>
                                <h4>Martin de Sá, Caraguatatuba / SP</h4>
                            </div>

                            {/*Faixa de ícones*/}
                            <div className={styles.info_icon}>
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

                            {/*Preço e Ver mais*/}
                            <div className={styles.home_price}>
                                <div>
                                    <h2>R$2.500.000,00</h2>
                                    <h5>IPTU: R$ 1,350</h5>
                                </div>
                                <Link href="/"><button className={styles.more}>Ver mais</button></Link>
                            </div>
                        </div>
                    </div>

                </div>

                <div className={styles.container_home}>
                    <Image src={Home} alt='foto casa' className={styles.image} />
                    <div>
                        <Image src={Heart} alt='favoritar' className={styles.heart} />

                        {/*Informações sobre o imóvel*/}
                        <div className={styles.info_group}>
                            {/*Nome*/}
                            <h2>Sobrado beira mar</h2>

                            {/*Localização*/}
                            <div>
                                <h3>Rua Doutor Arthur da Costa Filho</h3>
                                <h4>Martin de Sá, Caraguatatuba / SP</h4>
                            </div>

                            {/*Faixa de ícones*/}
                            <div className={styles.info_icon}>
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

                            {/*Preço e Ver mais*/}
                            <div className={styles.home_price}>
                                <div>
                                    <h2>R$2.500.000,00</h2>
                                    <h5>IPTU: R$ 1,350</h5>
                                </div>
                                <Link href="/"><button className={styles.more}>Ver mais</button></Link>
                            </div>
                        </div>
                    </div>

                </div>

                <div className={styles.container_home}>
                    <Image src={Home} alt='foto casa' className={styles.image} />
                    <div>
                        <Image src={Heart} alt='favoritar' className={styles.heart} />

                        {/*Informações sobre o imóvel*/}
                        <div className={styles.info_group}>
                            {/*Nome*/}
                            <h2>Sobrado beira mar</h2>

                            {/*Localização*/}
                            <div>
                                <h3>Rua Doutor Arthur da Costa Filho</h3>
                                <h4>Martin de Sá, Caraguatatuba / SP</h4>
                            </div>

                            {/*Faixa de ícones*/}
                            <div className={styles.info_icon}>
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

                            {/*Preço e Ver mais*/}
                            <div className={styles.home_price}>
                                <div>
                                    <h2>R$2.500.000,00</h2>
                                    <h5>IPTU: R$ 1,350</h5>
                                </div>
                                <Link href="/"><button className={styles.more}>Ver mais</button></Link>
                            </div>
                        </div>
                    </div>

                </div>

                <div className={styles.container_home}>
                    <Image src={Home} alt='foto casa' className={styles.image} />
                    <div>
                        <Image src={Heart} alt='favoritar' className={styles.heart} />

                        {/*Informações sobre o imóvel*/}
                        <div className={styles.info_group}>
                            {/*Nome*/}
                            <h2>Sobrado beira mar</h2>

                            {/*Localização*/}
                            <div>
                                <h3>Rua Doutor Arthur da Costa Filho</h3>
                                <h4>Martin de Sá, Caraguatatuba / SP</h4>
                            </div>

                            {/*Faixa de ícones*/}
                            <div className={styles.info_icon}>
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

                            {/*Preço e Ver mais*/}
                            <div className={styles.home_price}>
                                <div>
                                    <h2>R$2.500.000,00</h2>
                                    <h5>IPTU: R$ 1,350</h5>
                                </div>
                                <Link href="/"><button className={styles.more}>Ver mais</button></Link>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}