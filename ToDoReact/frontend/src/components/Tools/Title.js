import  { useEffect } from 'react';
 
export default function Title({nome}) {
  useEffect(() => {
    // Define o título da página
    document.title = {nome};
 
    // Função de limpeza para desconectar o efeito ao desmontar o componente
    
  }, []); // Array vazio indica que o efeito será executado apenas uma vez
 
  
}
 
