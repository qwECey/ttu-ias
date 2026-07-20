type StatusCardProps = {
  title: string;
  message: string;
  variant?: "success" | "error" | "warning" | "info";
};

export default function StatusCard({
  title,
  message,
  variant = "info",
}: StatusCardProps) {
  const styles = {
    success: {
      container:
        "border-green-200 bg-green-50",
      title: "text-green-700",
    },

    error: {
      container:
        "border-red-200 bg-red-50",
      title: "text-red-700",
    },

    warning: {
      container:
        "border-yellow-200 bg-yellow-50",
      title: "text-yellow-700",
    },

    info: {
      container:
        "border-blue-200 bg-blue-50",
      title: "text-blue-700",
    },
  };

  const current = styles[variant];

  return (
    <div
      className={`rounded-3xl border p-8 shadow-sm ${current.container}`}
    >
      <h2
        className={`text-2xl font-bold ${current.title}`}
      >
        {title}
      </h2>

      <p className="mt-3 text-gray-700">
        {message}
      </p>
    </div>
  );
}