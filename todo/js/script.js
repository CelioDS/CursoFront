const AddTarefa = document.getElementById("formulario");
const ListTarefa = document.getElementById("list-tarefa");
const ListTarefaFeitas = document.getElementById("list-tarefa-feitas");
const Tarefa = document.getElementById("tarefa");
const Loading = document.getElementById("loading");
const LoadingFeitos = document.getElementById("loading-feitos");
const Tema = document.getElementById("btnTema");
const IconeTema = document.getElementById("IconeTema");

const OBJTarefas = [];

// Evento para adicionar as tarefas ao localstorage
AddTarefa.addEventListener("submit", (e) => {
  const tarefaUpdate = OBJTarefas.find(
    (searchTarefa) =>
      searchTarefa.tarefa === Tarefa.value && searchTarefa.concluido === true
  );

  if (
    OBJTarefas.includes(Tarefa.value) ||
    Tarefa.value.trim() == "" ||
    OBJTarefas.find((searchTarefa) => searchTarefa.concluido === false)
  ) {
    e.preventDefault();
    AddTarefa.classList.add("Error");
    Tarefa.value = "";

    Tarefa.placeholder = "Valor inserido inválido";

    setTimeout(() => {
      AddTarefa.classList.remove("Error");
      Tarefa.placeholder = "Digite sua tarefa aqui";
    }, 1000);
  } else if (tarefaUpdate) {
    const obj = CriarOBJ(Tarefa.value.toLowerCase(), (tarefaUpdate.qtd += 1));
    localStorage.setItem(tarefaUpdate.tarefa, JSON.stringify(obj));
  } else {
    const obj = CriarOBJ(Tarefa.value.toLowerCase(), 1);
    localStorage.setItem(Tarefa.value.toLowerCase(), JSON.stringify(obj));
  }
});

//localStorage.clear()

// função para criar elementos e categorizar os mesmos
function ListarTarefas() {
  for (let i = 0; i < localStorage.length; i++) {
    let chave = localStorage.key(i); // Obtém a chave atual
    let valor = JSON.parse(localStorage.getItem(chave)); // Obtém o valor associado à chave
    const H5 = criarElemento("h4");
    const Textoh6 = criarElemento("h5");
    const Div = criarElemento("div");
    const Div2 = criarElemento("div");
    const TextoData = criarElemento("h6");
    const DivButton = criarElemento("div");
    const ButtonExcluir = criarElemento("button");
    const ButtonConcluido = criarElemento("button");

    ButtonExcluir.title = "Excluir";
    ButtonConcluido.title = "Concluir";
    DivButton.classList.add("divButton");
    Tema.innerHTML = JSON.parse(localStorage.getItem("TemaSite%"));

    if (chave != "TemaSite%") {
      const qtdTarefa = valor.qtd >= 2 ? valor.qtd : "";
      H5.innerText = valor.tarefa + " " + qtdTarefa;
      TextoData.innerText = valor.data;
      ButtonExcluir.innerHTML = "&#120;";
      ButtonConcluido.innerHTML = "&#10003;";
      valor.concluido ? Div2.classList.add("concluido") : "";
      if (valor.concluido) {
        Div2.appendChild(H5);
        Div2.appendChild(Textoh6);
        Div2.appendChild(TextoData);
        Div2.appendChild(DivButton);
        ListTarefaFeitas.appendChild(Div2);
        DivButton.appendChild(ButtonExcluir);
        Textoh6.innerText = "Finalizado";
        LoadingFeitos.style.display = "none";
      } else {
        Div.appendChild(H5);
        Div.appendChild(Textoh6);
        Div.appendChild(TextoData);
        Div.appendChild(DivButton);
        ListTarefa.appendChild(Div);
        DivButton.appendChild(ButtonExcluir);
        DivButton.appendChild(ButtonConcluido);
        Textoh6.innerText = "Pendente";
        Loading.style.display = "none";
      }
      CRUD(ButtonConcluido, ButtonExcluir, chave);
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
      ? (IconeTema.innerHTML = "🌕")
      : (IconeTema.innerHTML = "🌑");

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
function CRUD(ButtonConcluido, ButtonExcluir, chave) {
  ButtonConcluido.onclick = () => {
    const obj = JSON.parse(localStorage.getItem(chave));
    obj.concluido = !obj.concluido;
    localStorage.setItem(obj.tarefa, JSON.stringify(obj));
    window.location.reload();
  };

  ButtonExcluir.onclick = () => {
    localStorage.removeItem(chave);
    window.location.reload();
  };
}

// chama as funções
ListarTarefas();
MudarTema(Tema);
