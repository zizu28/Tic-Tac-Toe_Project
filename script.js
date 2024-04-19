const Game = function(){
    const gameBoard = {
        board: [],
        winningPatterns: {
            pattern1: [0, 1, 2],
            pattern2: [0, 3, 6],
            pattern3: [1, 4, 7],
            pattern4: [2, 5, 8],
            pattern5: [0, 4, 8],
            pattern6: [2, 4, 6]
        },
        availableMoves: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        symbols: ['X', 'O'],
        players: ['player1', 'player2'],
        player1Moves: [],
        player2Moves: [],
        movesPlayed: [],
        player1Wins: [],
        player2Wins: [] 
    }

    const selectors = {
        board: document.querySelector('.gameBoard'),
        stat1: document.querySelector('.stat1'),
        stat2: document.querySelector('.stat2'),
        result: document.querySelector('.result'),
        btn: document.querySelectorAll('.square'),
        startGame: document.querySelector('.start'),
        resetGame: document.querySelector('.reset')
    }

    const btn = selectors.btn;
    btn.forEach((b, index) => {
        b.dataset.index = index + 1;
    })

    const winDeterminant = function(){
        if(gameBoard.availableMoves.length === 0){
            for(const pattern in gameBoard.winningPatterns){
                if(gameBoard.player1Moves.sort().toString().includes(pattern.toString())){

                }
            }
        }
    }
    
    // Game logic
    const play = function(){
        // let player = gameBoard.players[0];
        const board = selectors.board;
        const stat1 = selectors.stat1;
        const stat2 = selectors.stat2;
        const result = selectors.result;
        let counter = 0;
        board.addEventListener('click', (e) => {
            const clickedButton = e.target.closest('button');
            let btnIndex = Number(clickedButton.dataset.index) - 1;
            if(gameBoard.availableMoves.length < btnIndex){
                btnIndex -= counter;
            }
            if(clickedButton){
                if(!gameBoard.movesPlayed.includes(btnIndex)){
                    gameBoard.movesPlayed.push(gameBoard.availableMoves[btnIndex]);
                    if(gameBoard.movesPlayed.length % 2 !== 0){
                        stat2.textContent = '';
                        clickedButton.textContent = gameBoard.symbols[0];
                        gameBoard.player1Moves.push(gameBoard.availableMoves[btnIndex]);
                        stat1.textContent = 'Good play';
                        result.textContent = `${gameBoard.players[1]}, your turn to play next!!!`; 
                    }
                    else if(gameBoard.movesPlayed.length % 2 === 0){
                        gameBoard.player2Moves.push(gameBoard.availableMoves[btnIndex]);
                        stat1.textContent = '';
                        clickedButton.textContent = gameBoard.symbols[1];
                        stat2.textContent = 'Good play';
                        result.textContent = `${gameBoard.players[0]}, your turn to play next!!!`;
                    }
                    gameBoard.availableMoves.splice(btnIndex, 1);
                }
                else{
                    result.textContent = `Position ${btnIndex}, already played!!!`;
                }
                counter++;
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
            selectors.result.textContent = 'Click "Start Button" to begin the game';
            selectors.stat1.textContent = '';
            selectors.stat2.textContent = '';
            gameBoard.movesPlayed.splice(0, gameBoard.movesPlayed.length);
            gameBoard.availableMoves.splice(0, gameBoard.availableMoves.length);
            gameBoard.availableMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8];
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

