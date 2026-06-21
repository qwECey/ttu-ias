import { prisma } from "@/lib/prisma";
import IndustrySupervisorForm from "./supervisor-form";

export default async function IndustrySupervisorsPage() {
  //console.log(Object.keys(prisma));
  
    const supervisors =
    await prisma.industrySupervisor.findMany({
      include: {
        company: true,
      },
      orderBy: {
        fullName: "asc",
      },
    });

  const companies =
    await prisma.company.findMany({
      orderBy: {
        companyName: "asc",
      },
    });

  return (
    <main className="p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Industry Supervisors
      </h1>

      <IndustrySupervisorForm
        companies={companies}
      />

      <div className="mt-10 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">
          Existing Industry Supervisors
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-3 text-left">
                Name
              </th>

              <th className="px-4 py-3 text-left">
                Email
              </th>

              <th className="px-4 py-3 text-left">
                Company
              </th>
            </tr>
          </thead>

          <tbody>
            {supervisors.map(
              (supervisor) => (
                <tr
                  key={supervisor.id}
                  className="border-b"
                >
                  <td className="px-4 py-3">
                    {
                      supervisor.fullName
                    }
                  </td>

                  <td className="px-4 py-3">
                    {supervisor.email}
                  </td>

                  <td className="px-4 py-3">
                    {
                      supervisor.company
                        .companyName
                    }
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}