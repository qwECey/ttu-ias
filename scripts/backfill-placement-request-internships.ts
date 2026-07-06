import { prisma } from "@/lib/prisma";

async function main() {
  const placementRequests =
    await prisma.placementRequest.findMany({
      where: {
        internshipId: null,
      },
    });

  console.log(
    `Found ${placementRequests.length} placement request(s).`
  );

  for (const request of placementRequests) {
    const internship =
      await prisma.internship.findFirst({
        where: {
          studentId: request.studentId,
          status: "ACTIVE",
        },
      });

    if (!internship) {
      console.log(
        `Skipping ${request.id} (no active internship found).`
      );
      continue;
    }

    await prisma.placementRequest.update({
      where: {
        id: request.id,
      },
      data: {
        internshipId: internship.id,
      },
    });

    console.log(
      `Updated placement request ${request.id}.`
    );
  }

  console.log("Backfill complete.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });