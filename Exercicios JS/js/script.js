window.addEventListener("load", (e) => {
  let nomeArquivo = window.location.pathname.split("/").pop().split(".")[0];
  document.title = nomeArquivo;
  const legenda = document.querySelector("legend");

  if (legenda) {
    legenda.innerHTML = nomeArquivo;
  }
});
