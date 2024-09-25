import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import EmployeesManagement from "./pages/EmployeesManagement";
import EmployeeDetailPage from "./components/EmployeeDetailPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" exact element={<Navigate to="/employee" />} />
          <Route path="/employee" element={<EmployeesManagement />} />
          <Route path="/employee/:id" element={<EmployeeDetailPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
