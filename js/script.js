const FormTarefa = document.getElementById("formulario");
const listTarefa = document.getElementById("list-tarefa");
const tarefa = document.getElementById("tarefa");

const arrayTarefas = [];

function GetTarefas() {
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);

    arrayTarefas.push(value);
  }
}
console.log(arrayTarefas);

FormTarefa.addEventListener("submit", (e) => {
  localStorage.setItem(tarefa.value, tarefa.value);
});

function listarTarefas() {
  for (var i = 0; i < localStorage.length; i++) {
    const div = document.createElement("div");
    const button = document.createElement("button");
    const h3 = document.createElement("h5");

    var chave = localStorage.key(i); // Obtém a chave atual
    var valor = localStorage.getItem(chave); // Obtém o valor associado à chave

    h3.innerText = valor;
    button.innerHTML = "&#120;";

    div.appendChild(h3);
    div.appendChild(button);
    div.className = "divList"; /* excluir se não usar */
    listTarefa.appendChild(div);
  }
}
listarTarefas();
