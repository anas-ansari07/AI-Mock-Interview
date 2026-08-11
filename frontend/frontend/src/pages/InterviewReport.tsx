import type { InterviewReport } from "../types/interview";

interface Props {
  report: InterviewReport;
}

export default function GenerateInterviewReport({
  report,
}: Props) {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="mx-auto max-w-5xl p-8">

        <h1 className="mb-8 text-4xl font-bold">
          Interview Report
        </h1>

        <div className="grid grid-cols-2 gap-6">

          <div className="rounded-xl bg-slate-800 p-6">
            <h2 className="text-xl font-semibold">
              Overall Score
            </h2>

            <p className="mt-4 text-5xl font-bold text-blue-400">
              {report.overall_score}%
            </p>
          </div>

          <div className="rounded-xl bg-slate-800 p-6">
            <h2 className="text-xl font-semibold">
              Technical
            </h2>

            <p className="mt-4 text-5xl font-bold text-green-400">
              {report.technical_score}/10
            </p>
          </div>

          <div className="rounded-xl bg-slate-800 p-6">
            <h2 className="text-xl font-semibold">
              Communication
            </h2>

            <p className="mt-4 text-5xl font-bold text-yellow-400">
              {report.communication_score}/10
            </p>
          </div>

          <div className="rounded-xl bg-slate-800 p-6">
            <h2 className="text-xl font-semibold">
              Confidence
            </h2>

            <p className="mt-4 text-5xl font-bold text-purple-400">
              {report.confidence_score}/10
            </p>
          </div>

        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">

          <div className="rounded-xl bg-slate-800 p-6">

            <h2 className="mb-4 text-xl font-semibold">
              Strengths
            </h2>

            <ul className="space-y-2">
              {report.strengths.map((item) => (
                <li key={item}>✅ {item}</li>
              ))}
            </ul>

          </div>

          <div className="rounded-xl bg-slate-800 p-6">

            <h2 className="mb-4 text-xl font-semibold">
              Weaknesses
            </h2>

            <ul className="space-y-2">
              {report.weaknesses.map((item) => (
                <li key={item}>⚠ {item}</li>
              ))}
            </ul>

          </div>

          <div className="rounded-xl bg-slate-800 p-6">

            <h2 className="mb-4 text-xl font-semibold">
              Recommendations
            </h2>

            <ul className="space-y-2">
              {report.recommendations.map((item) => (
                <li key={item}>📘 {item}</li>
              ))}
            </ul>

          </div>

        </div>

      </div>
    </div>
  );
}