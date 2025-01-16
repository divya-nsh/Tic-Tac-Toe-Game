export default function GameOverModel({
  playerWin = "",
  onReplyClick = () => {},
  onResetClick = () => {},
}) {
  return (
    <div className="animate-scale absolute bottom-0 top-0 z-50 -mt-10 flex  w-full flex-col items-center justify-center gap-9 bg-neutral-900/80 py-6 text-white">
      <h1 className=" text-3xl">
        {playerWin === "tie" && "Draw"}

        {playerWin !== "tie" && `Player ${playerWin.toUpperCase()} wins`}
      </h1>
      <button
        onClick={onReplyClick}
        className="flex items-center rounded-xl bg-blue-700 px-10 py-3 font-bold text-neutral-100 active:bg-blue-800 active:opacity-90"
      >
        Play Again
      </button>
      <button
        className=" -mt-4 rounded-xl bg-red-600 px-9 py-1 text-white active:opacity-60"
        onClick={onResetClick}
      >
        Reset
      </button>
    </div>
  );
}
