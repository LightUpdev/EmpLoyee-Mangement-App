const { default: mongoose } = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "please provide name in field"] },
    email: {
      type: String,
      unique: true,
      required: [true, "please provide email in field"],
    },
    phone: { type: String, required: [true, "please provide phone number"] },
    department: {
      type: String,
      required: [true, "please provide your department"],
    },
    salary: {
      type: String,
      required: [true, "please provide amount of salary in field"],
    },
    profileImage: {
      type: String,
      required: [true, "please provide profile image"],
    },
  },
  {
    timestamps: true,
  }
);

const EmployeeModel = new mongoose.model("Employee", employeeSchema);

module.exports = EmployeeModel;
