import { prisma } from "@/lib/prisma";

export default async function AssignPage() {
  const students =
    await prisma.student.findMany({
      orderBy: {
        fullName: "asc",
      },
    });

  const supervisors =
    await prisma.supervisor.findMany({
      orderBy: {
        fullName: "asc",
      },
    });

  return (
    <main className="p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Assign Supervisor
      </h1>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <form
          action="/api/supervisors/assign"
          method="POST"
          className="space-y-4"
        >
          <div>
           <label
                htmlFor="studentId"
                className="mb-2 block"
                >
                Student
                </label>

                <select
                id="studentId"
                name="studentId"
                className="w-full rounded-lg border p-3"
            >
              {students.map(
                (student) => (
                  <option
                    key={student.id}
                    value={student.id}
                  >
                    {student.fullName}
                  </option>
                )
              )}
            </select>
          </div>

          <div>
            <label
                htmlFor="supervisorId"
                className="mb-2 block"
                >
                Supervisor
                </label>

                <select
                id="supervisorId"
                name="supervisorId"
                className="w-full rounded-lg border p-3"
            >
              {supervisors.map(
                (supervisor) => (
                  <option
                    key={
                      supervisor.id
                    }
                    value={
                      supervisor.id
                    }
                  >
                    {
                      supervisor.fullName
                    }
                  </option>
                )
              )}
            </select>
          </div>

          <button
            type="submit"
            className="rounded-lg bg-green-600 px-5 py-3 text-white"
          >
            Assign
          </button>
        </form>
      </div>
    </main>
  );
}