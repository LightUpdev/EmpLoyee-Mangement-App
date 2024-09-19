import React, { useState, useEffect } from "react";

const UpdateEmployeeModal = ({ employee, onUpdateEmployee, onClose }) => {
  const [updatedEmployee, setUpdatedEmployee] = useState({
    name: employee?.name,
    email: employee?.email,
    department: employee?.department,
    phone: employee?.phone,
    salary: employee?.salary,
    profileImage: null,
  });

  useEffect(() => {
    setUpdatedEmployee({
      name: employee?.name,
      email: employee?.email,
      department: employee?.department,
      phone: employee?.phone,
      salary: employee?.salary,
      profileImage: null,
    });
  }, [employee]);

  const handleImageChange = (e) => {
    setUpdatedEmployee({ ...updatedEmployee, profileImage: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", updatedEmployee?.name);
    formData.append("email", updatedEmployee?.email);
    formData.append("department", updatedEmployee?.department);
    formData.append("phone", updatedEmployee?.phone);
    formData.append("salary", updatedEmployee?.salary);
    if (updatedEmployee?.profileImage) {
      formData.append("profileImage", updatedEmployee?.profileImage);
    }

    onUpdateEmployee(employee?._id, formData); // Submit update
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="text-dark fw-bold mt-1 mb-3">Edit Employee</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={updatedEmployee.name}
            onChange={(e) =>
              setUpdatedEmployee({ ...updatedEmployee, name: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            value={updatedEmployee.email}
            onChange={(e) =>
              setUpdatedEmployee({ ...updatedEmployee, email: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Department"
            value={updatedEmployee.department}
            onChange={(e) =>
              setUpdatedEmployee({
                ...updatedEmployee,
                department: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Phone"
            value={updatedEmployee.phone}
            onChange={(e) =>
              setUpdatedEmployee({ ...updatedEmployee, phone: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Salary"
            value={updatedEmployee.salary}
            onChange={(e) =>
              setUpdatedEmployee({ ...updatedEmployee, salary: e.target.value })
            }
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button className="btn btn-warning fw-bold" type="submit">Update</button>
          <button className="btn btn-danger fw-bold" type="button" onClick={onClose}>
            Close
          </button>{" "}
          {/* Close modal */}
        </form>
      </div>
    </div>
  );
};

export default UpdateEmployeeModal;
