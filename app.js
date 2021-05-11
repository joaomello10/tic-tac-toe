const playerX = "X"
const playerO = "O"
const boardCells = document.querySelectorAll('.board-cell');
const playerTurn = document.querySelector('#player-turn');
const modalOverlay = document.querySelector('#modal-overlay')
const winnerPlayerH1 = document.querySelector('#winner-player-h1');
const modal = document.querySelector('#modal');

let totalMoves = 0
let currentPlayer = playerX
let gameOver = false

function changePlayerTurn() {
    playerTurn.innerHTML = `Player : ${currentPlayer}`
}

boardCells.forEach((cell) => {
    cell.addEventListener('click',() => {
        if(gameOver){return}
        if(cell.innerHTML.length > 0){
            return
        }else{
            const CSSClass = currentPlayer == playerX ? "playerX" : 'playerO'
            const getCurrentPlayer = currentPlayer == playerX ? true : false

            if(getCurrentPlayer){
                cell.innerHTML = currentPlayer
                cell.classList.add(CSSClass)
                currentPlayer = playerO
            }else{
                cell.innerHTML = currentPlayer
                cell.classList.add(CSSClass)
                currentPlayer = playerX
            }
        }
        totalMoves++
        getWinner()
        changePlayerTurn()
    })
})

function checkMoves(a,b,c){
    let classA = a.classList[1]
    let classB = b.classList[1]
    let classC = c.classList[1]

    if(classA == classB && classA == classC && classA != undefined){
        gameOver = true
        let winnerPlayer = classA == 'playerX' ? "x" : "o"
        winnerPlayerH1.innerHTML = `Player ${winnerPlayer} won`
        totalMoves = 0

        setTimeout(() => {
            a.style.color = 'rgb(10, 99, 182)'
        }, 200);

        setTimeout(() => {
            b.style.color = 'rgb(10, 99, 182)'
        }, 300);

        setTimeout(() => {
            c.style.color = 'rgb(10, 99, 182)'
        }, 400);

        setTimeout(() => {
            modal.classList.add('slider')
            modalFunction.open()
        }, 800);
        modal.classList.remove('slider')
        return
    }

    if(totalMoves == 9){
        totalMoves = 0
        gameOver = true
        winnerPlayerH1.innerHTML = `Draw`
        setTimeout(() => {
            modal.classList.add('slider')
            modalFunction.open()
        }, 800);
        modal.classList.remove('slider')
        return
    }
}

function getWinner (){
    const cellsBoard = {
        a1 : document.querySelector('#a1'),
        a2 : document.querySelector('#a2'),
        a3 : document.querySelector('#a3'),

        b1 : document.querySelector('#b1'),
        b2 : document.querySelector('#b2'),
        b3 : document.querySelector('#b3'),

        c1 : document.querySelector('#c1'),
        c2 : document.querySelector('#c2'),
        c3 : document.querySelector('#c3'),
    }

    checkMoves(cellsBoard.a1,cellsBoard.a2,cellsBoard.a3)
    checkMoves(cellsBoard.b1,cellsBoard.b2,cellsBoard.b3)
    checkMoves(cellsBoard.c1,cellsBoard.c2,cellsBoard.c3)

    checkMoves(cellsBoard.a1,cellsBoard.b1,cellsBoard.c1)
    checkMoves(cellsBoard.a2,cellsBoard.b2,cellsBoard.c2)
    checkMoves(cellsBoard.a3,cellsBoard.b3,cellsBoard.c3)

    checkMoves(cellsBoard.a1,cellsBoard.b2,cellsBoard.c3)
    checkMoves(cellsBoard.a3,cellsBoard.b2,cellsBoard.c1)
}

function restart() {
    boardCells.forEach((cell) => {
        cell.innerHTML = ''
        cell.classList.remove('playerX')
        cell.classList.remove('playerO')
        cell.style.color = 'black'
    })
    currentPlayer = playerX
    gameOver = false
    playerTurn.innerHTML = `Player : ${currentPlayer}`
    modalFunction.close()
}

const modalFunction = {
   open(){
       modalOverlay.style.display = 'flex'
   },
   close(){
       modalOverlay.style.display = 'none'
   }
}
