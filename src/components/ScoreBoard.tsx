type props = {
  score: { x: number; o: number; tie: number };
  isPlayer2Computer: boolean;
};
export function ScoreBoard({ score, isPlayer2Computer }: props) {
  return (
    <table className=" mt-14 text-lg text-neutral-200">
      <thead>
        <tr className=" border-spacing-4">
          <th className=" px-5 text-center">Player X </th>
          <th className=" px-5 text-center">Tie</th>
          <th className=" px-5 text-center">
            {isPlayer2Computer ? "Computer (O)" : "Player O"}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className=" text-center">{score.x}</td>
          <td className=" text-center">{score.tie}</td>
          <td className=" text-center">{score.o}</td>
        </tr>
      </tbody>
    </table>
  );
}
