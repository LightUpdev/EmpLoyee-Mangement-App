import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeesManagement from "./pages/EmployeesManagement";
import EmployeeDetailPage from "./components/EmployeeDetailPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/employee" element={<EmployeesManagement />} />
          <Route path="/employee/:id" element={<EmployeeDetailPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
