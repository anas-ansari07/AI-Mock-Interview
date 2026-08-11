import { useState } from "react";
import {
  startInterview,
  submitAnswer,
  finishInterview,
} from "../api/InterviewApi";
import {
  type InterviewReport,
  type ChatMessage,
  type Feedback,
} from "../types/interview";
import ChatWindow from "../components/ChatWindow";
import AnswerInput from "../components/AnswerInput";
import FeedbackCard from "../components/FeedBackCard";
import useCountdown from "../hooks/useCountdown";
import GenerateInterviewReport from "./InterviewReport";
import { formatTime } from "../utils/formatTime";

export default function InterviewPage() {
  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [username, setusername] = useState("");
  const [duration, setduration] = useState(10);
  const [report, setreport] = useState<InterviewReport | null>(null);

  const roles = [
    ".Net Backend Developer",
    "React Developer",
    "Python Developer",
    "Java Developer",
    "Node.js Developer",
    "Full Stack Developer",
  ];

  const totalExp = [
    "3 Years",
    "4 Years",
    "5 Years",
    "7 Years",
    "9 Years",
    "10+ Years",
  ];

  const totalDuration = [
    "10",
    "15",
    "20",
    "25",
    "30",
  ];

  const secondsLeft = useCountdown({
    duration: duration * 60,
    isRunning: !!sessionId,
  });

  async function handleStartInterview() {
    setLoading(true);
    try {
      const response = await startInterview({
        role,
        experience,
        username,
        duration,
      });

      setSessionId(response.session_id);
      setduration(duration);
      console.log(duration);
      setMessages([
        {
          id: crypto.randomUUID(),
          sender: "ai",
          text: response.next_question,
        },
      ]);
    } catch (error) {
      console.error(error);
      alert("Unable to start interview");
    }

    setLoading(false);
  }

  async function handleAnswer(answer: string) {
    if (!sessionId) return;

    setLoading(true);

    try {
      // Add user's message
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          sender: "user",
          text: answer,
        },
      ]);

      const typingId = crypto.randomUUID();

      setMessages((prev) => [
        ...prev,
        {
          id: typingId,
          sender: "ai",
          text: "",
          isTyping: true,
        },
      ]);

      // Call backend
      const response = await submitAnswer({
        session_id: sessionId,
        answer,
      });

      // Save feedback
      setFeedback(response.feedback);

      // Add AI question
      setMessages((prev) =>
        prev.map((message) =>
          message.id === typingId
            ? {
                ...message,
                isTyping: false,
                text: response.next_question,
              }
            : message,
        ),
      );
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }

  async function handleFinishInterview() {
    if (!sessionId) return;

    try {
      const report = await finishInterview({
        session_id: sessionId,
      });

      setreport(report);

      console.log(report);
    } catch (error) {
      console.error(error);
    }
  }

  if (report) {
    return <GenerateInterviewReport report={report} />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700 px-8 py-5">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Interview Coach AI</h1>

          {sessionId && (
            <div className="rounded-lg bg-slate-800 px-4 py-2 text-lg font-semibold text-green-400 shadow">
              {formatTime(secondsLeft)}
            </div>
          )}
        </div>
      </header>

      {/* Body */}

      <main className="mx-auto flex max-w-5xl flex-col gap-6 p-6">
        {/* Adding Two Inputs for taking Role & Experience */}

        {!sessionId && (
          <div className="mb-6 flex flex-col gap-4 rounded-lg border border-slate-700 bg-slate-800 p-6">
            <div>
              <label className="mb-2 block text-sm font-medium">Name</label>

              <input
                className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white outline-none focus:border-blue-500"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Role</label>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white outline-none focus:border-blue-500"
              >
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
                /
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Experience
              </label>

              <select
                value={role}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white outline-none focus:border-blue-500"
              >
                {totalExp.map((exp) => (
                  <option key={exp} value={exp}>
                    {exp}
                  </option>
                ))}
                /
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Duration</label>

              <select
                value={duration}
                onChange={(e) => setduration(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white outline-none focus:border-blue-500"
              >
                {totalDuration.map((duration) => (
                  <option key={duration} value={duration}>
                    {duration} Minutes
                  </option>
                ))}
                /
              </select>
            </div>
          </div>
        )}

        <button
          onClick={handleStartInterview}
          disabled={loading || sessionId !== ""}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500 disabled:opacity-50"
        >
          {loading ? "Starting..." : "Start Interview"}
        </button>

        <ChatWindow messages={messages} />

        {feedback && <FeedbackCard feedback={feedback} />}

        {sessionId && <AnswerInput loading={loading} onSubmit={handleAnswer} />}

        {sessionId && (
          <button
            onClick={handleFinishInterview}
            className="mt-4 rounded-lg bg-red-600 px-6 py-3 text-white hover:bg-red-500"
          >
            Finish Interview
          </button>
        )}
      </main>
    </div>
  );
}
