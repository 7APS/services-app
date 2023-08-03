"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [isTop, setIsTop] = useState(true);
  const [menuActive, setMenuActive] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.pageYOffset === 0);
    };

    const handleScrollMenu = () => {
      const menuItems = document.querySelectorAll(".menu-item");

      function isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
        );
      }

      menuItems.forEach((menuItem) => {
        const sectionId = menuItem.getAttribute("href");
        const section = document.querySelector(sectionId);

        if (sectionId != null && isElementInViewport(section)) {
          if (sectionId === "#home") {
            setMenuActive("home");
          } else if (sectionId === "#sobre") {
            setMenuActive("sobre");
          } else if (sectionId === "#atuação") {
            setMenuActive("atuação");
          } else if (sectionId === "#contato") {
            setMenuActive("contato");
          }
        }
      });
    };

    window.addEventListener("scroll", handleScrollMenu);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="font-thin bg-white">
      <header
        className={`fixed w-full bg-primary text-white pt-4 h-16 ${
          isTop ? "" : "shadow-lg"
        }`}
      >
        <nav className="flex justify-center items-center container mx-auto">
          {/* <div className="flex items-center invisible lg:visible md:visible">
            <a href="https://bransaraarquitetura.com" rel="Bransara">
              <Image
                className="hover:scale-100"
                width={150}
                height={100}
                src="/images/logoWhite.png"
                alt="Logo Soupe"
                priority
              />
            </a>
          </div> */}
          <ul className="flex space-x-4 text-secondary">
            <li>
              <a
                href="#home"
                className={`menu-item hover:bg-secondary hover:text-primary font-bold w-28 py-7 px-4 sm:p-7 xl:p-6 h-16
                  ${menuActive === "home" ? "bg-secondary text-primary" : ""}
                `}
              >
                home
              </a>
            </li>
            <li>
              <a
                href="#sobre"
                className={`menu-item hover:bg-secondary hover:text-primary font-bold w-28 py-7 px-4 sm:p-7 xl:p-6 h-16
                  ${menuActive === "sobre" ? "bg-secondary text-primary" : ""}
                `}
              >
                sobre
              </a>
            </li>
            <li>
              <a
                href="#atuação"
                className={`menu-item hover:bg-secondary hover:text-primary font-bold w-28 py-7 px-4 sm:p-7 xl:p-6 h-16
                  ${menuActive === "atuação" ? "bg-secondary text-primary" : ""}
                `}
              >
                atuação
              </a>
            </li>
            <li>
              <a
                href="#contato"
                className={`menu-item hover:bg-secondary hover:text-primary font-bold w-28 py-7 px-4 sm:p-7 xl:p-6 h-16
                  ${menuActive === "contato" ? "bg-secondary text-primary" : ""}
                `}
              >
                contato
              </a>
            </li>
            <li className="right-3 absolute">
              <a
                href="/signin"
                className={`menu-item hover:bg-secondary hover:text-primary font-bold w-28 py-7 px-4 sm:p-7 xl:p-6 h-16
                  ${menuActive === "Login" ? "bg-secondary text-primary" : ""}
                `}
              >
                Login
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section
          id="home"
          className="h-screen flex items-center justify-center"
        >
          <div className="p-10 rounded-lg">
            <h1 className="banner-word-1 text-5xl text-blue-500 pt-5">
              <Image
                alt="logo"
                src="/images/logoBlue.png"
                width={300}
                height={200}
              />
            </h1>
          </div>
        </section>

        <section
          id="sobre"
          className="sobre h-[600px] bg-gray-100 flex items-center justify-center"
        >
          <div>
            <div className="flex p-10 gap-6">
              <br />
              <h2>
                <b>S</b> - Sinergia
              </h2>
              <h2>
                <b>O</b> - Orientado a resultados
              </h2>
              <h2>
                <b>U</b> - Usabilidade
              </h2>
              <h2>
                <b>P</b> - Produtividade
              </h2>
              <h2>
                <b>E</b> - Estratégico
              </h2>
            </div>

            {/* <div className="w-[50rem] text-center">
              <p className="p-2">
                <b>Posicionamento claro:</b>
                <br /> Comunicar de forma consistente os benefícios da SOUPE,
                destacando sua sinergia entre funcionalidades, usabilidade
                intuitiva e o foco em resultados para o cliente.
              </p>
              <p className="p-2">
                <b>Segmentação de mercado:</b>
                <br /> Identificar setores e empresas que possam se beneficiar
                diretamente da solução SASS da SOUPE, direcionando esforços de
                vendas e marketing de forma mais precisa.
              </p>
              <p className="p-2">
                <b>Parcerias estratégicas:</b>
                <br /> Estabelecer parcerias com empresas complementares, como
                provedores de serviços relacionados ou consultores
                especializados, para expandir o alcance e oferecer soluções
                integradas.
              </p>
              <p className="p-2">
                <b>Demonstração eficaz:</b>
                <br /> Realizar demonstrações do sistema SOUPE, destacando seus
                recursos de usabilidade, interface intuitiva e a capacidade de
                fornecer resultados mensuráveis para os clientes.
              </p>
              <p className="p-2">
                <b>Programas de fidelidade:</b>
                <br /> Implementar programas de fidelidade para incentivar
                clientes existentes a continuarem utilizando a SOUPE e promover
                indicações para novos clientes.
              </p>
              <p className="p-2">
                <b>Suporte excepcional ao cliente:</b>
                <br /> Oferecer suporte técnico e atendimento ao cliente ágil,
                eficiente e personalizado, garantindo que os usuários obtenham o
                máximo valor do sistema.
              </p>
            </div> */}
          </div>
        </section>

        <section
          id="atuação"
          className="atuação h-[600px] bg-gray-200 flex items-center justify-center"
        >
          <div className="">
            <h1>Atuação</h1>
            <br />
            <h2>Salões de Beleza</h2>
            <h2>Barbearias</h2>
            <h2>Clinicas de Estética</h2>
            <h2>Clinica de Fisioterapia</h2>
          </div>
        </section>

        <section
          id="contato"
          className="contato h-[600px] bg-gray-300 flex items-center justify-center"
        >
          <h1>Contato</h1>
        </section>

        <section
          id="footer"
          className="h-[600px] bg-gray-100 flex items-center justify-center"
        >
          extra footer
        </section>

        <footer
          className={`fixed bottom-0 w-full bg-gray-800 text-white py-2 transition-opacity duration-500 ${
            isTop ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="container mx-auto text-center">
            <p>
              "Descubra o poder da SOUPE: Sinergia estratégica, usabilidade
              focada em resultados e produtividade otimizada!"
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
