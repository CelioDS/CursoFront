import styleExt from "./Footer.module.css";
import { BsLinkedin, BsGithub, BsEnvelope } from "react-icons/bs";

export default function Footer() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer className={styleExt.footer}>
      <section>
        <a href="mailto:celio01t@gmail.com">
          <BsEnvelope alt="email Icon" />
          <p>Email</p>
        </a>

        <a
          href="https://github.com/CelioDS"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsGithub alt="github Icon" />
          <p>Github</p>
        </a>
        <a
          href="https://www.linkedin.com/in/c%C3%A9lio-da-silva-3b20131b7/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsLinkedin alt="Linkedin Icon" />
          <p>Linkedin</p>
        </a>
      </section>
      <section>
        <p>
          Copyright <span>&copy;</span> <span id="ano">{anoAtual}</span> - Todos
          os direitos reservados
        </p>
        <a
          href="https://celiotech.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Criado e desenvolvido por <span>&nbsp;Célio</span>
        </a>
      </section>
    </footer>
  );
}
