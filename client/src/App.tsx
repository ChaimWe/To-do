import { Route, Routes } from "react-router-dom";
import TaskPage from "./pages/TaskPage";
// import AdminPage from "./pages/AdminPage";
import { Dashboard } from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/tasks" element={<TaskPage />} />
      {/* <Route path="/admin" element={<AdminPage />} /> */}
    </Routes>
  );
}

export default App;