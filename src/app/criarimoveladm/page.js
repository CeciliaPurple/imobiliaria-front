    "use client";

    import { useState } from "react";
    import styles from "./adm.module.css";
    import Select from "react-select";
    import dynamic from "next/dynamic"; 
   

    export default function CriarIMovelAdm() {
      const [telefone, setTelefone] = useState("");
      const Select = dynamic(() => import("react-select"), { ssr: false });

      {/*Telefone*/ }
      const handleTelefoneChange = (e) => {
        let value = e.target.value.replace(/\D/g, ""); // remove tudo que não for número

        if (value.length > 11) value = value.slice(0, 11); // limita em 11 dígitos

        if (value.length <= 10) {
          // Telefone fixo -> (99) 9999-9999
          value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
        } else {
          // Celular -> (99) 99999-9999
          value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
        }
        setTelefone(value);
      };

      {/*Seleção*/ }


      const [ambientes, setAmbientes] = useState([]);
      const [conveniencias, setConveniencias] = useState([]);


      const ambienteOptions = [
        { value: "piscina", label: "Piscina" },
        { value: "escritorio", label: "Escritório" },
        { value: "closet", label: "Closet" },
      ];

      const convenienciaOptions = [
        { value: "ar-condicionado", label: "Ar-Condicionado" },
        { value: "mobilhada", label: "Mobilhada" },
      ];

      return (
        <div className={styles.visita}>
          <div className={styles.container}>

            <p className={styles.agenda}>Criar Imóvel</p>

            <form className={styles.form}>

            <p className={styles.perfil}>Criar Imóvel</p>

              {/* Foto */}
              <div className={styles.campo}>
                <label htmlFor="foto">Foto</label>
                <input
                  id="foto"
                  aria-label="Foto"
                  type="url"
                  placeholder="Cole o link da imagem"
                  required
                />
              </div>

              {/* Título */}
              <div className={styles.campo}>
                <label htmlFor="titulo">Título</label>
                <input
                  id="titulo"
                  type="text"
                  placeholder="Digite o título"
                  required
                />
              </div>

              {/* Localização */}
              <div className={styles.campo}>
                <label htmlFor="localizacao">Localização</label>
                <input
                  id="localizacao"
                  type="text"
                  placeholder="Digite a localização"
                  required
                />
              </div>

              {/* Valor */}
              <div className={styles.campo}>
                <label htmlFor="valor">Valor</label>
                <input
                  id="valor"
                  className={styles.hora}
                  type="number"
                  placeholder="R$ 0,00"
                  required
                />
              </div>

              {/* Iptu */}
              <div className={styles.campo}>
                <label htmlFor="Iptu">Iptu</label>
                <input
                  id="Iptu"
                  type="number"
                  className={styles.ajuste}
                  placeholder="R$ 0,00"
                  onChange={handleTelefoneChange}
                  required
                />
              </div>

              {/* M² da casa  */}
              <div className={styles.campo}>
                <label htmlFor="M² Da Casa">M² Da Casa</label>
                <input
                  id="M² Da Casa"
                  type="number"
                  className={styles.ajuste}
                  placeholder="M²"
                  onChange={handleTelefoneChange}
                  required
                />
              </div>

              {/* quantidade de quartos */}
              <div className={styles.campo}>
                <label htmlFor="Quantidade de quartos">Quantidade de quartos</label>
                <input
                  id="Quantidade de quartos"
                  type="number"
                  className={styles.ajuste}
                  placeholder="03"
                  onChange={handleTelefoneChange}
                  required
                />
              </div>


              {/* Quantidade de banheiros */}
              <div className={styles.campo}>
                <label htmlFor="Quantidade de banheiros">Quantidade de banheiros</label>
                <input
                  id="Quantidade de banheiros"
                  type="number"
                  className={styles.ajuste}
                  placeholder="02"          
                  onChange={handleTelefoneChange}
                  required
                />
              </div>


              {/* Quantidade de garagens */}
              <div className={styles.campo}>
                <label htmlFor="Quantidade de garagens">Quantidade de garagens</label>
                <input
                  id="Quantidade de garagens"
                  type="number"
                  className={styles.ajuste}
                  placeholder="02"
                  onChange={handleTelefoneChange}
                  required
                />
              </div>

              {/* Ambiente */}
              <div className={styles.campo}>
                <label>Ambiente:</label>
                <Select
                  className={styles.ambiente}
                  classNamePrefix="ambiente" 
                  isMulti
                  options={ambienteOptions}
                  value={ambientes}
                  onChange={setAmbientes}
                  placeholder="Selecione os ambientes"
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      border: "3px solid var(--azulClaro)", // aqui você define a borda
                      borderRadius: "8px",          // opcional: arredondar
                      boxShadow: state.isFocused ? "0 0 0 1px var(--vibrante)" : "none",
                      "&:hover": {
                        border: "3px solid var(--clean)"
                      }
                    })
                  }}
                />
              </div>

              {/* Conveniências */}
              <div className={styles.campo}>
                <label>Conveniências:</label>
                <Select
                  className={styles.conveniencias}
                  classNamePrefix="rs" 
                  isMulti
                  options={convenienciaOptions}
                  value={conveniencias}
                  onChange={setConveniencias}
                  placeholder="Selecione as conveniências"
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      border: "3px solid var(--azulClaro)", // aqui você define a borda
                      borderRadius: "8px",          // opcional: arredondar
                      boxShadow: state.isFocused ? "0 0 0 1px var(--vibrante)" : "none",
                      "&:hover": {
                        border: "3px solid var(--clean)"
                      }
                    })
                  }}
                />
              </div>


              {/* Observações */}
              <div className={styles.campo}>
                <label htmlFor="observacoes">Observações</label>
                <textarea
                  id="observacoes"
                  className={styles.obs}
                  placeholder="Digite as observações"
                  required
                ></textarea>
              </div>

              <button type="submit">Enviar</button>
            </form>

          </div>
        </div>
      );
    }
