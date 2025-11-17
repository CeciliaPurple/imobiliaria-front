'use client';

import styles from './politica.module.css';
import Logo from '../../../public/villa-logo-nome.png';
import Image from 'next/image';
import Link from 'next/link';

export default function PoliticaPrivacidade() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link href="/">
                    <Image src={Logo} alt='logo' className={styles.logo} />
                </Link>
                <h1 className={styles.title}>Política de Privacidade</h1>
            </div>

            <div className={styles.content}>

                <section className={styles.section}>
                    <h2>1. Introdução</h2>
                    <p>
                        A Vila Indaiá é comprometida em proteger sua privacidade. Esta Política de Privacidade explica como coletamos,
                        usamos, divulgamos e protegemos suas informações quando você visita nosso site e utiliza nossos serviços.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>2. Coleta de Informações</h2>
                    <p>
                        Coletamos informações de várias formas, incluindo:
                    </p>
                    <ul>
                        <li>Informações fornecidas voluntariamente por você, como nome, email e telefone ao preencher formulários</li>
                        <li>Informações coletadas automaticamente durante sua navegação, como endereço IP e dados de cookies</li>
                        <li>Informações sobre imóveis de seu interesse e histórico de navegação</li>
                        <li>Dados de agendamentos e visitas a propriedades</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>3. Uso das Informações</h2>
                    <p>
                        As informações coletadas são utilizadas para:
                    </p>
                    <ul>
                        <li>Fornecer e melhorar nossos serviços imobiliários</li>
                        <li>Processar seu cadastro e facilitar agendamentos de visitas</li>
                        <li>Enviar atualizações sobre novas propriedades que correspondem ao seu perfil</li>
                        <li>Responder suas dúvidas e fornecer suporte ao cliente</li>
                        <li>Melhorar a experiência do usuário no site através de análise de dados</li>
                        <li>Enviar informações sobre promoções e ofertas especiais (com seu consentimento)</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>4. Proteção de Dados</h2>
                    <p>
                        Implementamos medidas de segurança técnicas e administrativas para proteger suas informações contra acessos
                        não autorizados, alteração, divulgação ou destruição. Isso inclui criptografia, firewalls e controle de acesso.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>5. Compartilhamento de Informações</h2>
                    <p>
                        Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto:
                    </p>
                    <ul>
                        <li>Quando necessário para fornecer serviços que você solicitou</li>
                        <li>Quando exigido por lei ou ordem judicial</li>
                        <li>Com parceiros de confiança que concordam em manter a confidencialidade</li>
                        <li>Em caso de fusão, aquisição ou venda de ativos (com notificação prévia)</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>6. Cookies e Tecnologias Similares</h2>
                    <p>
                        Utilizamos cookies e tecnologias similares para melhorar sua experiência no site, analisar o uso e
                        personalizar conteúdo. Você pode controlar as configurações de cookies através das preferências do seu navegador.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>7. Seus Direitos</h2>
                    <p>
                        Você tem o direito de:
                    </p>
                    <ul>
                        <li>Acessar suas informações pessoais armazenadas</li>
                        <li>Solicitar correção de dados imprecisos</li>
                        <li>Solicitar exclusão de suas informações (direito ao esquecimento)</li>
                        <li>Revogar consentimentos para coleta e uso de dados</li>
                        <li>Optar por não receber comunicações de marketing</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>8. Retenção de Dados</h2>
                    <p>
                        Mantemos suas informações pessoais pelo tempo necessário para fornecer nossos serviços e cumprir obrigações
                        legais. Após este período, os dados são excluídos ou anonimizados de forma segura.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>9. Links Externos</h2>
                    <p>
                        Nosso site pode conter links para sites externos. Não somos responsáveis pelas práticas de privacidade de
                        terceiros. Recomendamos que você leia a política de privacidade de qualquer site antes de fornecer informações pessoais.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>10. Alterações na Política</h2>
                    <p>
                        Podemos atualizar esta Política de Privacidade periodicamente. Qualquer alteração significativa será notificada
                        através do site ou via email. O uso contínuo do site após alterações constitui seu consentimento.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>11. Contato</h2>
                    <p>
                        Se você tiver dúvidas sobre esta Política de Privacidade ou suas informações pessoais, entre em contato conosco
                        através dos canais disponíveis no site. Estamos à disposição para esclarecer qualquer dúvida.
                    </p>
                </section>
            </div>
        </div>
    );
}
