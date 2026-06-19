import {
  User,
  FileText,
  Building2,
  CheckCircle,
  BookOpen,
  ClipboardCheck,
} from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      title: "Student Registration",
      icon: User,
    },
    {
      title: "Apply for Placement",
      icon: FileText,
    },
    {
      title: "Company Review",
      icon: Building2,
    },
    {
      title: "Placement Approval",
      icon: CheckCircle,
    },
    {
      title: "Digital Logbook",
      icon: BookOpen,
    },
    {
      title: "Evaluation & Reports",
      icon: ClipboardCheck,
    },
  ];

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-4xl font-bold text-[#0F2D52]">
          How It Works
        </h2>

        <p className="mt-4 text-center text-gray-600">
          A simple and transparent internship workflow for all stakeholders.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-3 lg:grid-cols-6">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#0F2D52] text-white">
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="mt-4 font-semibold text-[#0F2D52]">
                  {step.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}