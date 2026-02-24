const tabuleiro = document.getElementById('tabuleiro');
let pecaSelecionada = null;

// Mapeamento das peças (Unicode)
const pecas iniciais = [
    ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
    ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
];

// Criar o tabuleiro
function criarTabuleiro() {
    for (let linha = 0; linha < 8; linha++) {
        for (let coluna = 0; coluna < 8; coluna++) {
            const quadrado = document.createElement('div');
            quadrado.classList.add('quadrado');
            
            // Definir cor alternada
            const cor = (linha + coluna) % 2 === 0 ? 'bege' : 'verde';
            quadrado.classList.add(cor);
            
            // Colocar peça inicial
            quadrado.innerText = pecas[linha][coluna];
            
            // Evento de clique
            quadrado.onclick = () => gerenciarClique(quadrado);
            
            tabuleiro.appendChild(quadrado);
        }
    }
}

function gerenciarClique(quadrado) {
    if (pecaSelecionada) {
        // Se já tem uma peça selecionada, move para o novo quadrado
        if (quadrado !== pecaSelecionada) {
            quadrado.innerText = pecaSelecionada.innerText;
            pecaSelecionada.innerText = '';
        }
        pecaSelecionada.classList.remove('selecionado');
        pecaSelecionada = null;
    } else {
        // Seleciona a peça se o quadrado não estiver vazio
        if (quadrado.innerText !== '') {
            pecaSelecionada = quadrado;
            quadrado.classList.add('selecionado');
        }
    }
}

criarTabuleiro();
