export interface StartInterviewRequest {
  role: string;
  experience: string;
  username: string;
  duration: number;
}

export interface StartInterviewResponse {
  session_id: string;
  ai_message: string;
}

export interface AnswerRequest {
  session_id: string;
  answer: string;
}

export interface Feedback {
  score: number;
  strengths: string[];
  improvements: string[];
}

export interface AnswerResponse {
  session_id: string;
  feedback: Feedback;
  next_question: string;
}

export interface ChatMessage {
  id: string;
  sender: "ai" | "user";
  text: string;
  isTyping?: boolean
}

export interface FinishInterviewRequest {
  session_id: string;
}

export interface InterviewReport {
  overall_score: number;
  technical_score: number;
  communication_score: number;
  confidence_score: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}