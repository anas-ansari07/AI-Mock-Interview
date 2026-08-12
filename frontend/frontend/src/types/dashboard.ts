export interface DashboardSummary {
  total_interviews: number;
  average_score: number;
  highest_score: number;
}

export interface RecentInterview {
  id: number;
  username: string;
  role: string;
  overall_score: number;
}

export interface DashboardResponse {
  summary: DashboardSummary;
  recent_interviews: RecentInterview[];
}