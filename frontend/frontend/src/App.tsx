import './App.css'
import { Routes, Route } from "react-router-dom";
import InterviewPage from './pages/InterviewPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<DashboardPage />}
      />

      <Route
        path="/interview"
        element={<InterviewPage />}
      />
    </Routes>
  );
}

export default App;
