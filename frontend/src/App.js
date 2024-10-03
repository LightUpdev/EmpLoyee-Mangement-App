import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeesManagement from "./pages/EmployeesManagement";
import EmployeeDetailPage from "./components/EmployeeDetailPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

function App() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 768) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };

    // Check screen size when component mounts
    checkScreenSize();

    // Add resize event listener
    window.addEventListener("resize", checkScreenSize);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="App">
      {isSmallScreen && (
        <div style={warningStyle}>
          <p>Warning: This project is best viewed on a larger screen!</p>
        </div>
      )}
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" exact element={<EmployeesManagement />} />
          <Route path="/:id" element={<EmployeeDetailPage />} />
        </Routes>
      </Router>
    </div>
  );
}

const warningStyle = {
  position: "fixed",
  bottom: "20px",
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: "#f8d7da",
  color: "#721c24",
  padding: "10px",
  borderRadius: "5px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
  zIndex: 1000,
};

export default App;
