import React, { useState } from "react";

const EmployeeForm = ({ onAddEmployee }) => {
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    department: "",
    phone: "",
    salary: "",
    profileImage: null,
  });
  console.log(newEmployee.profileImage);

  const handleImageChange = (e) => {
    setNewEmployee({ ...newEmployee, profileImage: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // FormData to send profile image with other data
    const formData = new FormData();
    formData.append("name", newEmployee.name);
    formData.append("email", newEmployee.email);
    formData.append("department", newEmployee.department);
    formData.append("phone", newEmployee.phone);
    formData.append("salary", newEmployee.salary);
    if (newEmployee.profileImage) {
      formData.append("profileImage", newEmployee.profileImage);
    }

    onAddEmployee(formData); // Submit form data
    setNewEmployee({
      name: "",
      email: "",
      department: "",
      phone: "",
      salary: "",
      profileImage: null,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={newEmployee.name}
        onChange={(e) =>
          setNewEmployee({ ...newEmployee, name: e.target.value })
        }
      />
      <input
        type="email"
        placeholder="Email"
        value={newEmployee.email}
        onChange={(e) =>
          setNewEmployee({ ...newEmployee, email: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Department"
        value={newEmployee.department}
        onChange={(e) =>
          setNewEmployee({ ...newEmployee, department: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Phone"
        value={newEmployee.phone}
        onChange={(e) =>
          setNewEmployee({ ...newEmployee, phone: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Salary"
        value={newEmployee.salary}
        onChange={(e) =>
          setNewEmployee({ ...newEmployee, salary: e.target.value })
        }
      />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button className="btn btn-warning fw-bold btn-block" type="submit">Add Employee</button>
    </form>
  );
};

export default EmployeeForm;
