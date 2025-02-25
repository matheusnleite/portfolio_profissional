// Carrossel

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

// Carrossel dentro da div hard-skills

let indiceAtualSkills = 0;

function mostrarSkill(indice) {
  const carrosselInternoSkills = document.querySelector(
    ".carrossel__interno-skills"
  );
  const totalItensSkills = document.querySelectorAll(
    ".carrossel__item-skills"
  ).length;

  if (indice >= totalItensSkills) {
    indiceAtualSkills = 0;
  } else if (indice < 0) {
    indiceAtualSkills = totalItensSkills - 1;
  } else {
    indiceAtualSkills = indice;
  }

  const offset = -indiceAtualSkills * 100;
  carrosselInternoSkills.style.transform = `translateX(${offset}%)`;
}

function nextSkill() {
  mostrarSkill(indiceAtualSkills + 1);
}

function prevSkill() {
  mostrarSkill(indiceAtualSkills - 1);
}

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
