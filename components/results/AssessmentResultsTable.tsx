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
    <div className="overflow-x-auto rounded-2xl bg-white shadow-sm sm:rounded-3xl">

      {/* Header */}

      <div className="border-b border-gray-200 bg-slate-50 px-6 py-5">

        <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
          {title}
        </h2>

      </div>

      {rows.length === 0 ? (

        <div className="p-10 text-center">

          <h3 className="text-lg font-semibold text-gray-700">
            No Assessment Records
          </h3>

          <p className="mt-2 text-gray-500">
            Assessment results will appear
            here once assessments are completed.
          </p>

        </div>

      ) : (

        <table className="min-w-[900px] w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">
                Student
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">
                Company
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">
                Score
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">
                Status
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold whitespace-nowrap">
                Action
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-gray-200">

            {rows.map((row) => (

              <tr
                key={row.id}
                className="transition-colors hover:bg-slate-50"
              >

                <td className="px-6 py-4 font-medium whitespace-nowrap">
                  {row.studentName}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {row.companyName}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <ScoreDisplay
                    score={row.score}
                    maximum={row.maximum}
                  />
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge
                    completed={row.completed}
                  />
                </td>

                <td className="px-6 py-4 text-center whitespace-nowrap">

                  <Link
                    href={row.actionHref}
                    className="inline-flex items-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                  >
                    View
                  </Link>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  );
}