import ChatMessage from "./ChatMessage";
import type { ChatMessage as ChatMessageType } from "../types/interview";
import { useEffect, useRef } from "react";

interface Props {
  messages: ChatMessageType[];
}

export default function ChatWindow({ messages }: Props) {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="h-[500px] overflow-y-auto rounded-xl border border-slate-700 bg-slate-800 p-6">
      {messages.length === 0 ? (
        <div className="flex h-full items-center justify-center text-slate-400">
          Start an interview to begin.
        </div>
      ) : (
        messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))
      )}

      <div ref={bottomRef}></div>
    </div>
  );
}
