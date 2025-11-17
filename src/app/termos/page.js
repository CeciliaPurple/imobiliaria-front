'use client';

import styles from './termos.module.css';
import Logo from '../../../public/villa-logo-nome.png';
import Image from 'next/image';
import Link from 'next/link';

export default function TermosDeUso() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link href="/">
                    <Image src={Logo} alt='logo' className={styles.logo} />
                </Link>
                <h1 className={styles.title}>Termos de Uso</h1>
            </div>

            <div className={styles.content}>

                <section className={styles.section}>
                    <h2>1. Introdução</h2>
                    <p>
                        Bem-vindo ao site da Vila Indaiá. Estes Termos de Uso regulam o acesso e o uso do nosso site e de todos os
                        conteúdos, serviços e produtos oferecidos através dele. Ao acessar e usar nosso site, você concorda em estar
                        vinculado por estes termos.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>2. Uso Licenciado</h2>
                    <p>
                        É concedido a você uma licença limitada e não exclusiva para acessar e usar o site para fins pessoais e não comerciais.
                        Você não pode:
                    </p>
                    <ul>
                        <li>Modificar ou copiar os materiais</li>
                        <li>Usar os materiais para qualquer propósito comercial ou para fins públicos</li>
                        <li>Tentar descompilar ou fazer engenharia reversa do software contido no site</li>
                        <li>Remover quaisquer avisos de direitos autorais ou outras notações proprietárias</li>
                        <li>Transferir os materiais para outro indivíduo ou "espelhar" os materiais em qualquer outro servidor</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>3. Isenção de Responsabilidade</h2>
                    <p>
                        Os materiais no site da Vila Indaiá são fornecidos no estado em que se encontram. Vila Indaiá não oferece garantias,
                        expressas ou implícitas, e isenta-se expressamente de garantias de adequação a um fim particular. Além disso,
                        Vila Indaiá não garante a precisão, plenitude ou qualidade das informações no site.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>4. Limitações de Responsabilidade</h2>
                    <p>
                        Em nenhum caso Vila Indaiá ou seus fornecedores serão responsáveis por quaisquer danos (incluindo, sem limitação,
                        danos por perda de dados ou lucro) decorrentes do uso ou incapacidade de usar o site.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>5. Precisão do Material</h2>
                    <p>
                        O material exibido no site da Vila Indaiá pode conter erros técnicos, tipográficos ou fotográficos. Vila Indaiá
                        não garante que nenhum dos materiais no site seja preciso, completo ou atual. Vila Indaiá pode fazer alterações
                        nos materiais contidos no site a qualquer momento sem aviso prévio.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>6. Materiais do Site</h2>
                    <p>
                        Vila Indaiá não revisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site
                        vinculado. A inclusão de qualquer link não implica endosso pela Vila Indaiá do site. O uso de qualquer site
                        vinculado é por conta e risco do usuário.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>7. Modificações</h2>
                    <p>
                        Vila Indaiá pode revisar estes Termos de Uso a qualquer momento, sem aviso prévio. Ao usar este site, você
                        concorda em estar vinculado pela versão então vigente destes Termos de Uso.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>8. Lei Aplicável</h2>
                    <p>
                        Estes Termos de Uso e Condições são regidos por e construídos de acordo com as leis do Brasil, e você se submete
                        irrevogavelmente à jurisdição exclusiva dos tribunais nesse local.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>9. Contato</h2>
                    <p>
                        Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco através dos canais de comunicação
                        disponíveis no site.
                    </p>
                </section>
            </div>
        </div>
    );
}
