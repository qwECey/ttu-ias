import Link from "next/link";

type Props = {
  placementRequestExists: boolean;
  placementApproved: boolean;

  academicSupervisor: string | null;
  industrySupervisor: string | null;

  totalReports: number;

  assessmentStatus:
    | "LOCKED"
    | "PENDING"
    | "IN_PROGRESS"
    | "COMPLETED";
};

export default function InternshipJourney({
  placementRequestExists,
  placementApproved,
  academicSupervisor,
  industrySupervisor,
  totalReports,
  assessmentStatus,
}: Props) {
  function assessmentBadge() {
    switch (assessmentStatus) {
      case "COMPLETED":
        return (
          <BadgeGreen>
            ✓ Completed
          </BadgeGreen>
        );

      case "IN_PROGRESS":
        return (
          <BadgeBlue>
            In Progress
          </BadgeBlue>
        );

      case "PENDING":
        return (
          <BadgeYellow>
            Awaiting Assessment
          </BadgeYellow>
        );

      default:
        return (
          <BadgeGray>
            Locked
          </BadgeGray>
        );
    }
  }

  return (
    <div className="rounded-2xl bg-white p-5 shadow-md sm:rounded-3xl sm:p-6">

      <h2 className="mb-5 text-lg font-semibold sm:text-xl">
        Your Internship Journey
      </h2>

      <div className="space-y-4">

        <JourneyRow
          title="1. Student Registration"
          description="Your internship account has been created."
          badge={
            <BadgeGreen>
              ✓ Completed
            </BadgeGreen>
          }
        />

        <JourneyRow
          title="2. Placement Request"
          description={
            placementRequestExists
              ? "Placement request submitted."
              : "Choose a company to begin your attachment."
          }
          badge={
            placementRequestExists ? (
              <BadgeGreen>
                ✓ Completed
              </BadgeGreen>
            ) : (
              <BadgeYellow>
                Pending
              </BadgeYellow>
            )
          }
        />

        <JourneyRow
          title="3. Placement Approval"
          description={
            placementApproved
              ? "Your placement has been approved."
              : "Awaiting approval from the Liaison Office."
          }
          badge={
            placementApproved ? (
              <BadgeGreen>
                ✓ Approved
              </BadgeGreen>
            ) : (
              <BadgeYellow>
                Waiting
              </BadgeYellow>
            )
          }
        />

        <JourneyRow
          title="4. Academic Supervisor"
          description={
            academicSupervisor ??
            "Supervisor not yet assigned."
          }
          badge={
            academicSupervisor ? (
              <BadgeGreen>
                ✓ Assigned
              </BadgeGreen>
            ) : (
              <BadgeGray>
                Waiting
              </BadgeGray>
            )
          }
        />

        <JourneyRow
          title="5. Industry Supervisor"
          description={
            industrySupervisor ??
            "Waiting for company assignment."
          }
          badge={
            industrySupervisor ? (
              <BadgeGreen>
                ✓ Assigned
              </BadgeGreen>
            ) : (
              <BadgeGray>
                Waiting
              </BadgeGray>
            )
          }
        />

        <JourneyRow
          title="6. Report Submission"
          description={
            totalReports > 0
              ? `${totalReports} report(s) submitted`
              : "No reports submitted yet."
          }
          badge={
            totalReports > 0 ? (
              <BadgeBlue>
                In Progress
              </BadgeBlue>
            ) : (
              <BadgeGray>
                Waiting
              </BadgeGray>
            )
          }
        />

        <JourneyRow
          title="7. Final Assessment"
          description={
            assessmentStatus === "COMPLETED"
              ? "Your final assessment has been completed. You can now view your official results."
              : "Assessment status updates automatically as your supervisors complete their assessments."
          }
          badge={
            assessmentStatus === "COMPLETED" ? (
              <Link
                href="/student/results"
                className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                View Results
              </Link>
            ) : (
              assessmentBadge()
            )
          }
          last
        />

      </div>

    </div>
  );
}

function JourneyRow({
  title,
  description,
  badge,
  last = false,
}: {
  title: string;
  description: string;
  badge: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ${
        !last
          ? "border-b border-gray-200 pb-4"
          : ""
      }`}
    >
      <div className="min-w-0 flex-1">

        <h3 className="font-semibold text-gray-900">
          {title}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {description}
        </p>

      </div>

      <div className="shrink-0">
        {badge}
      </div>

    </div>
  );
}

function BadgeGreen({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center whitespace-nowrap rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 sm:text-sm">
      {children}
    </span>
  );
}

function BadgeBlue({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center whitespace-nowrap rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 sm:text-sm">
      {children}
    </span>
  );
}

function BadgeYellow({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center whitespace-nowrap rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700 sm:text-sm">
      {children}
    </span>
  );
}

function BadgeGray({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center whitespace-nowrap rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 sm:text-sm">
      {children}
    </span>
  );
}