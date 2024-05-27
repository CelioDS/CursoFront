import Container from "../Layout/Container";

import Header from "../Layout/Header";

import "./Home.module.css";
import {useEffect} from "react"

export default function Home() {


useEffect(() => {
    // Define o título da página
    document.title = "Configuracao - fluxo de caixa";
 
    // Função de limpeza para desconectar o efeito ao desmontar o componente
    return () => {
      document.title = "Página anterior"; // Restaura o título original (opcional)
    };
  }, []); // Array vazio indica que o efeito será executado apenas uma vez
 

  return (
    <Container>
      <Header />
    </Container>
  );
}
