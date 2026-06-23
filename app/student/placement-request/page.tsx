import { prisma } from "@/lib/prisma";
import PlacementRequestForm from "./placement-request-form";

export default async function PlacementRequestPage() {
  const companies =
    await prisma.company.findMany({
      where: {
        approved: true,
      },
      orderBy: {
        companyName: "asc",
      },
    });

  return (
    <main className="p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Placement Request
      </h1>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <PlacementRequestForm
          companies={companies}
        />
      </div>
    </main>
  );
}