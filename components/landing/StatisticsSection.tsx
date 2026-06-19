export default function StatisticsSection() {
  const stats = [
    {
      value: "5,000+",
      label: "Students",
    },
    {
      value: "300+",
      label: "Partner Companies",
    },
    {
      value: "120+",
      label: "Supervisors",
    },
    {
      value: "95%",
      label: "Placement Success",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-4xl font-bold text-[#0F2D52]">
          TTU Impact
        </h2>

        <p className="mt-4 text-center text-gray-600">
          Empowering students, companies and supervisors through digital
          internship management.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
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