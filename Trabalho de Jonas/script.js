// ===== DADOS DOS ESMALTES =====
const esmaltes = [
    { 
        id: 1,
        nome: "PUNK GLOSS", 
        marca: "Colorama", 
        acabamento: "Gel", 
        imagem: "Nova pasta/img/imagem 1.png",
        descricao: "Um brilho intenso e moderno que traz atitude para suas unhas. Perfeito para quem quer se destacar!"
    },
    { 
        id: 2,
        nome: "GLOW KITTY", 
        marca: "Colorama", 
        acabamento: "Gel", 
        imagem: "Nova pasta/img/imagem 2.png",
        descricao: "Inspirado no estilo Sanrio, este esmalte gel oferece um brilho suave e elegante."
    },
    { 
        id: 3,
        nome: "BRILHO DOCE", 
        marca: "Colorama", 
        acabamento: "Gel", 
        imagem: "Nova pasta/img/imagem 3.png",
        descricao: "Uma cor doce com acabamento gel que combina sofisticação e diversão."
    },
    { 
        id: 4,
        nome: "NUVEM DE GLOW", 
        marca: "Colorama", 
        acabamento: "Gel", 
        imagem: "Nova pasta/img/imagem 4.png",
        descricao: "Leve como uma nuvem, brilhante como o glow. Ideal para looks delicados."
    },
    { 
        id: 5,
        nome: "HONEY", 
        marca: "Hello Kitty", 
        acabamento: "Cremoso", 
        imagem: "Nova pasta/img/imagem 5.jpeg",
        descricao: "Uma cor mel quente e confortável. Acabamento cremoso que hidrata as unhas."
    },
    { 
        id: 6,
        nome: "MOUSSE DE LIMÃO", 
        marca: "Hello Kitty", 
        acabamento: "Cremoso", 
        imagem: "Nova pasta/img/imagem 6.jpeg",
        descricao: "Fresco e vibrante, com a textura macia de um mousse. Perfeito para o verão!"
    },
    { 
        id: 7,
        nome: "BANANA SPLIT", 
        marca: "Hello Kitty", 
        acabamento: "Cremoso", 
        imagem: "Nova pasta/img/imagem 7.jpeg",
        descricao: "Doce e divertido, este esmalte traz a diversão do sorvete para suas unhas."
    },
    { 
        id: 8,
        nome: "MACARON", 
        marca: "Hello Kitty", 
        acabamento: "Cremoso", 
        imagem: "Nova pasta/img/imagem 8.jpeg",
        descricao: "Delicado como um macaron francês. Cores pastel que transmitem elegância."
    },
    { 
        id: 9,
        nome: "SUSPIRO", 
        marca: "Hello Kitty", 
        acabamento: "Cremoso", 
        imagem: "Nova pasta/img/imagem 9.jpeg",
        descricao: "Leve e aéreo, como um suspiro. Acabamento cremoso e confortável."
    },
    { 
        id: 10,
        nome: "JUJUBA", 
        marca: "Hello Kitty", 
        acabamento: "Cremoso", 
        imagem: "Nova pasta/img/imagem 10.jpeg",
        descricao: "Colorido e divertido, como uma jujuba. Traz alegria para o seu dia!"
    }
];

// ===== ELEMENTOS DO DOM =====
const catalogo = document.getElementById("catalogo");
const inputBusca = document.getElementById("inputBusca");
const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".close");
const filtrosBtns = document.querySelectorAll(".filtro-btn");

// ===== VARIÁVEIS DE CONTROLE =====
let filtroAtual = "todos";
let marcaFiltro = null;

// ===== FUNÇÃO: EXIBIR ESMALTES =====
function exibirEsmaltes(listaDeEsmaltes) {
    catalogo.innerHTML = "";

    if (listaDeEsmaltes.length === 0) {
        catalogo.innerHTML = `<p class="nenhum-resultado">😢 Nenhum esmalte encontrado. Tente outra busca!</p>`;
        return;
    }

    listaDeEsmaltes.forEach(esmalte => {
        const card = document.createElement("div");
        card.classList.add("esmalte-card");

        card.innerHTML = `
            <div class="container-foto">
                <img src="${esmalte.imagem}" alt="Esmalte ${esmalte.nome}" class="esmalte-foto">
            </div>
            <div class="esmalte-info">
                <div>
                    <h3>${esmalte.nome}</h3>
                    <p class="marca">${esmalte.marca}</p>
                </div>
                <span class="tag-acabamento">${esmalte.acabamento}</span>
                <button class="btn-detalhes">Ver Detalhes</button>
            </div>
        `;

        // Evento para abrir o modal
        card.querySelector(".btn-detalhes").addEventListener("click", () => {
            abrirModal(esmalte);
        });

        catalogo.appendChild(card);
    });
}

// ===== FUNÇÃO: FILTRAR ESMALTES =====
function filtrarEsmaltes() {
    const termoBusca = inputBusca.value.toLowerCase();
    
    let esmaltesFiltrados = esmaltes.filter(esmalte => {
        const matchBusca = 
            esmalte.nome.toLowerCase().includes(termoBusca) ||
            esmalte.marca.toLowerCase().includes(termoBusca) ||
            esmalte.acabamento.toLowerCase().includes(termoBusca);

        const matchAcabamento = 
            filtroAtual === "todos" || 
            esmalte.acabamento === filtroAtual;

        const matchMarca = 
            marcaFiltro === null || 
            esmalte.marca === marcaFiltro;

        return matchBusca && matchAcabamento && matchMarca;
    });

    exibirEsmaltes(esmaltesFiltrados);
}

// ===== FUNÇÃO: ABRIR MODAL =====
function abrirModal(esmalte) {
    document.getElementById("modalImagem").src = esmalte.imagem;
    document.getElementById("modalNome").textContent = esmalte.nome;
    document.getElementById("modalMarca").textContent = esmalte.marca;
    document.getElementById("modalAcabamento").textContent = esmalte.acabamento;
    document.getElementById("modalDescricao").textContent = esmalte.descricao;
    
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Impede scroll
}

// ===== FUNÇÃO: FECHAR MODAL =====
function fecharModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Restaura scroll
}

// ===== EVENTOS: BUSCA =====
inputBusca.addEventListener("input", filtrarEsmaltes);

// ===== EVENTOS: FILTROS =====
filtrosBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        // Remove classe ativa de todos os botões
        filtrosBtns.forEach(b => b.classList.remove("ativo"));
        
        // Adiciona classe ativa ao botão clicado
        btn.classList.add("ativo");

        // Atualiza os filtros
        if (btn.hasAttribute("data-filtro")) {
            filtroAtual = btn.getAttribute("data-filtro");
            marcaFiltro = null;
        } else if (btn.hasAttribute("data-marca")) {
            marcaFiltro = btn.getAttribute("data-marca");
            filtroAtual = "todos";
        }

        filtrarEsmaltes();
    });
});

// ===== EVENTOS: MODAL =====
closeBtn.addEventListener("click", fecharModal);

// Fechar modal ao clicar fora dele
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        fecharModal();
    }
});

// Fechar modal ao pressionar ESC
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        fecharModal();
    }
});

// ===== INICIALIZAÇÃO =====
exibirEsmaltes(esmaltes);
