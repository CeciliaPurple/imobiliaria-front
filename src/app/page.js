'use client'
import { useState, useEffect } from 'react';
import styles from "./page.module.css";
import Imovel from "./components/Imovel";
import Image from "next/image";
import Bar from '../../public/icons/bar-chart.svg';
import Cash from '../../public/icons/cash-outline.svg';
import Construct from '../../public/icons/construct.svg';
import SetaD from '../../public/icons/chevron-forward.svg';
import SetaE from '../../public/icons/chevron-back-outline.svg';
import Gallery from '../../public/img/groupImage.png';

export default function Home() {
  const [destaqueItems, setDestaqueItems] = useState([]);
  const [lancamentoItems, setLancamentoItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar imóveis do backend
  const fetchImoveis = async () => {
    try {
      const response = await fetch('http://localhost:3100/imoveis');

      if (response.ok) {
        const data = await response.json();
        // A resposta vem dentro de data.imovel (igual ao filtro)
        const imoveis = data.imovel || data || [];

        // Filtrar imóveis em destaque
        const destaques = imoveis.filter(imovel => imovel.destaque === true || imovel.destaque === 1);

        // Filtrar imóveis em lançamento
        const lancamentos = imoveis.filter(imovel => imovel.lancamento === true || imovel.lancamento === 1);

        setDestaqueItems(destaques);
        setLancamentoItems(lancamentos);
        setLoading(false);
      } else {
        console.error('Erro ao buscar imóveis');
        setLoading(false);
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
      setLoading(false);
    }
  };

  // Buscar imóveis quando o componente carregar
  useEffect(() => {
    fetchImoveis();

    // Opcional: atualizar a cada 30 segundos
    const interval = setInterval(fetchImoveis, 30000);

    return () => clearInterval(interval);
  }, []);

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

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <p>Carregando imóveis...</p>
      </div>
    );
  }

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

     { /* IMÓVEIS EM DESTAQUE - CORRIGIDO*/}
      {destaqueItems.length > 0 && (
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
                    id={item.id} 
                    imagemSrc={item.foto}
                    titulo={item.titulo}
                    area={item.metrosQuadrados}
                    bed={item.quartos}
                    bath={item.banheiros}
                    car={item.garagens}
                    location={item.localizacao}
                    price={item.valor.toLocaleString('pt-BR')}
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
      )}

{/*IMÓVEIS EM LANÇAMENTO - CORRIGIDO*/}
      {lancamentoItems.length > 0 && (
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
                    id={item.id} 
                    imagemSrc={item.foto}
                    titulo={item.titulo}
                    area={item.metrosQuadrados}
                    bed={item.quartos}
                    bath={item.banheiros}
                    car={item.garagens}
                    location={item.localizacao}
                    price={item.valor.toLocaleString('pt-BR')}
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
      )}


      {/*Sobre nós*/}
      <section className={styles.about}>
        <div className={styles.container_about}>
          <div className={styles.container_text_about}>
            <div className={styles.container_title_about}>
              <h1>Sobre a</h1>
              <h1 className={styles.title_about}>Villa Indaiá</h1>
            </div>

            <p id="sobre" className={styles.text}>
              Na Villa Indaiá, acreditamos que cada imóvel conta uma história – e estamos aqui para ajudar você a escrever a sua.
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