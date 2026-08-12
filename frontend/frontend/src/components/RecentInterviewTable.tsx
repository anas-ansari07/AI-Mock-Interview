import type { RecentInterview } from "../types/dashboard";

interface Props {
  interviews: RecentInterview[];
}

export default function RecentInterviewTable({
  interviews,
}: Props) {
  return (
    <div className="rounded-xl bg-slate-800 p-6 mt-8">
      <h2 className="mb-4 text-xl font-semibold text-white">
        Recent Interviews
      </h2>

      <table className="w-full text-left text-white">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="pb-3">Role</th>
            <th className="pb-3">Score</th>
          </tr>
        </thead>

        <tbody>
          {interviews.map((interview) => (
            <tr
              key={interview.id}
              className="border-b border-slate-700"
            >
              <td className="py-3">
                {interview.role}
              </td>

              <td className="py-3">
                {interview.overall_score}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}