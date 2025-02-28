//CARROSSEL

function mostrarCarrossel(indice, carrosselInterno, totalItens) {
  if (indice >= totalItens) {
    indice = 0;
  } else if (indice < 0) {
    indice = totalItens - 1;
  }

  const offset = -indice * 100;
  carrosselInterno.style.transform = `translateX(${offset}%)`;
  return indice;
}

document.querySelectorAll("[data-carrossel]").forEach((carrossel) => {
  let indiceAtual = 0;
  const carrosselInterno = carrossel.querySelector("[data-carrossel-interno]");
  const totalItens = carrossel.querySelectorAll("[data-carrossel-item]").length;

  carrossel
    .querySelector("[data-carrossel-prev]")
    .addEventListener("click", () => {
      indiceAtual = mostrarCarrossel(
        indiceAtual - 1,
        carrosselInterno,
        totalItens
      );
    });

  carrossel
    .querySelector("[data-carrossel-next]")
    .addEventListener("click", () => {
      indiceAtual = mostrarCarrossel(
        indiceAtual + 1,
        carrosselInterno,
        totalItens
      );
    });
});

//Barra de progresso da seção Skills

function animarBarraDeProgresso() {
  const barraDeProgresso = document.querySelectorAll(".progresso"); //seleciona todas as barras de progresso

  barraDeProgresso.forEach((barra) => {
    //barra = representa cada barra individualmente

    //Pegando o valor da porcentagem da barra pelo atributo data-progresso
    const valor = barra.getAttribute("data-progresso");

    barra.style.width = valor + "%"; //definindo a largura da barra de progresso
  });
}

//funcao que reseta a barra de progresso
function resetarBarraDeProgresso() {
  const barraDeProgresso = document.querySelectorAll(".progresso");

  barraDeProgresso.forEach((barra) => {
    barra.style.width = "0%";
  });
}

//Função para animar a barra de progresso quando o usuário rolar a página

const observador = new IntersectionObserver((entries) => {
  //lista de elementos visiveis na tela
  entries.forEach((entry) => {
    //se o elemento estiver visivel
    if (entry.isIntersecting) {
      animarBarraDeProgresso();
    }
    //se o elemento nao estiver visivel
    else {
      resetarBarraDeProgresso();
    }
  });
});

//Observando a div skills__conteudo onde estão as habilidades

observador.observe(document.querySelector(".skills__conteudo"));

// Animação para os tópicos da seção Soft Skills
const observerSoftSkills = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("visible");
      }, index * 200); // Atraso de 200ms entre cada item
    }
  });
});

document.querySelectorAll(".soft-skill").forEach((skill) => {
  observerSoftSkills.observe(skill);
});

//    MUDAR IMAGEM DAS REDES SOCIAIS

function adicionarEventosDeImagem(link) {
  link.addEventListener("mouseover", function () {
    const newImgSrc = this.getAttribute("data-newImg");
    const imgElement = this.querySelector("img");
    imgElement.src = newImgSrc;
  });

  link.addEventListener("mouseout", function () {
    const defaultImgSrc = this.getAttribute("data-defaultImg");
    const imgElement = this.querySelector("img");
    imgElement.src = defaultImgSrc;
  });
}

document
  .querySelectorAll(".redes-contato__item a")
  .forEach(adicionarEventosDeImagem);
document.querySelectorAll(".rodape-redes a").forEach(adicionarEventosDeImagem);

// Função para rolar a página até o topo
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Mostrar ou esconder o botão de voltar ao topo e mudar a cor conforme o objeto abaixo dele
window.addEventListener("scroll", function () {
  const backToTopButton = document.getElementById("back-to-top");
  const apresentacaoSection = document.getElementById("apresentacao");
  const sections = document.querySelectorAll("section, footer");

  if (window.scrollY > apresentacaoSection.offsetHeight) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }

  // Verificar se o botão está sobre um objeto com a cor de fundo igual à cor secundária
  let isOverlapping = false;

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (
      rect.top <= window.innerHeight &&
      rect.bottom >= 0 &&
      window.getComputedStyle(section).backgroundColor === "rgb(108, 117, 125)" // Cor secundária em RGB
    ) {
      isOverlapping = true;
    }
  });

  // Verificar se o botão está sobre a seção curiosidade
  const curiosidadeSection = document.getElementById("curiosidade");
  const curiosidadeRect = curiosidadeSection.getBoundingClientRect();
  const isOverCuriosidade =
    curiosidadeRect.top <= window.innerHeight && curiosidadeRect.bottom >= 0;

  if (isOverlapping && !isOverCuriosidade) {
    backToTopButton.style.backgroundColor = "var(--primary-color)";
  } else {
    backToTopButton.style.backgroundColor = "var(--secondary-color)";
  }
});

// MAPA INTERATIVO

//Iniciando o mapa e definindo a visualização incial
//L.map = cria o mapa
var map = L.map("mapid").setView([-18.9186, -48.2772], 12); //coordenadas Uberlândia

//Adicionando camada de tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
}).addTo(map);

//Adicionando marcadores
var markerFaculdade = L.marker([-18.918300283324573, -48.25826208883107]).addTo(
  map
);
markerFaculdade
  .bindPopup(
    "<b>UFU - Universidade Federal de Uberlândia</b><br>Faculdade que estou atualmente."
  )
  .openPopup();

var markerIFTM = L.marker([-18.932655777167977, -48.28007040001174]).addTo(map);
markerIFTM.bindPopup(
  "<b>IFTM - Instituto Federal do Triângulo Mineiro Campus Centro</b><br>Onde fiz curso técnico de Redes de Computadores."
);
