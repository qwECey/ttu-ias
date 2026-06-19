import {
  BookOpen,
  Briefcase,
  Building2,
  ClipboardCheck,
} from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      title: "Digital Logbooks",
      description:
        "Students record daily and weekly internship activities online.",
      icon: BookOpen,
    },
    {
      title: "Placement Management",
      description:
        "Apply, track and manage internship and semester-out placements.",
      icon: Briefcase,
    },
    {
      title: "Company Collaboration",
      description:
        "Companies can post opportunities and evaluate students digitally.",
      icon: Building2,
    },
    {
      title: "Supervisor Monitoring",
      description:
        "Academic supervisors can monitor and assess student progress.",
      icon: ClipboardCheck,
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-4xl font-bold text-[#0F2D52]">
          Key Features
        </h2>

        <p className="mt-4 text-center text-gray-600">
          Everything needed to manage internships and semester-out programmes.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-xl border border-gray-200 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <Icon className="h-6 w-6 text-[#0F2D52]" />
                </div>

                <h3 className="text-xl font-semibold text-[#0F2D52]">
                  {feature.title}
                </h3>

                <p className="mt-3 text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}