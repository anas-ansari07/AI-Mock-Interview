import axios from "axios";
import type { AnswerRequest, AnswerResponse, StartInterviewRequest } from "../types/interview";



const api = axios.create({
    baseURL : "http://127.0.0.1:8000/interview"
})

export const startInterview = async (
    data : StartInterviewRequest
): Promise<AnswerResponse> => {
    const response = await api.post<AnswerResponse>("/start",data)
    return response.data;
};

export const submitAnswer = async (
  data: AnswerRequest
): Promise<AnswerResponse> => {
  const response = await api.post<AnswerResponse>("/answer", data);
  return response.data;
};

export default api;