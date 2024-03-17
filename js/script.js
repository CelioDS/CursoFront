const AddTarefa = document.getElementById("formulario");
const listTarefa = document.getElementById("list-tarefa");
const tarefa = document.getElementById("tarefa");
const Loading = document.getElementById("loading");

const arrayTarefas = [];

AddTarefa.addEventListener("submit", (e) => {
  if (arrayTarefas.includes(tarefa.value) || tarefa.value.trim() == "") {
    e.preventDefault();
    AddTarefa.classList.add("Error");

    tarefa.value = "";
    tarefa.placeholder = "Tarefa ja inserida";
    setTimeout(() => {
      AddTarefa.classList.remove("Error");
      tarefa.placeholder = "Digite sua tarefa aqui";
    }, 1000);
  } else {
    const obj = {
      tarefa: tarefa.value,
      concluido: false,
    };

    localStorage.setItem(tarefa.value.toLowerCase(), JSON.stringify(obj));
  }
});

//localStorage.clear()

function listarTarefas() {
  for (let i = 0; i < localStorage.length; i++) {
    const h5 = criarElemento("h5");
    const div = criarElemento("div");
    const divButton = criarElemento("div");
    const buttonExcluir = criarElemento("button");
    const buttonConcluido = criarElemento("button");

    divButton.classList.add("divButton");

    let chave = localStorage.key(i); // Obtém a chave atual
    let valor = JSON.parse(localStorage.getItem(chave)); // Obtém o valor associado à chave

    h5.innerText = valor.tarefa;
    buttonExcluir.innerHTML = "&#120;";
    buttonConcluido.innerHTML = "&#10003;";

    if (valor.concluido) {
      div.classList.add("concluido");
    }

    CRUD(buttonConcluido, buttonExcluir, chave);

    div.appendChild(h5);
    div.appendChild(divButton);
    listTarefa.appendChild(div);
    divButton.appendChild(buttonExcluir);
    divButton.appendChild(buttonConcluido);

    Loading.style.display = "none";

    arrayTarefas.push(valor.tarefa);
  }
}
listarTarefas();

function criarElemento(elemento) {
  const celemento = document.createElement(elemento);
  return celemento;
}

function CRUD(buttonConcluido, buttonExcluir, chave) {
  buttonConcluido.onclick = () => {
    const obj = JSON.parse(localStorage.getItem(chave));
    obj.concluido = !obj.concluido;
    localStorage.setItem(obj.tarefa, JSON.stringify(obj));
    window.location.reload();
  };

  buttonExcluir.onclick = () => {
    localStorage.removeItem(chave);
    window.location.reload();
  };
}
