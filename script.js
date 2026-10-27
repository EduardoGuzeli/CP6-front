// ========================================
// AURORA CAFÉ
// Funcionalidades em JavaScript
// ========================================

// Elementos do HTML
const botoesAdicionar = document.querySelectorAll(".botao-adicionar");
const botoesFiltro = document.querySelectorAll(".filtro");
const cardsProdutos = document.querySelectorAll(".produto-card");

const resumoPedido = document.querySelector("#resumo-pedido");
const totalPedido = document.querySelector("#total-pedido");
const botaoLimpar = document.querySelector("#limpar-pedido");

const notificacao = document.querySelector("#notificacao");
const menuToggle = document.querySelector(".menu-toggle");
const navegacao = document.querySelector(".navegacao");

// Lista que armazena os produtos escolhidos
let itensPedido = [];

let temporizadorNotificacao;


// Formata valores como moeda brasileira
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


// Exibe uma mensagem temporária na tela
function mostrarNotificacao(mensagem) {
    notificacao.textContent = mensagem;

    notificacao.classList.add("visivel");

    clearTimeout(temporizadorNotificacao);

    temporizadorNotificacao = setTimeout(() => {
        notificacao.classList.remove("visivel");
    }, 2600);
}


// Atualiza a quantidade de itens e o valor do pedido
function atualizarPedido() {
    const quantidade = itensPedido.length;

    const total = itensPedido.reduce(
        (soma, item) => soma + item.preco,
        0
    );

    if (quantidade === 0) {
        resumoPedido.textContent =
            "Você ainda não adicionou nenhum item.";
    } else {
        const nomes = itensPedido.map(item => item.nome);

        resumoPedido.textContent =
            `${quantidade} ${quantidade === 1 ? "item" : "itens"}: ${nomes.join(", ")}`;
    }

    totalPedido.textContent = formatarMoeda(total);

    botaoLimpar.disabled = quantidade === 0;
}


// Adiciona um produto ao pedido
function adicionarAoPedido(nome, preco) {
    itensPedido.push({
        nome: nome,
        preco: preco
    });

    atualizarPedido();

    mostrarNotificacao(
        `${nome} foi adicionado ao seu pedido.`
    );
}


// Filtra os produtos por categoria
function filtrarProdutos(categoria) {
    cardsProdutos.forEach(card => {
        const corresponde =
            categoria === "todos" ||
            card.dataset.categoria === categoria;

        card.hidden = !corresponde;
    });

    botoesFiltro.forEach(botao => {
        const selecionado =
            botao.dataset.filtro === categoria;

        botao.classList.toggle("ativo", selecionado);

        botao.setAttribute(
            "aria-pressed",
            String(selecionado)
        );
    });
}


// Configura os botões de adicionar
botoesAdicionar.forEach(botao => {
    botao.addEventListener("click", () => {
        const nome = botao.dataset.produto;

        const preco = Number(
            botao.dataset.preco
        );

        adicionarAoPedido(nome, preco);
    });
});


// Configura os filtros do cardápio
botoesFiltro.forEach(botao => {
    botao.setAttribute(
        "aria-pressed",
        String(botao.classList.contains("ativo"))
    );

    botao.addEventListener("click", () => {
        filtrarProdutos(botao.dataset.filtro);
    });
});


// Limpa os produtos selecionados
botaoLimpar.addEventListener("click", () => {
    itensPedido = [];

    atualizarPedido();

    mostrarNotificacao("Seu pedido foi limpo.");
});


// Abre e fecha o menu no celular
menuToggle.addEventListener("click", () => {
    const aberto =
        menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute(
        "aria-expanded",
        String(!aberto)
    );

    menuToggle.setAttribute(
        "aria-label",
        aberto ? "Abrir menu" : "Fechar menu"
    );

    navegacao.classList.toggle("aberto", !aberto);
});


// Fecha o menu após clicar em um link
document.querySelectorAll(".link-nav").forEach(link => {
    link.addEventListener("click", () => {
        navegacao.classList.remove("aberto");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Abrir menu"
        );
    });
});


// Atualiza o ano automaticamente no rodapé
document.querySelector("#ano-atual").textContent =
    new Date().getFullYear();


// Inicializa o resumo do pedido
atualizarPedido();