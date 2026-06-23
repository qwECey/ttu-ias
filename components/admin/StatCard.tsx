type StatCardProps = {
  title: string;
  value: string | number;
};

export default function StatCard({
  title,
  value,
}: StatCardProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm transition hover:shadow-md">
      <p className="text-sm font-medium text-gray-500">
        {title}
      </p>

      <h3 className="mt-3 text-4xl font-bold text-slate-800">
        {value}
      </h3>
    </div>
  );
}