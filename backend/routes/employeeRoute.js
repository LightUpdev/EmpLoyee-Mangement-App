const {
  createEmployee,
  getAllEmployee,
  getEmployee,
  deleteEmployee,
  updateEmployee,
} = require("../controllers/employeeController");
const { cloudinaryFileUploader } = require("../middleware/fileUploader");

const route = require("express").Router();

route.post("/", cloudinaryFileUploader.single("profileImage"), createEmployee);
route.get("/", getAllEmployee);
route.get("/:id", getEmployee);
route.put(
  "/:id",
  cloudinaryFileUploader.single("profileImage"),
  updateEmployee
);
route.delete("/:id", deleteEmployee);

module.exports = route;
