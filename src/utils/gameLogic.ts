//Tic Tac toe Winnign logic
type move = "x" | "o" | "";

type GameBoard = move[];

const winningPatterns = [
  // Horizontal winning patterns
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Vertical winning patterns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonal winning patterns
  [0, 4, 8],
  [2, 4, 6],
];

function getRandomMove(gameBoard: GameBoard): number {
  const availableMoves = getAvailablePlaces(gameBoard);
  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  return availableMoves[randomIndex];
}

//Return all empty places in a array
function getAvailablePlaces<T>(gameBoard: Array<T>) {
  const emptyPlaces: number[] = [];
  gameBoard.forEach((v, i) => {
    if (!v) emptyPlaces.push(i);
  });
  return emptyPlaces;
}

export function isAllPosFill(gameBoard: Array<unknown>) {
  return gameBoard.every((v) => v);
}

export function checkWin(gameBoard: GameBoard): null | {
  winPath: number[];
  playerWin: "x" | "o";
  pathType: "row" | "col" | "diag-left" | "diag-right";
} {
  //Finding for any winning pattern match the current game state.
  const winPathIdx = winningPatterns.findIndex((pattern) => {
    const firstValue = gameBoard[pattern[0]];
    return pattern.every((i) => firstValue && firstValue === gameBoard[i]);
  });

  if (winPathIdx === -1) {
    return null;
  }

  const winPath = winningPatterns[winPathIdx];
  return {
    winPath,
    playerWin: gameBoard[winPath[0]] as "x" | "o",
    pathType:
      winPathIdx > 6
        ? "diag-left"
        : winPathIdx > 5
          ? "diag-right"
          : winPathIdx > 2
            ? "col"
            : "row",
  };
}

//Minimax algorithm based it gone evaluate all possible move and make the best possible move.
export function _aiPlayer(
  gameBoard: GameBoard,
  isAiPlaying = true,
): { score: number; index: number } {
  const emptyPlaces = getAvailablePlaces(gameBoard);
  const win = checkWin(gameBoard);
  const isTie = !win && emptyPlaces.length === 0;

  if (win?.playerWin === "x") return { score: -1, index: -1 };
  if (win?.playerWin === "o") return { score: 1, index: -1 };
  if (isTie) return { score: 0, index: -1 };

  //Calculating the score for each empty place
  const moves = [];
  for (const value of emptyPlaces) {
    const boardCopy = [...gameBoard];
    boardCopy[value] = isAiPlaying ? "o" : "x";
    moves.push({
      index: value,
      score: _aiPlayer(boardCopy, !isAiPlaying).score,
    });
  }

  //Finding best move for current state
  if (isAiPlaying) {
    // Maxmizing the score if ai playing
    const bestMove = moves.reduce((prev, current) =>
      prev.score > current.score ? prev : current,
    );
    return { index: bestMove.index, score: bestMove.score };
  } else {
    //Minimizing the score if human playing
    const bestMove = moves.reduce((prev, current) =>
      prev.score < current.score ? prev : current,
    );
    return { index: bestMove.index, score: bestMove.score };
  }
}

export function aiPlayer(
  board: GameBoard,
  difficulty: "easy" | "medium" | "hard" = "hard",
) {
  //Ai gone play some time optimally other randomly
  if (difficulty === "easy") {
    const playDum = Math.random() > 0.2;
    return playDum ? getRandomMove(board) : _aiPlayer(board).index;
  }

  if (difficulty === "medium") {
    const playDum = Math.random() < 0.7;

    return playDum ? getRandomMove(board) : _aiPlayer(board).index;
  }

  const ply = _aiPlayer(board).index;

  return ply;
}

// //Basic ai player , can just evalate one move
// function AiPlayer(board: GameBoard) {
//   const aviPlaces = getAvailablePlaces(board);
//   if (aviPlaces.length < 2) return getRandomMove(board);

//   for (const idx of aviPlaces) {
//     const boardCopy = [...board];
//     boardCopy[idx] = "o";
//     const win = checkWin(boardCopy);
//     if (win?.playerWin === "o") return idx;
//   }

//   for (const idx of aviPlaces) {
//     const boardCopy = [...board];
//     boardCopy[idx] = "x";
//     const win = checkWin(boardCopy);
//     if (win?.playerWin === "x") return idx;
//   }

//   return getRandomMove(board);
// }
