const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Student = require("../models/student.models");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const newFileName = Date.now() + path.extname(file.originalname);
    cb(null, newFileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
  fileFilter: fileFilter,
});

// Get All Students
router.get("/", async (req, res) => {
  try {

    const search = req.query.search || '';

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    

    const query = {
        $or: [
            {first_name: {$regex: search, $options: 'i'}},
            {last_name: {$regex: search, $options: 'i'}}
        ]
    }

    const totalRecords = await Student.countDocuments(query);

    const students = await Student.find(query).skip(skip).limit(limit);
    
    return res.json({
        totalRecords,
        page,
        limit,
        totalPages: Math.ceil(totalRecords/limit),
        students
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Get Single Student
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    return res.json(student);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Add New Student
router.post("/", upload.single("profile_pic"), async (req, res) => {
  try {
    // const studentAdded = await Student.create(req.body);
    const student = new Student(req.body);
    if (req.file) {
      student.profile_pic = req.file.filename;
    }
    const newStudent = await student.save();

    // return res.status(201).json(studentAdded);
    return res.status(201).json(newStudent);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// Update a Student
router.put("/:id", upload.single("profile_pic"), async (req, res) => {
  try {
    const existingStudent = await Student.findById(req.params.id);
    if (!existingStudent) {
      if (req.file.filename) {
        const imgPath = path.join("./uploads", req.file.filename);
        fs.unlink(imgPath, (err) => {
          if (err) console.log("Failed to delete image: ", err.message);
        });
      }
      return res.status(404).json({ message: "Student not found" });
    }

    if (req.file) {
      const oldImgPath = path.join("./uploads", existingStudent.profile_pic);
      fs.unlink(oldImgPath, (err) => {
        if (err) console.log("Failed to delete old image: ", err.message);
        else console.log("Old physical image file removed successfully.");
      });
      req.body.profile_pic = req.file.filename;
    }

    const studentUpdated = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after", runValidators: true }, // To return new data (Updated data)
    );
    return res.json(studentUpdated);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Delete a Student
router.delete("/:id", async (req, res) => {
  try {
    const studentDeleted = await Student.findByIdAndDelete(req.params.id);
    if (!studentDeleted)
      return res.status(404).json({ message: "Student not found" });

    // Student ko delete karne ke baad uploads folder se student ki profile pic ko bhi delete karna
    if (studentDeleted.profile_pic) {
      const imgFilePath = path.join("./uploads", studentDeleted.profile_pic); // proile pic ka path nikalna
      fs.unlink(imgFilePath, (err) => {
        // unlink() method file/folder ko delete karne ke liye use hota hai
        if (err) console.log("Failed to delete: ", err);
      });
    }
    return res.json({ message: "Student Deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;