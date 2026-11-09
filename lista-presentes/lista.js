const API = "https://lista-itens-casamento.onrender.com";

const content = document.querySelector(".content");

let todosItens = [];

function renderizarItens(itens) {
    content.innerHTML = "";

    itens.forEach(item => {
        content.innerHTML += `
            <div class="card" onclick="popUp(${item.id})">
                <div class="image">
                    <div class="image-fundo">
                        <img src="${item.foto_exemplo}" alt="${item.nome}">
                    </div>
                </div>
                <div class="conteudo">
                    <p>${item.nome}</p>
                </div>
            </div>
        `;
    });

	content.innerHTML +=`
		<div class="qr-code" id="qr-code" onclick="copiarTexto()">
			<h2>Nos ajude nessa nova etapa</h2>
			<img src="./../Assets/midia/imags/qr-by-koloqr-com.png" alt="qr_code">
			<h3>Click para copiar!</h3>
		</div>
	`;
}

async function carregarItens() {
    try {
        const itens = await fetch(`${API}/itens`)
            .then(r => r.json());

        renderizarItens(
            itens.filter(item => item.presente)
        );

    } catch (erro) {
        console.error("Erro ao carregar itens:", erro);
    }
}

carregarItens();

function copiarTexto() {
    navigator.clipboard.writeText("00020126580014br.gov.bcb.pix01361d7261e9-a630-444f-a752-c6b158f711605204000053039865802BR5923GADYEL BERTINI DA SILVA6009Sao Paulo62290525REC6ADFD354614359597640236304CB5E");
}

async function popUp(id) {
	document.getElementById("pop-up").style.display = "flex";

	try {
        const item = await fetch(`${API}/itens/${id}`)
            .then(r => r.json());

			document.getElementById("car").innerHTML = `
				<div class="imgg">
					<div class="imggg">
						<img src="${item.foto_exemplo}">
					</div>
				</div>
				<div class="infos">
					<h2>${item.nome}</h2>
					<h3 onclick="window.open('${item.link_exemplo}', '_blank')">>>> Link >>></h3>
				</div>
			`;
	} catch (erro) {
        console.error("Erro ao carregar item:", erro);
    }
}


function fecharPopUp() {
	document.getElementById("pop-up").style.display = "none";
	document.getElementById("car").innerHTML = ``;
}