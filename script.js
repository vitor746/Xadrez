const boardElement = document.getElementById('chess-board');
const statusElement = document.getElementById('game-status');

let selectedSquare = null;
let whiteTurn = true;

// Mapa de peças (Unicode para visual clássico e limpo)
const pieces = {
    white: {
        k: '♔', q: '♕', r: '♖', b: '♗', n: '♘', p: '♙'
    },
    black: {
        k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟'
    }
};

// Layout inicial
const initialLayout = [
    [pieces.black.r, pieces.black.n, pieces.black.b, pieces.black.q, pieces.black.k, pieces.black.b, pieces.black.n, pieces.black.r],
    [pieces.black.p, pieces.black.p, pieces.black.p, pieces.black.p, pieces.black.p, pieces.black.p, pieces.black.p, pieces.black.p],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    [pieces.white.p, pieces.white.p, pieces.white.p, pieces.white.p, pieces.white.p, pieces.white.p, pieces.white.p, pieces.white.p],
    [pieces.white.r, pieces.white.n, pieces.white.b, pieces.white.q, pieces.white.k, pieces.white.b, pieces.white.n, pieces.white.r]
];

function createBoard() {
    boardElement.innerHTML = '';
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const square = document.createElement('div');
            const isLight = (r + c) % 2 === 0;
            
            square.classList.add('square');
            square.classList.add(isLight ? 'light' : 'dark');
            square.dataset.row = r;
            square.dataset.col = c;
            square.innerHTML = initialLayout[r][c];
            
            square.addEventListener('click', () => handleSquareClick(square));
            boardElement.appendChild(square);
        }
    }
}

function handleSquareClick(square) {
    const piece = square.innerHTML;

    if (selectedSquare) {
        // Se clicar na mesma peça, desmarca
        if (selectedSquare === square) {
            deselect();
            return;
        }

        // Realiza o movimento (Lógica simplificada de troca)
        square.innerHTML = selectedSquare.innerHTML;
        selectedSquare.innerHTML = '';
        
        // Alterna turno
        whiteTurn = !whiteTurn;
        statusElement.innerText = whiteTurn ? "Vez das Brancas" : "Vez das Pretas";
        statusElement.style.color = whiteTurn ? "#f0f6fc" : "#2f81f7";

        deselect();
    } else {
        // Seleciona apenas se o quadrado não estiver vazio
        if (piece !== '') {
            selectedSquare = square;
            square.classList.add('selected');
        }
    }
}

function deselect() {
    if (selectedSquare) {
        selectedSquare.classList.remove('selected');
        selectedSquare = null;
    }
}

// Iniciar
window.onload = createBoard;
