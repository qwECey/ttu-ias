type Props = {
  completed: boolean;
};

export default function StatusBadge({
  completed,
}: Props) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-semibold ${
        completed
          ? "bg-green-100 text-green-700"
          : "bg-yellow-100 text-yellow-700"
      }`}
    >
      {completed
        ? "Completed"
        : "Pending"}
    </span>
  );
}