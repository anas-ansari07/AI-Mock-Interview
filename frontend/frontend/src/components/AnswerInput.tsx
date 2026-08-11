import { useState } from "react";

interface Props {
  loading: boolean;
  onSubmit: (answer: string) => Promise<void>;
}

export default function AnswerInput({
  loading,
  onSubmit,
}: Props) {
  const [answer, setAnswer] = useState("");

  async function handleSubmit() {
    if (!answer.trim()) return;

    await onSubmit(answer);

    setAnswer("");
  }

  return (
    <div
      style={{
        marginTop: 20,
        display: "flex",
        gap: 10,
      }}
    >
      <input
        disabled = {loading}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your answer..."
        style={{
          flex: 1,
          padding: 10,
        }}
        onKeyDown={(e) => {
            if (e.key == "Enter"){
                handleSubmit();
            }
        }}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Sending..." : "Send"}
      </button>
    </div>
  );
}