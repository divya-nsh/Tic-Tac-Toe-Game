import { useState } from "react";
import { ScoreBoard } from "./components/ScoreBoard";
import { aiPlayer, checkWin, isAllPosFill } from "./utils/gameLogic";
import GameOverModel from "./components/GameOverModel";
import GameBoard from "./components/GameBoard";
import { gameSound } from "./utils/gameSound";

type move = "x" | "o" | "";
type GameBoard = move[];

const emptyGameBoard: GameBoard = new Array(9).fill("");

export default function App() {
  const [score, setScore] = useState({ x: 0, o: 0, tie: 0 });
  const [isPlayer2Ai, setIsPlayer2Ai] = useState(true);
  const [board, setBoard] = useState<GameBoard>(emptyGameBoard);
  const [currPlayer, setCurrPlayer] = useState<"x" | "o">("x");
  const [aiDifficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "hard",
  );

  const [win, setWin] = useState<{
    isGameOver: boolean;
    playerWin?: "x" | "o" | "tie";
    winPath?: number[];
    winPathType?: "diag-left" | "col" | "row" | "diag-right";
  }>({ isGameOver: false });

  const isAiChance = currPlayer === "o" && isPlayer2Ai;

  const handleAiMove = (gameBoard: GameBoard) => {
    setTimeout(() => {
      const move = aiPlayer(gameBoard, aiDifficulty);
      const newBoard = gameBoard.map((v, i) => (i === move ? "o" : v));
      setBoard(newBoard);
      checkForGameOver(newBoard);
      setCurrPlayer("x");
      gameSound.ySound();
    }, 500);
  };

  const playTurn = (at: number) => {
    if (board[at] || win.isGameOver || isAiChance) return;
    const newBoard = board.map((v, i) => (i === at ? currPlayer : v));
    setBoard(newBoard);
    const isOver = checkForGameOver(newBoard);
    setCurrPlayer((prev) => (prev === "x" ? "o" : "x"));

    if (currPlayer === "x") {
      gameSound.xSound();
      setCurrPlayer("o");
      if (isPlayer2Ai && !isOver) handleAiMove(newBoard);
    } else {
      gameSound.ySound();
      setCurrPlayer("x");
    }

    return newBoard as GameBoard;
  };

  const checkForGameOver = (gameBoard: GameBoard) => {
    const win = checkWin(gameBoard);
    if (!win && isAllPosFill(gameBoard)) {
      setScore((prev) => ({ ...prev, tie: prev.tie + 1 }));

      setWin({ isGameOver: true, playerWin: "tie" });

      return true;
    }

    if (win) {
      setScore((p) => ({
        ...p,
        [win.playerWin]: p[win.playerWin] + 1,
      }));
      setWin({
        isGameOver: true,
        playerWin: win.playerWin,
        winPath: win.winPath,
        winPathType: win.pathType,
      });
      return true;
    }
  };

  const reset = (hardReset?: boolean) => {
    const newBoard = [...emptyGameBoard];
    setBoard(newBoard);
    setWin({ isGameOver: false });
    if (hardReset) {
      setScore({ x: 0, o: 0, tie: 0 });
      setCurrPlayer("x");
    }

    if (isAiChance) handleAiMove(newBoard);
  };

  const switchGameMode = (mode: 1 | 2) => {
    if (mode === 1 && isPlayer2Ai) return;
    if (mode === 2 && !isPlayer2Ai) return;
    setIsPlayer2Ai(mode === 1 ? true : false);
    reset(true);
  };

  const switchDifficulty = (val: "easy" | "medium" | "hard") => () => {
    if (val === aiDifficulty) return;
    setDifficulty(val);
    reset(true);
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center">
      {/*Game mode Selector*/}
      <div className=" mt-4 text-white">
        <div className=" flex">
          <button
            aria-label="Select one-player mode"
            className={` rounded-l-sm border-r bg-neutral-700 px-6 ${!isPlayer2Ai && "opacity-45"}`}
            onClick={() => switchGameMode(1)}
          >
            1 Player
          </button>
          <button
            aria-label="Select two-player mode"
            className={`rounded-r-sm bg-neutral-700 px-6 ${isPlayer2Ai && "opacity-45"}`}
            onClick={() => switchGameMode(2)}
          >
            2 Player
          </button>
        </div>
      </div>
      {isPlayer2Ai && (
        <div className=" mt-2 text-white">
          <div className=" flex">
            <button
              className={` rounded-l-sm border-r bg-neutral-700 px-6 ${aiDifficulty !== "easy" && "opacity-45"}`}
              onClick={switchDifficulty("easy")}
            >
              Easy
            </button>
            <button
              className={`bg-neutral-700 px-6 ${aiDifficulty !== "medium" && "opacity-45"}`}
              onClick={switchDifficulty("medium")}
            >
              Medium
            </button>
            <button
              className={`rounded-r-sm bg-neutral-700 px-6 ${aiDifficulty !== "hard" && "opacity-45"}`}
              onClick={switchDifficulty("hard")}
            >
              Hard
            </button>
          </div>
        </div>
      )}

      {/*Current Player Turn showcase */}
      <p className=" mt-3 flex items-center gap-3 text-center text-lg font-bold tracking-wider text-white">
        <span
          style={{ color: currPlayer === "x" ? "red" : "blue" }}
          className="text-2xl uppercase"
        >
          {currPlayer}
        </span>
        Turns
      </p>

      {/* Game Board */}
      <GameBoard
        onPlay={playTurn}
        currPlayer={currPlayer}
        winPath={win.winPath}
        pathType={win.winPathType}
        board={board}
      />

      <ScoreBoard score={score} isPlayer2Computer={isPlayer2Ai} />

      {win.isGameOver && (
        <GameOverModel
          playerWin={win.playerWin}
          onReplyClick={() => reset()}
          onResetClick={() => reset(true)}
        />
      )}
    </main>
  );
}
