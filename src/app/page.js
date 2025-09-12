import styles from "./page.module.css";
import Imovel from "./components/Imovel";
import Image from "next/image";
import Link from "next/link";
import Bar from '../../public/icons/bar-chart.svg';
import Cash from '../../public/icons/cash-outline.svg';
import Construct from '../../public/icons/construct.svg';

export default function Home() {
  return (
    <div>

      {/*Banner*/}
        <div className={styles.banner}></div>

        <div className={styles.info}>
          <div className={styles.info_group}>
            <Image src={Bar} alt="qualidade" className={styles.icon_info}/>
            <h3>Qualidade Garantida</h3>
            <p>Imóveis selecionados com qualidade e confiança garantidas.</p>
          </div>

          <div className={styles.info_group}>
            <Image src={Cash} alt="financeamento" className={styles.icon_info}/>
            <h3>Financeamento</h3>
            <p>Financiamento facilitado com as melhores taxas do mercado.</p>
          </div>

          <div className={styles.info_group}>
            <Image src={Construct} alt="segurança" className={styles.icon_info}/>
            <h3>Segurança</h3>
            <p>Segurança em primeiro lugar: seu lar protegido 24 horas por dia.</p>
          </div>
        </div>


      <Imovel />
    </div>
  );
}

