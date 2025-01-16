import React from "react";
import { AnimatedCircle, AnimatedCross } from "./Move";

type WinPathType = "diag-left" | "col" | "row" | "diag-right";
export default function GameBoard({
  board,
  winPath,
  onPlay,
  pathType,
  currPlayer,
}: {
  board: string[];
  winPath?: number[];
  onPlay: (at: number) => void;
  pathType?: WinPathType;
  currPlayer: string;
}) {
  return (
    <section className=" mt-12">
      <div
        className={`grid h-[300px] w-[300px] grid-cols-3 grid-rows-3  gap-1 bg-neutral-400 outline-none `}
      >
        {board.map((move, i) => {
          return (
            <div
              key={i}
              className={` group relative flex cursor-pointer items-center justify-center text-[70px] font-bold uppercase
                      text-white ${winPath && winPath.includes(i) ? "bg-black" : "bg-black"}`}
              style={{
                color: move === "x" ? "red" : "blue",
              }}
              onClick={() => {
                onPlay(i);
              }}
            >
              {/* If value is not exits then show curr player in with ghost effect on hover */}
              {!winPath && !move && (
                <span className="absolute hidden uppercase text-neutral-200 opacity-10 group-hover:block">
                  {currPlayer}
                </span>
              )}

              {move === "o" ? (
                <AnimatedCircle strokeWidth={8} size={60} />
              ) : move === "x" ? (
                <AnimatedCross />
              ) : (
                ""
              )}
              {winPath && winPath.includes(i) && <Strike pathType={pathType} />}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Strike({
  pathType,
}: {
  pathType?: "diag-left" | "col" | "row" | "diag-right";
}) {
  let style: React.CSSProperties = {};
  if (pathType === "col") {
    style = { transform: "rotate(90deg) scaleX(1.1)" };
  } else {
    if (pathType === "diag-right")
      style = { transform: "rotate(45deg) scaleX(1.50)" };
    if (pathType === "diag-left")
      style = { transform: "rotate(-45deg) scaleX(1.50)" };
  }

  return (
    <span
      className={`top-50% animte-fade-in scale-up shadow-red absolute left-0 right-0 z-0 h-2 bg-neutral-100 shadow-lg shadow-white`}
      style={style}
    ></span>
  );
}
