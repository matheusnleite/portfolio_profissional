let indiceAtual = 0;

function mostrarSection(indice) {
  const carrosselInterno = document.querySelector(".carrossel__interno");
  const totalItens = document.querySelectorAll(".carrossel__item").length;

  if (indice >= totalItens) {
    indiceAtual = 0;
  } else if (indice < 0) {
    indiceAtual = totalItens - 1;
  } else {
    indiceAtual = indice;
  }

  const offset = -indiceAtual * 100;
  carrosselInterno.style.transform = `translateX(${offset}%)`;
}

function nextSection() {
  mostrarSection(indiceAtual + 1);
}

function prevSection() {
  mostrarSection(indiceAtual - 1);
}
