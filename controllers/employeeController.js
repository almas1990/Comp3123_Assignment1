
const mongoose = require("mongoose");
const Employee = require("../models/Employee");

const fields = [
  "first_name",
  "last_name",
  "email",
  "gender",
  "designation",
  "salary",
  "date_of_joining",
  "department"
];

const pickFields = (body) => {
  const data = {};
  for (const field of fields) {
    if (Object.prototype.hasOwnProperty.call(body, field)) {
      data[field] = body[field];
    }
  }
  return data;
};

const handleError = (error, res) => {
  if (error.name === "ValidationError" ||
      error.name === "CastError") {
    return res.status(400).json({
      message: error.message
    });
  }

  console.error("Employee API error:", error);
  return res.status(500).json({
    message: "Internal server error"
  });
};

const createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create({
      ...pickFields(req.body),
      created_by: req.user._id
    });

    return res.status(201).json({
      message: "Employee created successfully",
      employee
    });
  } catch (error) {
    return handleError(error, res);
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({
      created_by: req.user._id
    }).sort({ createdAt: -1 });

    return res.status(200).json({ employees });
  } catch (error) {
    return handleError(error, res);
  }
};

const getEmployeeById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid employee ID"
      });
    }

    const employee = await Employee.findOne({
      _id: req.params.id,
      created_by: req.user._id
    });

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }

    return res.status(200).json({ employee });
  } catch (error) {
    return handleError(error, res);
  }
};

const updateEmployee = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid employee ID"
      });
    }

    const employee = await Employee.findOneAndUpdate(
      {
        _id: req.params.id,
        created_by: req.user._id
      },
      { $set: pickFields(req.body) },
      { new: true, runValidators: true }
    );

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }

    return res.status(200).json({
      message: "Employee updated successfully",
      employee
    });
  } catch (error) {
    return handleError(error, res);
  }
};

const deleteEmployee = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid employee ID"
      });
    }

    const employee = await Employee.findOneAndDelete({
      _id: req.params.id,
      created_by: req.user._id
    });

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }

    return res.status(200).json({
      message: "Employee deleted successfully"
    });
  } catch (error) {
    return handleError(error, res);
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
};
