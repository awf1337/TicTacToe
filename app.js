let     playerTurn = 0,
        endGame = 0,
        playerOne = {
            names: '',
            symbol: ''
        },
        playerTwo = {
            names: '',
            symbol: ''
        },
        gameMode = {
            singlePlayer : false,
            multiPlayer : false,
            godMode : false
        };

const   turn = document.getElementById("turn"),
        boxes = document.querySelectorAll("#main div"),
        singlePlayerSettings = document.getElementById('singlePlayerSettings'),
        firstPlayerSettings = document.getElementById('firstPlayerSettings'),
        secondPlayerSettings = document.getElementById('secondPlayerSettings'),
        firstPlayerInputName = document.getElementById('firstPlayerInput'),
        secondPlayerInputName = document.getElementById('secondPlayerInput'),
        godModeSettings = document.getElementById('godModeSettings'),
        menuGameDiv = document.getElementById('menuGame');


// Tic Tac Toe Effect
    count = 0;
    setInterval(() => {
        const tictactoeColorEffect = ['tic','tac','toe']

        document.getElementById(tictactoeColorEffect[0]).style.color = "white";
        document.getElementById(tictactoeColorEffect[1]).style.color = "white";
        document.getElementById(tictactoeColorEffect[2]).style.color = "white";
        
        document.getElementById(tictactoeColorEffect[count]).style.color = "yellow";
        count +=1;
        if(count > 2) count = 0;
    },1000)

/* 
Single player mode render/settings inputs 
*/
document.getElementById('singlePlayer').onclick = () => {
    gameModeReset();
    hideGameSettings();
    playAgain();
    gameMode.singlePlayer = true;
    singlePlayerSettings.style.display = 'unset';
} 

document.getElementById('singlePlayerSymbolX').onclick = () => {
    playerOne.symbol = 'X';
    playerTwo.symbol = 'O';
    menuGameDiv.style.zIndex  = '-2';
}

document.getElementById('singlePlayerSymbolO').onclick = () => {
    playerOne.symbol = 'O';
    playerTwo.symbol = 'X';
    turn.textContent = "O turn now";
    menuGameDiv.style.zIndex  = '-2';

    //computer is X and should make first move 
    let random = Math.floor(Math.random() * boxes.length);
    boxes[random].textContent = playerTwo.symbol;
}
/* 
Multi player mode reder/settings inputs 
*/
document.getElementById('multiPlayer').onclick = () => {
    hideGameSettings();
    gameModeReset();
    firstPlayerSettings.style.display = 'unset';
    gameMode.multiPlayer = true;
} 

document.getElementById("FirstPlayerSymbolX").onclick = () => {
    if (firstPlayerInputName.value != '') {
        document.getElementById('firstPlayerDone').disabled = false;
        playerOne.symbol = 'X';
        playerTwo.symbol = 'O';
        playerTurn = 0;
    }
}

document.getElementById("FirstPlayerSymbolO").onclick = () => {
    if (firstPlayerInputName.value != '') {
        document.getElementById('firstPlayerDone').disabled = false;
        playerOne.symbol = 'O';
        playerTwo.symbol = 'X';  
        playerTurn = 1;   
    }
}

document.getElementById('firstPlayerDone').onclick = () => {
    firstPlayerSettings.style.display = "none";
    secondPlayerSettings.style.display = "unset";
}

document.getElementById('multiPlayerStart').onclick = () => {
    if(secondPlayerInputName.value !== ''){
        menuGameDiv.style.zIndex  = '-2'
        secondPlayerSettings.style.display = "none";
        playerOne.names = firstPlayerInputName.value;
        playerTwo.names = secondPlayerInputName.value;
        turn.textContent= `${playerOne.symbol === "X" ? playerOne.names : playerTwo.names} Turn Now`;
    }
    
}

/* 
God mode render/settings inputs 
*/
document.getElementById('godMode').onclick = () => {
    hideGameSettings();
    gameModeReset();
    gameMode.godMode = true;
    godModeSettings.style.display = 'unset';
    
    playerOne.symbol = 'X';
    playerTwo.symbol = 'O';
    turn.textContent = 'Your turn now'
    //create an array with 9 index from 0 to 8 for GodMode
    origBoard = Array.from(Array(9).keys());
}

document.getElementById('godModeStart').onclick = () => {
    menuGameDiv.style.zIndex  = '-2';
}

document.getElementById("menuButton").onclick = () => {
    menuGameDiv.style.zIndex  = "2";
    hideGameSettings();
    gameModeReset();
    playAgain();
}

document.getElementById('playAgain').onclick = () => {
    playAgain();

    if(gameMode.singlePlayer)
    turn.textContent = `${playerOne.symbol === 'X' ? 'X' : 'O'} turn now`;
    
    //computer is X and should make first move when press Play again
    if(gameMode.singlePlayer && playerTwo.symbol === 'X') {
        let random = Math.floor(Math.random() * boxes.length);
        boxes[random].textContent = playerTwo.symbol;
    } 

    if(gameMode.godMode) turn.textContent = 'Your turn'
}

const selectWinnerBoxes = (b1, b2, b3) => {
    b1.classList.add("win");
    b2.classList.add("win");
    b3.classList.add("win");

    boxesHoverTrigger("boxNoHover",b1,b2,b3)

    //Game end if this function is called
    endGame = 1;

    if (!gameMode.godMode)
    if (playerOne.names !== '') {
        turn.textContent = b1.textContent === playerOne.symbol ? `${playerOne.names} is a winner` : `${playerTwo.names} is a winner`
    }else {
        turn.textContent = b1.textContent + " is a winner";
    }
}

const boxesHoverTrigger = (hover,b1 = 0, b2 = 0, b3 = 0) => {
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i] !== b1 && boxes[i] !== b2 && boxes[i] !== b3)
        boxes[i].className = hover;
    }
}

const getWinner = () => {
    const   box1 = document.getElementById("0"),
            box2 = document.getElementById("1"),
            box3 = document.getElementById("2"),
            box4 = document.getElementById("3"),
            box5 = document.getElementById("4"),
            box6 = document.getElementById("5"),
            box7 = document.getElementById("6"),
            box8 = document.getElementById("7"),
            box9 = document.getElementById("8");

    if (box1.textContent !== "" && box1.textContent === box2.textContent && box1.textContent === box3.textContent)
    selectWinnerBoxes(box1, box2, box3);

    if (box4.textContent !== "" && box4.textContent === box5.textContent && box4.textContent === box6.textContent)
    selectWinnerBoxes(box4, box5, box6);

    if (box7.textContent !== "" && box7.textContent === box8.textContent && box7.textContent === box9.textContent)
    selectWinnerBoxes(box7, box8, box9);

    if (box1.textContent !== "" && box1.textContent === box4.textContent && box1.textContent === box7.textContent)
    selectWinnerBoxes(box1, box4, box7);

    if (box2.textContent !== "" && box2.textContent === box5.textContent && box2.textContent === box8.textContent)
    selectWinnerBoxes(box2, box5, box8);

    if (box3.textContent !== "" && box3.textContent === box6.textContent && box3.textContent === box9.textContent)
    selectWinnerBoxes(box3, box6, box9);

    if (box1.textContent !== "" && box1.textContent === box5.textContent && box1.textContent === box9.textContent)
    selectWinnerBoxes(box1, box5, box9);

    if (box3.textContent !== "" && box3.textContent === box5.textContent && box3.textContent === box7.textContent) 
    selectWinnerBoxes(box3, box5, box7);

    if (endGame === 0 && indexOfEmptyBoxes() < 1) {
        turn.textContent = "It's a tie!";

        boxesHoverTrigger("boxNoHover");
    }
}

for (let i = 0; i < boxes.length; i++) {
    boxes[i].onclick = function (square) {
        //if box is clean and game still running
        if (this.textContent !== "X" && this.textContent !== "O" && endGame === 0) {

            if(gameMode.singlePlayer) {
                this.textContent = playerOne.symbol;
                getWinner();

                //100ms deplay to avoid bug node .textContent write, !!! Bug if player click other box in less then 100ms delay, async await
                setTimeout(()=> {
                    if(endGame === 0)
                    computerTurn();
                    getWinner();
                },100);

                turn.textContent = `${playerOne.symbol === 'X' ? 'X' : 'O'} turn now`;
                getWinner();
            }

            if(gameMode.multiPlayer) {
                if (playerTurn % 2 === 0) {
                    this.textContent = playerOne.symbol === '' ? 'X' : playerOne.symbol;
                    turn.textContent = `${playerTwo.names === '' ? 'O' : playerTwo.names} turn now`;
                    getWinner();
                    playerTurn += 1;
                }else {
                    this.textContent = playerTwo.symbol === '' ? 'O' : playerTwo.symbol;
                    turn.textContent = `${playerOne.names === '' ? "X" : playerOne.names} turn now`;
                    getWinner();
                    playerTurn += 1;
                }
            }  

            if(gameMode.godMode) {
                if (typeof origBoard[square.target.id] == 'number' && endGame === 0) {
                    turnAI(square.target.id, playerOne.symbol)
                    if (!checkWin(origBoard, playerOne.symbol) && !checkTie()) turnAI(bestSpot(), playerTwo.symbol);
                }
                 getWinner();
            }
        }
    }
}

const playAgain = () => {
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].classList.remove("win");
        boxes[i].textContent = "";
        turn.style.fontSize = "25px";
        playerTurn = playerOne.symbol === 'O' ? 1 : 0;   
        //Add hover on boxes
        boxes[i].className = "box"; 
        turn.textContent = `${playerOne.names === '' ? "X" : playerOne.symbol === 'X' ? playerOne.names : playerTwo.names} turn now`;
    }

    //create an array with 9 index from 0 to 8
    origBoard = Array.from(Array(9).keys());

    //Game render
    endGame = 0;
}

const gameModeReset = () => {
    gameMode = {
        singlePlayer : false,
        multiPlayer : false,
        godMode : false
    }
    playerOne = {
        names: '',
        symbol: ''
    }
    playerTwo = {
        names: '',
        symbol: ''
    }
}

const hideGameSettings = () => {
    firstPlayerSettings.style.display = 'none';
    secondPlayerSettings.style.display = 'none';
    singlePlayerSettings.style.display = 'none';
    godModeSettings.style.display = 'none'
}    

const computerTurn = () => {	
    let newArr = indexOfEmptyBoxes();

    //get a random number from new array
    let random = Math.floor(Math.random() * newArr.length);

    //condition to avoid computer to do one more move when 9/9 cell are full
    if(newArr.length > 0)
    boxes[newArr[random]].textContent = playerTwo.symbol;
}

const indexOfEmptyBoxes = () => {
    let tempArr = [];

    //save index of empty boxes in a new array
    for(let i=0; i<boxes.length; i++) {
        if(boxes[i].textContent === '') 
        tempArr.push(i); 
    }
    return tempArr
}




/*================
 minmax() Ai test 
 https://gist.github.com/Pragalbha-Patil/8f09d11cf09ad249767da0df8649f459
==================*/

const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
]

function turnAI(squareId, player) {
    origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(origBoard, player)
    if (gameWon) gameOver(gameWon)
}

function checkWin(board, player) {
    let plays = board.reduce((a, e, i) =>
        (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of winCombos.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = { index: index, player: player };
            break;
        }
    }
    return gameWon;
}

function emptySquares() {
    return origBoard.filter(s => typeof s == 'number');
}

function bestSpot() {
    return minimax(origBoard, playerTwo.symbol).index;
}

function minimax(newBoard, player) {
    let availSpots = emptySquares();

    if (checkWin(newBoard, playerOne.symbol)) {
        return { score: -10 };
    } else if (checkWin(newBoard, playerTwo.symbol)) {
        return { score: 10 };
    } else if (availSpots.length === 0) {
        return { score: 0 };
    }

    let moves = [];
    for (let i = 0; i < availSpots.length; i++) {
        let move = {};
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = player;

        if (player == playerTwo.symbol) {
            var result = minimax(newBoard, playerOne.symbol);
            move.score = result.score;
        } else {
            var result = minimax(newBoard, playerTwo.symbol);
            move.score = result.score;
        }

        newBoard[availSpots[i]] = move.index;

        moves.push(move);
    }

    var bestMove;
    if (player === playerTwo.symbol) {
        var bestScore = -10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        var bestScore = 10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    return moves[bestMove];
}


function gameOver(gameWon) {
    turn.textContent = (gameWon.player == playerOne.symbol ? "You win!" : "You lose.");
    endGame = 1;
}

function checkTie() {
    if (emptySquares().length == 0) {
        turn.textContent = "Tie Game!";
        endGame = 1;
        return true;
    }
    return false;
}


/* ===========
Easy minimax() code
https://thecodingtrain.com/challenges/154-tic-tac-toe-minimax
============
let ai = 'X';
let human = 'O';

function bestMove() {
    // AI to make its turn
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 8; i++) {
        // Is the spot available?
        if (origBoard[i] === 'number') {
            origBoard[i] = ai;
            let score = minimax(origBoard, 0, false);
            origBoard[i] = '';
            if (score > bestScore) {
                bestScore = score;
                move = [i];
            }
        }
    }
    origBoard[move] = ai;
  }
  
  let scores = {
    X: 10,
    O: -10,
    tie: 0
  };
  
  function minimax(board, depth, isMaximizing) {
    let result = checkWinner(); // return X || O || tie
    if (result !== null) {
      return scores.result;
    }
  
    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 8; i++) {
            // Is the spot available?
            if (board[i] == 'number') {
                board[i] = ai;
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 3; i++) {
            // Is the spot available?
            if (board[i] == 'number') {
                board[i] = human;
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = min(score, bestScore);
            }
        }
        return bestScore;
    }
  }
*/
