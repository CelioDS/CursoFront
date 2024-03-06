const FormTarefa = document.getElementById("formulario");
const listTarefa = document.getElementById("list-tarefa");
const tarefa = document.getElementById("tarefa");

FormTarefa.addEventListener("submit", (e) => {
  localStorage.setItem(tarefa.value, tarefa.value);
  console.log("Enviado");
  listarTarefas();
});

function listarTarefas() {
  for (var i = 0; i < localStorage.length; i++) {
    const div = document.createElement("div");
    const button = document.createElement("button");
    const h3 = document.createElement("h3");

    var chave = localStorage.key(i); // Obtém a chave atual
    var valor = localStorage.getItem(chave); // Obtém o valor associado à chave
    console.log(localStorage.key(i));

    h3.innerText = valor;
    button.innerHTML = "&#120;";

    div.appendChild(h3);
    div.appendChild(button);
    listTarefa.appendChild(div);
  }
}

listarTarefas();
