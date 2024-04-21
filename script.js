const Game = function(){
    const gameBoard = {
        board: [],
        winningPatterns: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]],
        comments: ['Excellent play', 'Critical thinking', 'Great play', 'Amazing fingers', 'Savant', 'Perfectionist'],
        symbols: ['X', 'O'],
        players: ['player1', 'player2'],
        player1Moves: [],
        player2Moves: [],
        movesPlayed: [] 
    }

    // Elements on gameboard to dynamically manipulate
    const selectors = {
        board: document.querySelector('.gameBoard'),
        stat1: document.querySelector('.stat1'),
        stat2: document.querySelector('.stat2'),
        result: document.querySelector('.result'),
        btn: document.querySelectorAll('.square'),
        startGame: document.querySelector('.start'),
        resetGame: document.querySelector('.reset')
    }

    // Indexing available button elements in gameboard parent container to ease identification
    const btn = selectors.btn;
    btn.forEach((b, index) => {
        b.dataset.index = index + 1;
    })
     
    // Game logic
    const play = function(){
        const board = selectors.board;
        const stat1 = selectors.stat1;
        const stat2 = selectors.stat2;
        const result = selectors.result;
        board.addEventListener('click', (e) => {
            const clickedButton = e.target.closest('button');
            let btnIndex = Number(clickedButton.dataset.index);
            if(clickedButton){
                if(!gameBoard.movesPlayed.includes(btnIndex)){
                    gameBoard.movesPlayed.push(btnIndex);
                    if(gameBoard.movesPlayed.length % 2 !== 0){
                        stat2.textContent = '';
                        clickedButton.textContent = gameBoard.symbols[0];
                        gameBoard.player1Moves.push(btnIndex);
                        stat1.textContent = gameBoard.comments[Math.floor(Math.random() * gameBoard.comments.length)];
                        result.textContent = `${gameBoard.players[1]}, your turn to play next!!!`; 
                    }
                    else if(gameBoard.movesPlayed.length % 2 === 0){
                        gameBoard.player2Moves.push(btnIndex);
                        stat1.textContent = '';
                        clickedButton.textContent = gameBoard.symbols[1];
                        stat2.textContent = gameBoard.comments[Math.floor(Math.random() * gameBoard.comments.length)];
                        result.textContent = `${gameBoard.players[0]}, your turn to play next!!!`;
                    }
                }
                else{
                    result.textContent = `Position ${btnIndex}, already played!!!`;
                }
                // Logic to determine winner, loser or draw
                if(gameBoard.player1Moves.length >= 3 || gameBoard.player2Moves.length >= 3){
                    let player1 = gameBoard.player1Moves;
                    let player2 = gameBoard.player2Moves;
                    for(const pattern of gameBoard.winningPatterns){
                        if(pattern.every(element => player1.includes(element))){
                            reset();
                            selectors.result.textContent = 'Player 1 WINS!!!';
                            selectors.stat1.textContent = 'WINNER!!!';
                            btn.forEach(b => {
                                b.disabled = true;
                            })
                        }
                        else if(pattern.every(element => player2.includes(element))){
                            reset();
                            selectors.result.textContent = 'Player 2 WINS!!!';
                            selectors.stat2.textContent = 'WINNER!!!';
                            btn.forEach(b => {
                                b.disabled = true; 
                            })
                        }
                        else if(gameBoard.movesPlayed.length === 9 && (
                            !player1.sort().toString().includes(pattern.toString()) || !player2.sort().toString().includes(pattern.toString())
                        )){
                            reset();
                        }
                        else{
                            continue
                        }     
                    }
                }
            }
        })
    }

    // Start the game
    selectors.startGame.addEventListener('click', () => {
        selectors.result.textContent = '';
        btn.forEach(b => {
            b.disabled = false;
        })
    });

    // Reset the game
    const reset = function(){
        selectors.resetGame.addEventListener('click', () => {
            selectors.result.textContent = '';
            selectors.stat1.textContent = '';
            selectors.stat2.textContent = '';
            gameBoard.movesPlayed.splice(0, gameBoard.movesPlayed.length);
            gameBoard.player1Moves.splice(0, gameBoard.player1Moves.length);
            gameBoard.player2Moves.splice(0, gameBoard.player2Moves.length);
            btn.forEach(b => {
                b.textContent = '';
                b.disabled = true;
            })
        });
    }
    
    return { play, reset, gameBoard, selectors }
}()
Game.play();
Game.selectors.resetGame.onclick = Game.reset();