import styles from "./page.module.css";
import Imovel from "./components/Imovel";
import Image from "next/image";
import Link from "next/link";
import Bar from '../../public/icons/bar-chart.svg';
import Cash from '../../public/icons/cash-outline.svg';
import Construct from '../../public/icons/construct.svg';
import SetaD from '../../public/icons/chevron-forward.svg';
import SetaE from '../../public/icons/chevron-back-outline.svg';

export default function Home() {
  return (
    <div>

      {/*Banner*/}
      <div className={styles.banner}></div>

      {/*Faixa de garantias*/}
      <section className={styles.info}>
        <div className={styles.info_group}>
          <Image src={Bar} alt="qualidade" className={styles.icon_info} />
          <h3>Qualidade Garantida</h3>
          <p>Imóveis selecionados com qualidade e confiança garantidas.</p>
        </div>

        <div className={styles.info_group}>
          <Image src={Cash} alt="financeamento" className={styles.icon_info} />
          <h3>Financeamento</h3>
          <p>Financiamento facilitado com as melhores taxas do mercado.</p>
        </div>

        <div className={styles.info_group}>
          <Image src={Construct} alt="segurança" className={styles.icon_info} />
          <h3>Segurança</h3>
          <p>Segurança em primeiro lugar: seu lar protegido 24 horas por dia.</p>
        </div>
      </section>

      {/*Imóveis em destaque*/}
      <section className={styles.container_box}>
        <div className={styles.container_imovel}>
          <h2>Imóveis em destaque</h2>
          <div className={styles.carrossel}>
            <Image src={SetaE} alt="seta voltar" />
            <Imovel />
            <Imovel />
            <Imovel />
            <Image src={SetaD} alt="seta ir" />
          </div>
        </div>
      </section>

      {/*Imóveis em lançamento*/}
      <section className={styles.container_box}>
        <div className={styles.container_imovel}>
          <h2>Lançamentos</h2>
          <div className={styles.carrossel}>
            <Image src={SetaE} alt="seta voltar" />
            <Imovel />
            <Imovel />
            <Imovel />
            <Imovel />
            <Image src={SetaD} alt="seta ir" />
          </div>
        </div>
      </section>

      <section className={styles.about}>

      </section>
    </div>
  );
}

