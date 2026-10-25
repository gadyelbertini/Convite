const triangulo = document.getElementById("triangulo");
const caixa = document.getElementById("caixa");
const borda = document.getElementById("borda");
const content = document.getElementById("content");

const head = document.getElementById("head");
const footer = document.getElementById("footer");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const altura = scrollY/triangulo.offsetHeight*150;
  
  if (altura > 50) {
    footer.style.zIndex = "4";
    content.style.zIndex = "3";
  } else {
    footer.style.zIndex = "1";
    content.style.zIndex = "0";
  }

  if(content.style.width == "100%"){
    footer.style.zIndex = "0";
  }

  if (altura < 100) {
    triangulo.style.clipPath =  `polygon(-100% ${altura}%, 50% 50%, 200% ${altura}%)`;
    caixa.style.clipPath =  `polygon(-50% ${altura}%, 150% ${altura}%, 50% ${altura+20}%)`;
    borda.style.clipPath =  `polygon(-50% ${altura}%, 0% 100%, 100% 100%, 150% ${altura}%, 50% ${altura+20}%)`;
    if (altura > 80) {
      content.style.width = `${altura}%`;
    } else {
      content.style.width = "80%";
    }
  } else {
    triangulo.style.clipPath =  `polygon(-100% 100%, 50% 50%, 200% 100%)`;
    caixa.style.clipPath =  `polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)`;
    borda.style.clipPath =  `polygon(-50% 100%, 100% 100%, 100% 100%, 150% 100%, 50% 100%)`;
    content.style.width = "100%";
  }
});

const videoEsquerdo = document.getElementById('meuVideoEsquerdo');
const videoDireito = document.getElementById('meuVideoDireito');

window.addEventListener("load", () => {

  head.style.height = `${videoDireito.offsetHeight}px`;
})

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      videoEsquerdo.play();
      videoDireito.play();
    }
  });
},{
  threshold: 0.5
});

observer.observe(videoEsquerdo);
observer.observe(videoDireito);

function agenda() {
  const titulo = "Casamento de Débora e Gadyel";
  const local = "Chácara Recanto Alegre";
  const descricao = "Esperamos você para celebrar este momento especial!";

  const inicio = "20261119T180000";
  const fim = "20261119T210000";

  const url =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=" + encodeURIComponent(titulo) +
    "&dates=" + inicio + "/" + fim +
    "&location=" + encodeURIComponent(local) +
    "&details=" + encodeURIComponent(descricao);

  window.open(url, "_blank");
}