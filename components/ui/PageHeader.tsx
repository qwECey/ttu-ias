type PageHeaderProps = {
  title: string;
  description?: string;
  dark?: boolean;
  children?: React.ReactNode;
};

export default function PageHeader({
  title,
  description,
  dark = false,
  children,
}: PageHeaderProps) {
  return (
    <div
      className={`mb-8 rounded-3xl p-8 shadow ${
        dark
          ? "bg-slate-900 text-white"
          : "bg-white"
      }`}
    >
      <h1 className="text-3xl font-bold">
        {title}
      </h1>

      {description && (
        <p
          className={`mt-2 ${
            dark
              ? "text-slate-300"
              : "text-gray-500"
          }`}
        >
          {description}
        </p>
      )}

      {children && (
        <div className="mt-6">
          {children}
        </div>
      )}
    </div>
  );
}