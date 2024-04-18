const Game = function(){
    const gameBoard = {
        board: [],
        winningPatterns: {
            pattern1: [1, 2, 3],
            pattern2: [1, 4, 7],
            pattern3: [2, 5, 8],
            pattern4: [3, 6, 9],
            pattern5: [1, 5, 9],
            pattern6: [3, 5, 7]
        },
        availableMoves: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        symbols: ['X', 'O'],
        players: ['player1', 'player2'],
        player1Moves: [],
        player2Moves: [],
        movesPlayed: [] 
    }

    const selectors = {
        board: document.querySelector('.gameBoard'),
        stat1: document.querySelector('.stat1'),
        stat2: document.querySelector('.stat2'),
        result: document.querySelector('.result'),
        btn: document.querySelectorAll('.square')
    }

    const btn = selectors.btn;
    btn.forEach((b, index) => {
        b.dataset.index = index + 1;
    })

    const patterns = Object.keys(gameBoard.winningPatterns);
    const winDeterminant = function(){
        for(const pattern in patterns){
            if(gameBoard.player1Moves.sort().toString().includes(patterns[pattern].toString())){
                selectors.result.textContent = 'Player 1 Wins!!!';
                selectors.stat1.textContent = 'Winner';
            }
            else if(gameBoard.player2Moves.sort().toString().includes(patterns[pattern].toString())){
                selectors.result.textContent = 'Player 2 Wins!!!';
                selectors.stat2.textContent = 'Winner';
            }
            else{
                continue;
            }
        }
    }
    
    const play = function(){
        // let player = gameBoard.players[0];
        const board = selectors.board;
        const stat1 = selectors.stat1;
        const stat2 = selectors.stat2;
        const result = selectors.result;
        board.addEventListener('click', (e) => {
            const clickedButton = e.target.closest('button');
            const btnIndex = clickedButton.dataset.index;
            if(clickedButton){
                if(!gameBoard.movesPlayed.includes(btnIndex)){
                    gameBoard.movesPlayed.push(btnIndex);
                    gameBoard.availableMoves.splice(btnIndex, 1);
                    if(gameBoard.movesPlayed.length % 2 !== 0){
                        stat2.textContent = '';
                        clickedButton.textContent = gameBoard.symbols[0];
                        gameBoard.player1Moves.push(btnIndex);
                        stat1.textContent = 'Good play';
                        result.textContent = `${gameBoard.players[1]}, your turn to play next!!!`; 
                        winDeterminant();
                    }
                    else{
                        stat1.textContent = '';
                        clickedButton.textContent = gameBoard.symbols[1];
                        gameBoard.player2Moves.push(btnIndex);
                        stat2.textContent = 'Good play';
                        result.textContent = `${gameBoard.players[0]}, your turn to play next!!!`;
                        winDeterminant();
                    }
                }
                else{
                    result.textContent = `Position ${btnIndex}, already played!!!`;
                }
            }
        })
    }
    return { play, gameBoard, selectors }
}()
Game.play();

