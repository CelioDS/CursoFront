const AddTarefa = document.getElementById("formulario");
const listTarefa = document.getElementById("list-tarefa");
const listTarefaFeitas = document.getElementById("list-tarefa-feitas");
const tarefa = document.getElementById("tarefa");
const Loading = document.getElementById("loading");
const LoadingFeitos = document.getElementById("loading-feitos");
const Tema = document.getElementById("tema");

const dataAtual = new Date();
const dataAtualPT = dataAtual.toLocaleDateString("pt-BR");
const horaAtualPT = dataAtual.toLocaleTimeString("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
});

const arrayTarefas = [];

// Verifica o tema é dark e aplica o mesmo
if (JSON.parse(localStorage.getItem("TemaSite%")) === "tema dark") {
  document.body.classList.add("dark-theme");
}

// Evento para a troca do tema
Tema.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");

  document.body.classList.contains("dark-theme")
    ? (Tema.innerHTML = "Light")
    : (Tema.innerHTML = "Dark");

  localStorage.setItem("TemaSite%", JSON.stringify(Tema.innerHTML));
});

// Evento para adicionar as tarefas ao localstorage
AddTarefa.addEventListener("submit", (e) => {
  if (arrayTarefas.includes(tarefa.value) || tarefa.value.trim() == "") {
    e.preventDefault();
    AddTarefa.classList.add("Error");

    tarefa.value = "";
    tarefa.placeholder = "Valor inserido inválido";
    setTimeout(() => {
      AddTarefa.classList.remove("Error");
      tarefa.placeholder = "Digite sua tarefa aqui";
    }, 1000);
  } else {
    const obj = {
      tarefa: tarefa.value.toLowerCase(),
      data: horaAtualPT + " " + dataAtualPT,
      concluido: false,
    };

    localStorage.setItem(tarefa.value.toLowerCase(), JSON.stringify(obj));
  }
});

localStorage.clear()

// função para criar elementos e categorizar os mesmos
function listarTarefas() {
  for (let i = 0; i < localStorage.length; i++) {
    const h5 = criarElemento("h4");
    const Textoh6 = criarElemento("h5");
    const div = criarElemento("div");
    const div2 = criarElemento("div");
    const textoData = criarElemento("h6");
    const divButton = criarElemento("div");
    const buttonExcluir = criarElemento("button");
    const buttonConcluido = criarElemento("button");

    buttonExcluir.title = "Excluir";
    buttonConcluido.title = "Concluir";

    divButton.classList.add("divButton");

    let chave = localStorage.key(i); // Obtém a chave atual
    let valor = JSON.parse(localStorage.getItem(chave)); // Obtém o valor associado à chave

    Tema.innerHTML = JSON.parse(localStorage.getItem("TemaSite%"));

    if (chave != "TemaSite%") {
      h5.innerText = valor.tarefa;
      textoData.innerText = valor.data;

      buttonExcluir.innerHTML = "&#120;";
      buttonConcluido.innerHTML = "&#10003;";

      if (valor.concluido) {
        div2.classList.add("concluido");
      }

      if (valor.concluido) {
        div2.appendChild(h5);
        Textoh6.innerText = "Finalizado";
        div2.appendChild(Textoh6);
        div2.appendChild(textoData);
        div2.appendChild(divButton);
        listTarefaFeitas.appendChild(div2);
        divButton.appendChild(buttonExcluir);

        LoadingFeitos.style.display = "none";
      } else {
        Textoh6.innerText = "Pendente";
        div.appendChild(h5);
        div.appendChild(Textoh6);
        div.appendChild(textoData);
        div.appendChild(divButton);
        listTarefa.appendChild(div);
        divButton.appendChild(buttonExcluir);
        divButton.appendChild(buttonConcluido);
        Loading.style.display = "none";
      }

      CRUD(buttonConcluido, buttonExcluir, chave);

      arrayTarefas.push(valor.tarefa);
    }
  }
}

// função criar elementos html
function criarElemento(elemento) {
  const ElementoCriado = document.createElement(elemento);
  return ElementoCriado;
}

// Função CRUD na verdade so U e D
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

// chama a função
listarTarefas();
