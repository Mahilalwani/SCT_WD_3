const boardElement=document.getElementById('board');
const messageElement=document.getElementById('message');
const resetButton=document.getElementById('resetButton');
const playerModeButton=document.getElementById('playerModeButton');
const computerModeButton=document.getElementById('computerModeButton');


let board=['','','','','','','','',''];
let currentPlayer='X';
let isGameActive=true;
let isComputerMode=false;

const winningCombinations=[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];
function renderBoard(){
    boardElement.innerHTML='';
    board.forEach((cell,index)=>{
        const cellElement=document.createElement('div');
        cellElement.classList.add('cell');
        if(cell){
            cellElement.classList.add('taken');
            cellElement.textContent=cell;
        }
        cellElement.addEventListener('click',()=>handleCellClick(index)
        );
        boardElement.appendChild(cellElement);
    });
}
function handleCellClick(index){
    if(board[index]||!isGameActive)
return;
    board[index]=currentPlayer;
    renderBoard();
    checkWinner();
    if(isGameActive){
    currentPlayer=currentPlayer==='X'?'O':'X';
        messageElement.textContent=`Player ${currentPlayer}'s turn`;
        if(isComputerMode && currentPlayer==='O'){
            setTimeout(computerMove,500);
        }
    }
    }
    function computerMove(){
        let availableCells=board.map((cell,index)=>(cell==='' ? index:null)).filter(index=>index!==null);
        if (availableCells.length===0)return;
        const randomIndex=Math.floor(Math.random()*availableCells.length);
        const cellIndex=availableCells[randomIndex];
        board[cellIndex]='O';
        renderBoard();
        checkWinner();
        if(isGameActive){
            currentPlayer='X';
            messageElement.textContent=`Player ${currentPlayer}'s turn`;
        }
    }
    function checkWinner(){
        let roundWon=false;
        for(let combination of winningCombinations){
            const[a,b,c]=combination;
            if (board[a]&&board[a]===board[b]&&board[a]===board[c]){
                roundWon=true;
                break;
            }
        }
        if(roundWon){
            messageElement.textContent=`Player ${currentPlayer} wins!`;
            isGameActive=false;
            return;
        }
        if(!board.includes('')){
            messageElement.textContent='It\'s a tie!';
            isGameActive=false;
        }
    }
    resetButton.addEventListener('click',()=>{
        board=['','','','','','','','',''];
        currentPlayer='X';
        isGameActive=true;
        messageElement.textContent=`Player ${currentPlayer}'s turn`;
        renderBoard();
    });
    playerModeButton.addEventListener('click',()=>{
        isComputerMode=false;
        board=['','','','','','','','',''];
        currentPlayer='X';
        isGameActive=true;
        messageElement.textContent=`Player ${currentPlayer}'s turn`;
        renderBoard();
    });
    computerModeButton.addEventListener('click',()=>{
        isComputerMode=true;
        board=['','','','','','','','',''];
        currentPlayer='X';
        isGameActive=true;
        messageElement.textContent=`Player ${currentPlayer}'s turn`;
        renderBoard();
    });
    renderBoard();
    messageElement.textContent=`Player ${currentPlayer}'s turn`;