import React from "react";

const EmployeeRow = ({ employee, onEditEmployee, onDeleteEmployee }) => {
  return (
    <tr>
      <td>
        <img src={employee?.profileImage} alt="profile" />
      </td>
      <td>{employee.name}</td>
      <td>{employee.email}</td>
      <td>{employee.department}</td>
      <td>{employee.phone}</td>
      <td className="d-flex justify-content-center">
        <button
          className="btn btn-warning mx-3"
          onClick={() => onEditEmployee(employee)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger"
          onClick={() => onDeleteEmployee(employee._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default EmployeeRow;
