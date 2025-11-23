import Image from 'next/image';
import Heart from '../../../../public/icons/Heart.svg'
import Home from '../../../../public/icons/Home.svg'
import Location from '../../../../public/icons/Location.svg'
import Bed from "/public/icons/bed.svg";
import Car from "/public/icons/car.svg";
import Water from '../../../../public/icons/water.svg'
import styles from '../Imoveis/imoveis.module.css'

export default function Imoveis() {
    return (
        <div>
            <div className={styles.imageGallery}>

                <div className={styles.imageGallery}>
                    <div className={styles.leftImage}>
                        <img src="/img/casa de praia.jpg" alt="casa" className={styles.largeImage} />
                    </div>
                    <div className={styles.rightImages}>
                        <img src="/img/cozinha.jpg" alt="cozinha" className={styles.smallImage1} />
                        <img src="/img/quarto-ilhabela.jpg" alt="quarto" className={styles.smallImage2} />
                    </div>
                </div>
            </div>

            <div className={styles.propriedadeInfo}>
                <div className={styles.bloco1}>
                    <h2 className={styles.title}>Espaço, conforto e localização privilegiada: Sobrado com 4 dormitórios e 120m² a poucos passos da ilhabela — viva o melhor do litoral!
                        <div className={styles.Hearticon}>
                            <Image src="/icons/heart.svg" alt="favorito" width={50} height={50} />
                        </div>
                    </h2>

                    <h3 className={styles.subtitle}>Avenida Dom João V, Ilhabela - SP.
                        <div className={styles.locationicon} >
                            <Image src="/icons/location.svg" alt="location" width={30} height={30} />
                        </div>
                    </h3>

                    <div className={styles.caracteristicas}>
                        <div className={styles.item}>
                            <Image src="/icons/bed.svg" alt="quartos" width={30} height={30} />
                            <span>4 Quartos</span>
                        </div>
                        <div className={styles.item}>
                            <Image src="/icons/Water.svg" alt="banheiros" width={30} height={30} />
                            <span>2 Banheiros</span>
                        </div>
                        <div className={styles.item}>
                            <Image src="/icons/car.svg" alt="vagas" width={30} height={30} />
                            <span>3 Vagas</span>
                        </div>
                        <div className={styles.item}>
                            <Image src="/icons/Home.svg" alt="metragem" width={30} height={30} />
                            <span>120 m²</span>
                        </div>
                    </div>

                </div>

                <div className={styles.venda}>
                    <div className={styles.infovenda}>
                        <div className={styles.vendalista} >
                            <p>R$1.250.000.00</p>
                        </div>
                        <p className={styles.vendalista2}>
                            <p>Venda</p>
                        </p>
                        <div className={styles.iptu}>
                            <p>IPTU</p>
                        </div>
                        <div className={styles.numero}>
                            <p>R$ 1.530/ano</p>
                        </div>
                    </div>
                    <button className={styles.agendarButton}>
                        Agendar Visita
                    </button>

                    <button className={styles.contactButton}>
                        Entrar em Contato
                    </button>
                </div>
            </div>



            <div className={styles.objambiente}>
                <p>ambiente</p>
            </div>
            <div className={styles.ambientelista}>
                <p>Área de Serviços</p>
                <p>quintal</p>
                <p>Closet</p>
                <p>Piscina</p>
                <p>Escritório</p>
            </div>

            <div className={styles.Conveniencias}>
                <p className={styles.objConveniencias}>Conveniencias</p>
                <p className={styles.listaConveniencias}>
                    <p>Mobiliado</p>
                    <p>Ar-condicionado</p>
                </p>
            </div>


            <div className={styles.descriçao}>
                <p className={styles.objdescrição}>Descrição</p>
                <div className={styles.textodescrição}>
                    <p>Descubra o prazer de viver ou investir no litoral norte de São Paulo! Localizada em uma</p>
                    <p>das praias mais charmosas e tranquilas de São Sebastião, esta casa é ideal para quem busca</p>
                    <p>conforto, praticidade e qualidade de vida</p>
                </div>
                <div className={styles.descricaolista}>
                    <p>4 dormitórios amplos e bem iluminados;</p>
                    <p>Sala aconchegante com ótima ventilação natural;</p>
                    <p>Cozinha funcional com boa distribuição de espaço;</p>
                    <p>Banheiro social;</p>
                    <p>Vaga de garagem;</p>
                    <p>Terreno com ótimo aproveitamento.</p>
                </div>
            </div>
        </div>

    );
}
