import type { Feedback } from "../types/interview";

interface Props {
  feedback: Feedback;
}

export default function FeedbackCard({ feedback }: Props) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">

      <div className="mb-5 flex items-center justify-between">

        <h2 className="text-xl font-bold">
          Interview Feedback
        </h2>

        <div className="rounded-lg bg-blue-600 px-4 py-2 font-bold">
          {feedback.score}/10
        </div>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <div>

          <h3 className="mb-2 font-semibold text-green-400">
            Strengths
          </h3>

          <ul className="space-y-2">

            {feedback.strengths.map((item) => (

              <li key={item}>
                ✅ {item}
              </li>

            ))}

          </ul>

        </div>

        <div>

          <h3 className="mb-2 font-semibold text-yellow-400">
            Improvements
          </h3>

          <ul className="space-y-2">

            {feedback.improvements.map((item) => (

              <li key={item}>
                ⚠ {item}
              </li>

            ))}

          </ul>

        </div>

      </div>

    </div>
  );
}