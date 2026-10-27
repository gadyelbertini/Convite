const triangulo = document.getElementById("triangulo");
const caixa = document.getElementById("caixa");
const borda = document.getElementById("borda");
const content = document.getElementById("content");

const head = document.getElementById("head");
const footer = document.getElementById("footer");
const confirmar = document.getElementById("confirmar");

const videoEsquerdo = document.getElementById('meuVideoEsquerdo');
const videoDireito = document.getElementById('meuVideoDireito');

const qr_code = document.getElementById("qr-code");

window.addEventListener("scroll", () => {
  head.style.height = `${videoDireito.offsetHeight}px`;
  qr_code.style.height = `${qr_code.offsetWidth}px`;

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

function localizacao() {
  const latitude = -20.059085839094188;
    const longitude = -50.53344614353074;

    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;

    window.open(url, "_blank");
}

const popup = document.getElementById("popup");

confirmar.addEventListener("click", () => {
  popup.style.display = "flex";
});

window.addEventListener("click", (event) => {
  if (event.target === popup) {
    popup.style.display = "none";
  }
});

document.getElementById("rsvpForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;

  const formData = new FormData();
  formData.append("entry.1617251236", nome);

  await fetch(
    "https://docs.google.com/forms/d/e/1FAIpQLScwpbrItxRivMqoKyk4G0jZ3Ut0g7uok4jDWjJdTtXySFTdmg/formResponse",
    {
      method: "POST",
      mode: "no-cors",
      body: formData
    }
  );

  popup.style.display = "none";
});

function copiarTexto() {
    navigator.clipboard.writeText("00020126580014br.gov.bcb.pix01361d7261e9-a630-444f-a752-c6b158f711605204000053039865802BR5923GADYEL BERTINI DA SILVA6009Sao Paulo62290525REC6ADFD354614359597640236304CB5E");
}