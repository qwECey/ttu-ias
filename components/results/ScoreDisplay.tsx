type Props = {
  score: number | null;
  maximum: number;
};

export default function ScoreDisplay({
  score,
  maximum,
}: Props) {
  if (score === null) {
    return (
      <span className="font-semibold text-gray-400">
        -
      </span>
    );
  }

  return (
    <span className="font-semibold text-blue-700">
      {score} / {maximum}
    </span>
  );
}