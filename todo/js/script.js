const AddTarefa = document.getElementById("formulario");
const listTarefa = document.getElementById("list-tarefa");
const listTarefaFeitas = document.getElementById("list-tarefa-feitas");
const tarefa = document.getElementById("tarefa");
const Loading = document.getElementById("loading");
const LoadingFeitos = document.getElementById("loading-feitos");
const Tema = document.getElementById("tema");

const OBJTarefas = [];

// Evento para adicionar as tarefas ao localstorage
AddTarefa.addEventListener("submit", (e) => {
  const tarefaUpdate = OBJTarefas.find(
    (searchTarefa) =>
      searchTarefa.tarefa === tarefa.value && searchTarefa.concluido === true
  );

  if (
    OBJTarefas.includes(tarefa.value) ||
    tarefa.value.trim() == "" ||
    OBJTarefas.find((searchTarefa) => searchTarefa.concluido === false)
  ) {
    e.preventDefault();
    AddTarefa.classList.add("Error");
    tarefa.value = "";
    tarefa.placeholder = "Valor inserido inválido";

    setTimeout(() => {
      AddTarefa.classList.remove("Error");
      tarefa.placeholder = "Digite sua tarefa aqui";
    }, 1000);
  } else if (tarefaUpdate) {
    const obj = CriarOBJ(tarefa.value.toLowerCase(), (tarefaUpdate.qtd += 1));
    localStorage.setItem(tarefaUpdate.tarefa, JSON.stringify(obj));
  } else {
    const obj = CriarOBJ(tarefa.value.toLowerCase(), 1);
    localStorage.setItem(tarefa.value.toLowerCase(), JSON.stringify(obj));
  }
});

//localStorage.clear()

// função para criar elementos e categorizar os mesmos
function listarTarefas() {
  for (let i = 0; i < localStorage.length; i++) {
    let chave = localStorage.key(i); // Obtém a chave atual
    let valor = JSON.parse(localStorage.getItem(chave)); // Obtém o valor associado à chave
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
    Tema.innerHTML = JSON.parse(localStorage.getItem("TemaSite%"));

    if (chave != "TemaSite%") {
      const qtdTarefa = valor.qtd >= 2 ? valor.qtd : "";
      h5.innerText = valor.tarefa + " " + qtdTarefa;
      textoData.innerText = valor.data;
      buttonExcluir.innerHTML = "&#120;";
      buttonConcluido.innerHTML = "&#10003;";
      valor.concluido ? div2.classList.add("concluido") : "";
      if (valor.concluido) {
        div2.appendChild(h5);
        div2.appendChild(Textoh6);
        div2.appendChild(textoData);
        div2.appendChild(divButton);
        listTarefaFeitas.appendChild(div2);
        divButton.appendChild(buttonExcluir);
        Textoh6.innerText = "Finalizado";
        LoadingFeitos.style.display = "none";
      } else {
        div.appendChild(h5);
        div.appendChild(Textoh6);
        div.appendChild(textoData);
        div.appendChild(divButton);
        listTarefa.appendChild(div);
        divButton.appendChild(buttonExcluir);
        divButton.appendChild(buttonConcluido);
        Textoh6.innerText = "Pendente";
        Loading.style.display = "none";
      }
      CRUD(buttonConcluido, buttonExcluir, chave);
      OBJTarefas.push(valor);
    }
  }
}

// Verifica o tema
function MudarTema(Tema) {
  // Verifica se o tema é dark e aplica o mesmo
  if (JSON.parse(localStorage.getItem("TemaSite%")) === "🌕") {
    document.body.classList.add("dark-theme");
  }

  // Evento para a troca do tema
  Tema.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    document.body.classList.contains("dark-theme")
      ? (Tema.innerHTML = "🌕")
      : (Tema.innerHTML = "🌑");

    localStorage.setItem("TemaSite%", JSON.stringify(Tema.innerHTML));
  });
}

//Criar obj
function CriarOBJ(tarefa, qtd) {
  const dataAtual = new Date();
  const dataAtualPT = dataAtual.toLocaleDateString("pt-BR");
  const horaAtualPT = dataAtual.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return {
    tarefa,
    data: horaAtualPT + " " + dataAtualPT,
    qtd,
    concluido: false,
  };
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

// chama as funções
listarTarefas();
MudarTema(Tema);
