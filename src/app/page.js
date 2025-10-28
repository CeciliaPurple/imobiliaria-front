'use client'
import { useState } from 'react';
import styles from "./page.module.css";
import Imovel from "./components/Imovel";
import Image from "next/image";
import Bar from '../../public/icons/bar-chart.svg';
import Cash from '../../public/icons/cash-outline.svg';
import Construct from '../../public/icons/construct.svg';
import SetaD from '../../public/icons/chevron-forward.svg';
import SetaE from '../../public/icons/chevron-back-outline.svg';
import Gallery from '../../public/img/groupImage.png';
import Casa1 from '../../public/img/casa.jpg';
import Casa2 from '../../public/img/casa de praia.jpg';
import Casa3 from '../../public/img/casaLuxoPiscina.jpg';
import Casa4 from '../../public/img/casaModerna.jpg';
import Luxo1 from '../../public/img/luxo.jpg';
import Luxo2 from '../../public/img/salaLuxo.jpg';
import Luxo3 from '../../public/img/quarto-ilhabela.jpg';
import Luxo4 from '../../public/img/cozinha ilhabela.jpg';
import Luxo5 from '../../public/img/sobrado1.jpg';

export default function Home() {
  const imoveisDestaqueData = [
    { id: "d1", imagemSrc: Casa1, titulo: "Casa Moderna Jardins", area: 250, bed: 4, bath: 3, car: 2, location: "Rua 1", city: "Caraguatatuba", price: "2.000.000"},
    { id: "d2", imagemSrc: Casa2, titulo: "Casa de Praia Ilhabela", area: 180, bed: 3, bath: 2, car: 1, location: "Rua 2", city: "Ilhabela", price: "1.500.000" },
    { id: "d3", imagemSrc: Casa3, titulo: "Casa com Piscina", area: 300, bed: 5, bath: 4, car: 3, location: "Rua 3", city: "São Sebastião", price: "3.200.000" },
    { id: "d4", imagemSrc: Casa4, titulo: "Casa Contemporânea", area: 220, bed: 4, bath: 3, car: 2, location: "Rua 4", city: "Ubatuba", price: "2.800.000" }
  ];

  const imoveisLancamentoData = [
    { id: "l1", imagemSrc: Luxo1, titulo: "Mansão Alto Padrão", area: 250, bed: 4, bath: 3, car: 2, location: "Rua 5", city: "Ilhabela", price: "5.000.000" },
    { id: "l2", imagemSrc: Luxo2, titulo: "Sala Premium", area: 120, bed: 2, bath: 1, car: 1, location: "Rua 6", city: "Caraguatatuba", price: "1.200.000" },
    { id: "l3", imagemSrc: Luxo3, titulo: "Quarto Vista Mar", area: 90, bed: 1, bath: 1, car: 0, location: "Rua 7", city: "São Sebastião", price: "800.000" },
    { id: "l4", imagemSrc: Luxo4, titulo: "Cozinha Gourmet", area: 80, bed: 1, bath: 1, car: 0, location: "Rua 8", city: "Ubatuba", price: "600.000" },
    { id: "l5", imagemSrc: Luxo5, titulo: "Sobrado Moderno", area: 200, bed: 3, bath: 2, car: 2, location: "Rua 9", city: "Ilhabela", price: "1.800.000" }
  ];

  const [destaqueItems, setDestaqueItems] = useState(imoveisDestaqueData);
  const [lancamentoItems, setLancamentoItems] = useState(imoveisLancamentoData);

  const nextDestaque = () => {
    setDestaqueItems(prev => {
      const rotated = [...prev];
      rotated.push(rotated.shift());
      return rotated;
    });
  };

  const prevDestaque = () => {
    setDestaqueItems(prev => {
      const rotated = [...prev];
      rotated.unshift(rotated.pop());
      return rotated;
    });
  };

  const nextLancamento = () => {
    setLancamentoItems(prev => {
      const rotated = [...prev];
      rotated.push(rotated.shift());
      return rotated;
    });
  };

  const prevLancamento = () => {
    setLancamentoItems(prev => {
      const rotated = [...prev];
      rotated.unshift(rotated.pop());
      return rotated;
    });
  };

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

      {/* Imóveis em destaque */}
      <section className={styles.container_box}>
        <div className={styles.container_imovel}>
          <h2>Imóveis em destaque</h2>
          <div className={styles.carrossel}>
            <Image
              src={SetaE}
              alt="seta voltar"
              onClick={prevDestaque}
              style={{ cursor: 'pointer' }}
            />
            <div className={styles.carrossel_content}>
              {destaqueItems.slice(0, 3).map(item => (
                <Imovel
                  key={item.id}
                  imagemSrc={item.imagemSrc}
                  titulo={item.titulo}
                  area={item.area}
                  bed={item.bed}
                  bath={item.bath}
                  car={item.car}
                  location={item.location}
                  city={item.city}
                  price={item.price}
                />
              ))}
            </div>
            <Image
              src={SetaD}
              alt="seta ir"
              onClick={nextDestaque}
              style={{ cursor: 'pointer' }}
            />
          </div>
        </div>
      </section>

      {/* Imóveis em lançamento */}
      <section className={styles.container_box}>
        <div className={styles.container_imovel}>
          <h2>Lançamentos</h2>
          <div className={styles.carrossel}>
            <Image
              src={SetaE}
              alt="seta voltar"
              onClick={prevLancamento}
              style={{ cursor: 'pointer' }}
            />
            <div className={styles.carrossel_content}>
              {lancamentoItems.slice(0, 4).map(item => (
                <Imovel
                  key={item.id}
                  imagemSrc={item.imagemSrc}
                  titulo={item.titulo}
                  area={item.area}
                  bed={item.bed}
                  bath={item.bath}
                  car={item.car}
                  location={item.location}
                  city={item.city}
                  price={item.price}
                />
              ))}
            </div>
            <Image
              src={SetaD}
              alt="seta ir"
              onClick={nextLancamento}
              style={{ cursor: 'pointer' }}
            />
          </div>
        </div>
      </section>

      {/*Sobre nós*/}
      <section className={styles.about}>
        <div className={styles.container_about}>
          <div className={styles.container_text_about}>
            <div className={styles.container_title_about}>
              <h1>Sobre a</h1>
              <h1 className={styles.title_about}>Villa Indaiá</h1>
            </div>

            <p id="sobre" className={styles.text}>
              Na Villa Indaiá, acreditamos que cada imóvel conta uma história — e estamos aqui para ajudar você a escrever a sua.
              Localizada no coração da nossa comunidade, somos especializados em venda de imóveis residenciais e comerciais,
              sempre com foco em oferecer segurança, transparência e atendimento personalizado.<br /><br />

              Nosso compromisso vai além da negociação: buscamos compreender as necessidades e sonhos de cada cliente para
              encontrar o imóvel ideal, aquele que combina conforto, localização e valor justo. Trabalhamos com uma equipe
              experiente, apaixonada pelo que faz, e sempre atualizada com as tendências do mercado imobiliário.<br /><br />

              Na Villa Indaiá, você encontra mais do que imóveis: encontra parceiros de confiança para realizar seu projeto de vida.
            </p>
          </div>

          <Image src={Gallery} alt="conjunto de imagens" className={styles.image} />
        </div>

        <h2>Villa Indaiá – O lugar certo para o seu próximo capítulo.</h2>
      </section>
    </div>
  );
}