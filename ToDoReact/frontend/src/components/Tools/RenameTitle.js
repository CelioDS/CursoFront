import { useEffect } from "react";

export default function RenameTitle({ initialTitle }) {
  useEffect(() => {
    // Define o título da página
    document.title = initialTitle;
  }, [initialTitle]);

  return null; // O componente não renderiza nada na tela
}
