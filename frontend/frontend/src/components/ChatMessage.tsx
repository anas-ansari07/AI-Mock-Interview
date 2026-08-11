import type { ChatMessage as ChatMessageType } from "../types/interview";

interface Props {
  message: ChatMessageType;
}

// export default function ChatMessage({ message }: Props) {
//   return (
//     <div
//       style={{
//         marginBottom: "16px",
//         padding: "12px",
//         borderRadius: "8px",
//         background:
//           message.sender === "ai"
//             ? "#f3f4f6"
//             : "#dbeafe",
//       }}
//     >
//       <strong>
//         {message.sender === "ai" ? "🤖 AI" : "👤 You"}
//       </strong>

//       <p>{message.text}</p>
//     </div>
//   );
// }

export default function ChatMessage({ message }: Props) {
  const isAI = message.sender === "ai";

  return (
    <div className={`mb-5 flex ${isAI ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[75%] rounded-xl px-5 py-3 ${
          isAI ? "bg-slate-700" : "bg-blue-600"
        }`}
      >
        <p className="mb-1 text-sm font-semibold">
          {isAI ? "🤖 AI" : "👤 You"}
        </p>

        {message.isTyping ? (
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-bounce rounded-full bg-white"></div>
            <div className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:150ms]"></div>
            <div className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:300ms]"></div>
          </div>
        ) : (
          <p>{message.text}</p>
        )}
      </div>
    </div>
  );
}
