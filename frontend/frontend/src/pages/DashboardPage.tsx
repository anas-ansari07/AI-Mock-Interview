import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardCard from "../components/DashboardCard";
import RecentInterviewTable from "../components/RecentInterviewTable";

import { getDashboard } from "../api/DashboardApi";

import type { DashboardResponse } from "../types/dashboard";

export default function DashboardPage() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState<DashboardResponse | null>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const response = await getDashboard();

      setDashboard(response);
    } catch (error) {
      console.error(error);
    }
  }

  if (!dashboard) {
    return <div className="p-8 text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-white">Dashboard</h1>

        <button
          onClick={() => navigate("/interview")}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500"
        >
          Start Interview
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <DashboardCard
          title="Total Interviews"
          value={dashboard.summary.total_interviews}
        />

        <DashboardCard
          title="Average Score"
          value={`${dashboard.summary.average_score}%`}
        />

        <DashboardCard
          title="Highest Score"
          value={`${dashboard.summary.highest_score}%`}
        />
      </div>

      <RecentInterviewTable interviews={dashboard.recent_interviews} />
    </div>
  );
}
