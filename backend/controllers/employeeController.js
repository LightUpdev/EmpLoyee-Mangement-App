const asyncHandler = require("express-async-handler");
const EmployeeModel = require("../models/employeeModel");

const createEmployee = asyncHandler(async (req, res) => {
  try {
    const { name, email, salary, department, phone } = req.body;
    const profileImage = req.file ? req.file?.path : null;

    // check if user already exist
    const isUserExist = await EmployeeModel.findOne({ email });

    if (isUserExist) {
      res.status(400);
      throw new Error("User already exists");
    }

    if (req.body && !isUserExist) {
      const employee = await EmployeeModel.create({
        name,
        email,
        salary,
        department,
        phone,
        profileImage,
      });

      res.status(201).json({
        employee,
        success: true,
        message: "Employee created successfully",
      });
    } else {
      res.status(400).json({ message: "please provide data for fields" });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const updateEmployee = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const updateData = req.body;

  try {
    // Create an update object dynamically based on the request body
    const updateFields = {};

    if (updateData.name) updateFields.name = updateData.name;
    if (updateData.phone) updateFields.phone = updateData.phone;
    if (updateData.department) updateFields.department = updateData.department;
    if (updateData.salary) updateFields.salary = updateData.salary;

    // If an image is uploaded, handle the Cloudinary upload
    if (req.file) {
      updateFields.profileImage = req.file.path; // Cloudinary returns the image URL in req.file.path
    }

    // If no fields to update, send a response
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    // Perform the update
    const updatedUser = await EmployeeModel.findByIdAndUpdate(
      userId,
      { $set: updateFields }, // Only update the fields provided
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    // If user not found, send 404
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the updated user
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const getAllEmployee = asyncHandler(async (req, res) => {
  const { page, limit, search = "" } = req.query; // Get query parameters

  try {
    // Build the search query
    const searchQuery = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } }, // Case-insensitive search on "name"
            { email: { $regex: search, $options: "i" } }, // Case-insensitive search on "email"
            { department: { $regex: search, $options: "i" } }, // Case-insensitive search on "department"
          ],
        }
      : {};

    // Pagination calculation
    const skip = (page - 1) * limit;

    // Fetch employees with search, limit, and pagination
    const employees = await EmployeeModel.find(searchQuery)
      .limit(Number(limit)) // Limit the results
      .skip(skip); // Skip the appropriate number of results for pagination

    // Get total number of employees matching the search query
    const totalEmployee = await EmployeeModel.countDocuments(searchQuery);

    // Return the data along with pagination info
    res.status(200).json({
      employees,
      totalPages: Math.ceil(totalEmployee / limit),
      currentPage: Number(page),
      totalEmployee,
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const getEmployee = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await EmployeeModel.findById(id);
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(400);
      throw new Error("Employee not found.");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const deleteEmployee = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await EmployeeModel.findByIdAndDelete(id);
    if (employee) {
      res
        .status(200)
        .json({ employee, message: "Employee deleted successfully" });
    } else {
      res.status(400);
      throw new Error("Employee not found.");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = {
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
  getAllEmployee,
};
