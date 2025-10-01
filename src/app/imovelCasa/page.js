import Image from 'next/image';
import styles from './casas.module.css'
import Link from "next/link";


// caminhos diretos para os ícones da pasta public/icons
const Heart = "/icons/heart.svg";
const Home = "/icons/home.svg";
const Location = "/icons/location.svg";
const Bed = "/icons/bed.svg";
const Car = "/icons/car.svg";
const Water = "/icons/water.svg";

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
                    <h2 className={styles.title}>
                        Espaço, conforto e localização privilegiada: Sobrado com 4 dormitórios e 120m² a poucos passos da ilhabela — viva o melhor do litoral
                    </h2>

                    <h3 className={styles.subtitle}>
                        Avenida Dom João V, Ilhabela - SP.
                        <div className={styles.locationicon}>
                            <Image src={Location} alt="location" width={30} height={30} />
                        </div>
                    </h3>

                    <div className={styles.caracteristicas}>
                        <div className={styles.item}>
                            <Image src={Bed} alt="quartos" width={30} height={30} />
                            <span>4 Quartos</span>
                        </div>
                        <div className={styles.item}>
                            <Image src={Water} alt="banheiros" width={30} height={30} />
                            <span>2 Banheiros</span>
                        </div>
                        <div className={styles.item}>
                            <Image src={Car} alt="vagas" width={30} height={30} />
                            <span>3 Vagas</span>
                        </div>
                        <div className={styles.item}>
                            <Image src={Home} alt="metragem" width={30} height={30} />
                            <span>120 m²</span>
                        </div>
                    </div>
                </div>

                <div className={styles.venda}>
                    <div className={styles.infovenda}>
                        <div className={styles.vendalista}>
                            <p>R$1.250.000,00</p>
                        </div>
                        <p className={styles.vendalista2}>
                            <span>Venda</span>
                        </p>
                        <div className={styles.iptu}>
                            <p>IPTU</p>
                        </div>
                        <div className={styles.numero}>
                            <p>R$ 1.530/ano</p>
                        </div>
                    </div>

                    <Link href={'/agenda'}><button className={styles.agendarButton}>Agendar Visita</button></Link>

                    <Link href={'/'}><button className={styles.contactButton}>Entrar em Contato</button></Link>
                </div>
            </div>

            <div className={styles.objambiente}>
                <p>ambiente</p>
            </div>
            <div className={styles.ambientelista}>
                <p>Área de Serviços</p>
                <p>Quintal</p>
                <p>Closet</p>
                <p>Piscina</p>
                <p>Escritório</p>
            </div>

            <div className={styles.Conveniencias}>
                <p className={styles.objConveniencias}>Conveniências</p>
                <div className={styles.listaConveniencias}>
                    <p>Mobiliado</p>
                    <p>Ar-condicionado</p>
                </div>
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