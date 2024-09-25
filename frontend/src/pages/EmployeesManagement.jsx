import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import EmployeeForm from "../components/EmployeeForm";
import SearchBar from "../components/SearchBar";
import LimitSelector from "../components/LimitSelector";
import EmployeeList from "../components/EmployeeList";
import PaginationControls from "../components/PaginationControl";
import UpdateEmployeeModal from "../components/UpdateEmployeeModal"; // Import the modal
import { toast } from "react-toastify";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false); // Modal visibility state
  const [employeeToEdit, setEmployeeToEdit] = useState(null); // Employee selected for editing

  const baseUrl =
    "https://employee-mangement-app-backend.onrender.com/api/employee";

  // Fetch employees
  const fetchEmployees = useCallback(async () => {
    try {
      const response = await axios.get(baseUrl, {
        params: { page, limit, search },
      });

      setEmployees(response.data.employees);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  }, [page, limit, search]);

  useEffect(() => {
    fetchEmployees();
  }, [page, limit, search, fetchEmployees]);

  // Add employee (with image upload)
  const handleAddEmployee = async (formData) => {
    try {
      await axios.post(baseUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setShowForm(!showForm);
      toast.success("Employee added successfully!.");
      fetchEmployees();
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  // Delete employee
  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`${baseUrl}/${id}`);
      fetchEmployees();
      toast.warning("Employee deleted successfully");
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  // Trigger update modal with employee details
  const handleEditEmployee = (employee) => {
    setEmployeeToEdit(employee); // Set the selected employee for editing
    setShowUpdateModal(true); // Show the modal
  };

  // Update employee (simplified)
  const handleUpdateEmployee = async (id, updatedData) => {
    try {
      await axios.put(`${baseUrl}/${id}`, updatedData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchEmployees();
      setShowUpdateModal(false); // Close the modal after update
      toast.success("Employee updated successfully");
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="my-3 fw-bold">Employee Management</h1>
      <div className="header d-flex justify-content-around align-items-center">
        <div className="search-limit">
          {/* Search Bar */}
          <SearchBar search={search} onSearchChange={setSearch} />

          {/* Limit Selector */}
          <LimitSelector limit={limit} onLimitChange={setLimit} />
        </div>

        <div className="btn btn-warning" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Hide Form" : "Add Employee"}
        </div>
      </div>

      {/* Add Employee Form */}
      {showForm && <EmployeeForm onAddEmployee={handleAddEmployee} />}

      {/* Employee List */}
      {!showForm && (
        <EmployeeList
          employees={employees}
          onEditEmployee={handleEditEmployee} // Trigger the modal on edit
          onDeleteEmployee={handleDeleteEmployee}
        />
      )}

      {/* Pagination Controls */}
      {!showForm && (
        <PaginationControls
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}

      {/* Update Employee Modal */}
      {showUpdateModal && (
        <UpdateEmployeeModal
          employee={employeeToEdit}
          onUpdateEmployee={handleUpdateEmployee}
          onClose={() => setShowUpdateModal(false)} // Close modal
        />
      )}
    </div>
  );
};

export default EmployeeManagement;
