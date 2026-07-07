const mensagemVisita = document.getElementById("mensagemVisita");
const numeroVisitas = document.getElementById("numeroVisitas");
const btnReiniciar = document.getElementById("btnReiniciar");

/*
  Busca no localStorage o número de visitas.

  Na primeira vez, o valor ainda não existe.
*/

let visitas = localStorage.getItem("contadorVisitas");

if (visitas === null) {
  /*
    Primeira visita:
    cria o contador com o valor 1.
  */
  visitas = 1;

  mensagemVisita.textContent = "Muito Bem-Vindo!";
} else {
  /*
    Nas próximas visitas:
    converte o valor salvo para número e acrescenta 1.
  */
  visitas = Number(visitas) + 1;

  mensagemVisita.textContent = `Que bom que você voltou! Esta é a sua visita de número ${visitas}.`;
}

/*
  Salva o novo número de visitas no navegador.
*/

localStorage.setItem("contadorVisitas", visitas);

/*
  Exibe o número dentro do cartão.
*/

numeroVisitas.textContent = visitas;

/*
  Reinicia o contador ao clicar no botão.
*/

btnReiniciar.addEventListener("click", function () {
  localStorage.removeItem("contadorVisitas");

  mensagemVisita.textContent =
    "Contador reiniciado! Atualiza a página para iniciar novamente.";

  numeroVisitas.textContent = "0";
});
