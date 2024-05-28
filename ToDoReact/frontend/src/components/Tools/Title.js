import  { useEffect } from 'react';
 
export default function Title({nome}) {
  useEffect((nome) => {
    // Define o título da página
    document.title = {nome};
 
    // Função de limpeza para desconectar o efeito ao desmontar o componente
    
  }, [nome]); // Array vazio indica que o efeito será executado apenas uma vez
 
  
}
 
