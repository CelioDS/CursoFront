const FormTarefa = document.getElementById("formulario");
const listTarefa = document.getElementById("list-tarefa");
const tarefa = document.getElementById("tarefa");

FormTarefa.addEventListener("submit", (e) => {
  const obj = {
    tarefa: tarefa.value,
    concluido: false,
  };

  localStorage.setItem(tarefa.value, JSON.stringify(obj));
});

//localStorage.clear()

function listarTarefas() {
  for (var i = 0; i < localStorage.length; i++) {
    const h3 = document.createElement("h5");
    const div = document.createElement("div");
    const button = document.createElement("button");
    const divButton = document.createElement("div");
    const buttonConcluido = document.createElement("button");

    div.className = "divList"; /* excluir se não usar */
    divButton.classList.add("divButton");

    /** adcionar um class para o item quando concluido e deixa ele apgado */

    var chave = localStorage.key(i); // Obtém a chave atual
    var valor = JSON.parse(localStorage.getItem(chave)); // Obtém o valor associado à chave

    h3.innerText = valor.tarefa;
    button.innerHTML = "&#120;";
    buttonConcluido.innerHTML = "&#10003;";

    buttonConcluido.onclick = () => {
      console.log(JSON.parse(localStorage.getItem(chave)));
    };

    if (valor.concluido) {
      div.classList.add("concluido");
    }

    div.appendChild(h3);
    divButton.appendChild(button);
    divButton.appendChild(buttonConcluido);

    div.appendChild(divButton);

    listTarefa.appendChild(div);
  }
}
listarTarefas();
