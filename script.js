const gameBoard = {
    board: [],
    winningPotential: {
        potential1: [1, 2, 3],
        potential2: [1, 4, 7],
        potential3: [2, 5, 8],
        potential4: [3, 6, 9],
        potential5: [1, 5, 9],
        potential6: [3, 5, 7]
    },
    availableMoves: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    symbols: ['X', 'O'],
    players: ['player1', 'player2'],
    player1Moves: [],
    player2Moves: [],
    movesPlayed: [] 
}

// Assign each button an index
const btn = document.querySelectorAll('.square');
btn.forEach((b, index) => {
    b.dataset.index = index + 1;
})

function play(player){
    const board = document.querySelector('.gameBoard');
    // const player1Text = document.querySelector('.stat1');
    // const player2Text = document.querySelector('.stat2');
    const result = document.querySelector('.result');
    board.addEventListener('click', (e) => {
        const clickedButton = e.target.closest('button');
        const btnIndex = clickedButton.dataset.index;
        if(clickedButton){
            if(!gameBoard.movesPlayed.includes(btnIndex)){
                gameBoard.movesPlayed.push(btnIndex);
                gameBoard.availableMoves.splice(btnIndex, 1);
                if(player === gameBoard.players[0]){
                    clickedButton.textContent = gameBoard.symbols[0];
                    gameBoard.player1Moves.push(btnIndex);
                    result.textContent = `${gameBoard.players[1]}, your turn to play next!!!`; 
                }
                else{
                    clickedButton.textContent = gameBoard.symbols[1];
                    gameBoard.player2Moves.push(btnIndex);
                    result.textContent = `${gameBoard.players[0]}, your turn to play next!!!`;
                }
            }
            else{
                if(player === gameBoard.players[0]){ 
                    result.textContent = `Position ${btnIndex}, already played!!!`;
                }
                else{
                    result.textContent = `Position ${btnIndex}, already played!!!`;
                }
            }
        }
        
    })
}

// while(gameBoard.availableMoves.length !== 0){
//     for(const potential in gameBoard.winningPotential){
//         if(gameBoard.movesPlayed.contains(potential) ){
            
//         }
//     }
//     // gameBoard.winningPotential
//     // if(!gameBoard.movesPlayed.contains(gameBoard.winningPotential.) || !gameBoard.movesPlayed.contains(gameBoard.player2Moves)){
    
//     gameBoard.availableMoves.length--;
// }

play('player2');