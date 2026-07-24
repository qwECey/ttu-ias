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
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            ✓ Completed
          </span>
        );

      case "IN_PROGRESS":
        return (
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            In Progress
          </span>
        );

      case "PENDING":
        return (
          <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
            Awaiting Assessment
          </span>
        );

      default:
        return (
          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
            Locked
          </span>
        );
    }
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-md">

      <h2 className="mb-6 text-xl font-semibold">
        Your Internship Journey
      </h2>

      <div className="space-y-5">

        {/* Student Registration */}

        <JourneyRow
          title="1. Student Registration"
          description="Your internship account has been created."
          badge={
            <BadgeGreen>
              ✓ Completed
            </BadgeGreen>
          }
        />

        {/* Placement Request */}

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

        {/* Placement Approval */}

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

        {/* Academic Supervisor */}

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

        {/* Industry Supervisor */}

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

        {/* Reports */}

        <JourneyRow
          title="6. Report Submission"
          description={
            totalReports > 0
              ? `${totalReports} report(s) submitted`
              : "No reports submitted yet."
          }
          badge={
            totalReports > 0 ? (
              <BadgeGreen>
                In Progress
              </BadgeGreen>
            ) : (
              <BadgeGray>
                Waiting
              </BadgeGray>
            )
          }
        />

        {/* Assessment */}

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
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
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
      className={`flex items-center justify-between ${
        !last
          ? "border-b pb-3"
          : ""
      }`}
    >
      <div>

        <h3 className="font-semibold">
          {title}
        </h3>

        <p className="text-sm text-gray-500">
          {description}
        </p>

      </div>

      {badge}

    </div>
  );
}

function BadgeGreen({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
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
    <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
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
    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
      {children}
    </span>
  );
}