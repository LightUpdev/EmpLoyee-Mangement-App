import React from "react";
import EmployeeRow from "./EmployeeRow";

const EmployeeList = ({ employees, onEditEmployee, onDeleteEmployee }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <EmployeeRow
            key={employee._id}
            employee={employee}
            onEditEmployee={onEditEmployee}
            onDeleteEmployee={onDeleteEmployee}
          />
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeList;
