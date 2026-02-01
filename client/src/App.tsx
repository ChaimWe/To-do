import { useCurrentUser } from "./hooks/userHooks/useCurrentUser";
import AdminPage  from "./pages/AdminPage";
import TaskPage from "./pages/TaskPage";

function App() {
  const {data: currentUser} = useCurrentUser();
  return (<>
  <TaskPage />
  {currentUser?.role === "admin" && <AdminPage/>}
  </>
)
}

export default App;
