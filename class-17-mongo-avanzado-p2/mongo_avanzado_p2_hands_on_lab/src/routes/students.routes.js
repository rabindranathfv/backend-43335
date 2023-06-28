const { Router } = require("express");

const studentsModel = require("../model/student.model");
const stundentsData = require("../data/students");

const router = Router();

router.get("/insertion", async (req, res) => {
  try {
    let result = await studentsModel.insertMany(stundentsData);

    return res.json({
      message: `bulk insertion successfully`,
      students: result,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: students.routes.js:12 ~ router.get ~ error:",
      error
    );
  }
});

// TODO: ESTE ENDPOINT SE DEFINICION ASI YA QUE LO IMPORTANTE SON LAS CONSULTAS
// CON EL METEDO AGREGATE - NO ES UNA BUENA PRACTICA
router.get("/grupos", async (req, res) => {
  try {
    // Estudiantes agrupados por calificacion del mejor al peor
    const studentsByGrade = await studentsModel.aggregate([
      {
        $group: { _id: "$grade", students: { $push: "$$ROOT" } },
      },
      {
        $sort: { _id: -1 },
      },
    ]);

    const studentsByGradeV2 = await studentsModel.aggregate([
      { $sort: { grade: -1 } },
      { $group: { _id: "$grade", students: { $push: "$$ROOT" } } },
    ]);

    // AGRUPAR ESTUDIANTES POR GRUPO
    const studentsInGroups = await studentsModel.aggregate([
      { $group: { _id: "$group", students: { $push: "$$ROOT" } } },
    ]);

    return res.json({
      message: `queries de agrupacion`,
      studentsByGrade,
      studentsByGradeV2,
      studentsInGroups,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: students.routes.js:38 ~ router.get ~ error:",
      error
    );
  }
});

router.get("/promedio/grupo", async (req, res) => {
  try {
    const group = req.query.group ?? "1B";
    //PROMEDIO ESTUDIANTES 1B
    const studentAverage1B = await studentsModel.aggregate([
      { $match: { group: `${group}` } },
      { $group: { _id: "1B", promedio: { $avg: "$grade" } } },
    ]);

    // PROMEDIO DE ESTUDIANTES 1A
    const studentsAverage1A = await studentsModel.aggregate([
      { $match: { group: "1A" } },
      { $group: { _id: "1A", promedio: { $avg: "$grade" } } },
    ]);

    return res.json({
      message: `average for students in class 1A and 1B`,
      studentAverage1B,
      studentsAverage1A,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: students.routes.js:65 ~ router.get ~ error:",
      error
    );
  }
});

router.get("/promedio/general", async (req, res) => {
  try {
    //PROMEDIO GENERAL DE ESTUDIANTES.
    const generalAverage = await studentsModel.aggregate([
      { $group: { _id: "Students", promedio: { $avg: "$grade" } } },
    ]);

    return res.json({
      message: `general average`,
      generalAverage,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: students.routes.js:87 ~ router.get ~ error:",
      error
    );
  }
});

router.get("/promedio/calificaciones/:gender", async (req, res) => {
  try {
    const { gender } = req.params;
    // PROMEDIO SOLO HOMBRES
    const maleStudentAverage = await studentsModel.aggregate([
      { $match: { gender: "Male" } },
      {
        $group: {
          _id: "Hombres",
          promedio: { $avg: "$grade" },
        },
      },
    ]);

    //PROMEDIO MUJERES
    const femaleStudentAverage = await studentsModel.aggregate([
      { $match: { gender: "Female" } },
      { $group: { _id: "Mujeres", promedio: { $avg: "$grade" } } },
    ]);

    const genderStunderAverage = await studentsModel.aggregate([
      { $match: { gender: `${gender}` } },
      {
        $group: {
          _id: `${gender}`,
          promedio: { $avg: "$grade" },
          cantidad: { $sum: "$grade" },
          cantidadEst: { $sum: 1 },
        },
      },
    ]);

    return res.json({
      message: `students average for male and female`,
      maleStudentAverage,
      femaleStudentAverage,
      genderStunderAverage,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: students.routes.js:142 ~ router.get ~ error:",
      error
    );
  }
});

module.exports = router;
