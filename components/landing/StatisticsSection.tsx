type Props = {
  stats: {
    students: number;
    companies: number;
    supervisors: number;
    activeInternships: number;
  };
};

export default function StatisticsSection({
  stats,
}: Props) {
  const statistics = [
    {
      value: stats.students,
      label: "Registered Students",
    },
    {
      value: stats.companies,
      label: "Partner Companies",
    },
    {
      value: stats.supervisors,
      label: "Academic & Industry Supervisors",
    },
    {
      value: stats.activeInternships,
      label: "Active Internships",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        <h2 className="text-center text-4xl font-bold text-[#0F2D52]">
          TTU Impact
        </h2>

        <p className="mt-4 text-center text-gray-600">
          Live statistics from the TTU Industrial Attachment System.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {statistics.map((stat) => (

            <div
              key={stat.label}
              className="rounded-xl border border-gray-200 p-8 text-center shadow-sm"
            >

              <h3 className="text-4xl font-bold text-[#0F2D52]">
                {stat.value}
              </h3>

              <p className="mt-2 text-gray-600">
                {stat.label}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}