import axios from "axios";
import type { DashboardResponse } from "../types/dashboard";

const api = axios.create({
    baseURL : "http://127.0.0.1:8000/interview"
})

export const getDashboard = async (): Promise<DashboardResponse> => {
  const response = await api.get<DashboardResponse>(
    "/dashboard"
  );

  return response.data;
};