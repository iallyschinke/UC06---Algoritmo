const formProduto = document.getElementById("formProduto");
const campoProduto = document.getElementById("produto");

const listaProdutos = document.getElementById("listaProdutos");
const listaVazia = document.getElementById("listaVazia");

const mensagem = document.getElementById("mensagem");
const quantidadeProdutos = document.getElementById("quantidadeProdutos");

const btnLimparLista = document.getElementById("btnLimparLista");

/*
  Recupera os produtos salvos no localStorage.

  Se ainda não existir uma lista salva,
  começa com um vetor vazio.
*/
let produtos = JSON.parse(localStorage.getItem("listaDeCompras")) || [];

/*
  Salva o vetor de produtos no localStorage.
*/
function salvarProdutos() {
  localStorage.setItem("listaDeCompras", JSON.stringify(produtos));
}

/*
  Ordena os produtos alfabeticamente,
  ignorando diferenças entre letras
  maiúsculas, minúsculas e acentos.
*/
function ordenarProdutos() {
  produtos.sort(function (produtoA, produtoB) {
    return produtoA.localeCompare(produtoB, "pt-BR", {
      sensitivity: "base",
    });
  });
}

/*
  Atualiza a quantidade de produtos exibida.
*/
function atualizarQuantidade() {
  const quantidade = produtos.length;

  if (quantidade === 1) {
    quantidadeProdutos.textContent = "1 item";
  } else {
    quantidadeProdutos.textContent = `${quantidade} itens`;
  }
}

/*
  Exibe todos os produtos na tela.
*/
function exibirProdutos() {
  ordenarProdutos();

  listaProdutos.innerHTML = "";

  if (produtos.length === 0) {
    listaVazia.classList.remove("oculto");
    btnLimparLista.classList.add("oculto");
  } else {
    listaVazia.classList.add("oculto");
    btnLimparLista.classList.remove("oculto");
  }

  produtos.forEach(function (produto, indice) {
    const itemLista = document.createElement("li");
    itemLista.classList.add("item-produto");

    const nomeProduto = document.createElement("span");
    nomeProduto.classList.add("nome-produto");
    nomeProduto.textContent = produto;

    const botaoExcluir = document.createElement("button");
    botaoExcluir.type = "button";
    botaoExcluir.classList.add("btn-excluir");
    botaoExcluir.textContent = "Excluir";

    botaoExcluir.addEventListener("click", function () {
      excluirProduto(indice);
    });

    itemLista.appendChild(nomeProduto);
    itemLista.appendChild(botaoExcluir);

    listaProdutos.appendChild(itemLista);
  });

  atualizarQuantidade();
  salvarProdutos();
}

/*
  Exibe uma mensagem de erro ou sucesso.
*/
function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;

  mensagem.classList.remove("erro", "sucesso");
  mensagem.classList.add(tipo);

  setTimeout(function () {
    mensagem.textContent = "";
    mensagem.classList.remove("erro", "sucesso");
  }, 2500);
}

/*
  Verifica se o produto já está cadastrado.
*/
function produtoJaExiste(novoProduto) {
  return produtos.some(function (produto) {
    return produto.toLowerCase() === novoProduto.toLowerCase();
  });
}

/*
  Adiciona um produto à lista.
*/
formProduto.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const novoProduto = campoProduto.value.trim();

  if (novoProduto === "") {
    mostrarMensagem("Digite o nome de um produto.", "erro");

    campoProduto.focus();
    return;
  }

  if (produtoJaExiste(novoProduto)) {
    mostrarMensagem("Esse produto já está na lista.", "erro");

    campoProduto.focus();
    return;
  }

  produtos.push(novoProduto);

  exibirProdutos();

  mostrarMensagem("Produto adicionado com sucesso!", "sucesso");

  formProduto.reset();
  campoProduto.focus();
});

/*
  Exclui um produto utilizando sua posição.
*/
function excluirProduto(indice) {
  produtos.splice(indice, 1);

  exibirProdutos();

  mostrarMensagem("Produto removido da lista.", "sucesso");
}

/*
  Remove todos os produtos cadastrados.
*/
btnLimparLista.addEventListener("click", function () {
  const desejaLimpar = confirm("Deseja realmente apagar toda a lista?");

  if (!desejaLimpar) {
    return;
  }

  produtos = [];

  exibirProdutos();

  mostrarMensagem("Lista de compras apagada.", "sucesso");

  campoProduto.focus();
});

/*
  Exibe os produtos salvos assim que
  a página for carregada.
*/
exibirProdutos();
