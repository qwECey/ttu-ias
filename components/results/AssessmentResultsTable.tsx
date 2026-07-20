import Link from "next/link";
import ScoreDisplay from "./ScoreDisplay";
import StatusBadge from "./StatusBadge";

type Row = {
  id: string;
  studentName: string;
  companyName: string;
  score: number | null;
  maximum: number;
  completed: boolean;
  actionHref: string;
};

type Props = {
  title?: string;
  rows: Row[];
};

export default function AssessmentResultsTable({
  title = "Assessment Results",
  rows,
}: Props) {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow">

      <div className="border-b bg-slate-50 px-6 py-5">

        <h2 className="text-xl font-bold text-slate-900">
          {title}
        </h2>

      </div>

      <table className="min-w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="px-6 py-4 text-left">
              Student
            </th>

            <th className="px-6 py-4 text-left">
              Company
            </th>

            <th className="px-6 py-4 text-left">
              Score
            </th>

            <th className="px-6 py-4 text-left">
              Status
            </th>

            <th className="px-6 py-4 text-center">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {rows.length === 0 ? (

            <tr>

              <td
                colSpan={5}
                className="px-6 py-10 text-center text-gray-500"
              >
                No assessment records found.
              </td>

            </tr>

          ) : (

            rows.map((row) => (

              <tr
                key={row.id}
                className="border-t hover:bg-slate-50"
              >

                <td className="px-6 py-4 font-medium">
                  {row.studentName}
                </td>

                <td className="px-6 py-4">
                  {row.companyName}
                </td>

                <td className="px-6 py-4">
                    <ScoreDisplay
                        score={row.score}
                        maximum={row.maximum}
                    />
                </td>

                <td className="px-6 py-4">
                    <StatusBadge
                        completed={row.completed}
                    />
                </td>

                <td className="px-6 py-4 text-center">

                  <Link
                    href={row.actionHref}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    View
                  </Link>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}