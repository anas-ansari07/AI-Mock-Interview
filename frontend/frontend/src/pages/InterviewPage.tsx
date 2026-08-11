import { useState } from "react";
import { startInterview, submitAnswer } from "../api/InterviewApi";
import type { ChatMessage, Feedback } from "../types/interview";
import ChatWindow from "../components/ChatWindow";
import AnswerInput from "../components/AnswerInput";
import FeedbackCard from "../components/FeedBackCard";

export default function InterviewPage() {
  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [role, setRole] = useState(".Net Backend Developer");
  const [experience, setExperience] = useState("2 Years");

  const roles =[
    ".NET Backend Developer",
    "React Developer",
    "Python Developer",
    "Java Developer",
    "Node.js Developer",
    "Full Stack Developer",
  ]

  const totalExp =[
    "3 Years",
    "4 Years",
    "5 Years",
    "7 Years",
    "9 Years",
    "10+ Years",
  ]

  async function handleStartInterview() {
    setLoading(true);

    try {
      const response = await startInterview({
        //role: ".NET Backend Developer",
        //experience: "2 years",
        role,
        experience,
      });

      setSessionId(response.session_id);

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

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}

      <header className="border-b border-slate-700 px-8 py-5">
        <h1 className="text-3xl font-bold">Interview Coach AI</h1>
      </header>

      {/* Body */}

      <main className="mx-auto flex max-w-5xl flex-col gap-6 p-6">
        {/* Adding Two Inputs for taking Role & Experience */}

        {!sessionId && (
          <div className="mb-6 flex flex-col gap-4 rounded-lg border border-slate-700 bg-slate-800 p-6">
            <div>
              <label className="mb-2 block text-sm font-medium">Role</label>

              <select value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white outline-none focus:border-blue-500"
              >
                {
                  roles.map((r) =>(
                    <option key ={r} value={r}>
                      {r}
                    </option>
                  ))
                }
                /</select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Experience
              </label>

              <select value={role}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white outline-none focus:border-blue-500"
              >
                {
                  totalExp.map((exp) =>(
                    <option key ={exp} value={exp}>
                      {exp}
                    </option>
                  ))
                }
                /</select>            
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
      </main>
    </div>
  );
}
