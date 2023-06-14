const { Router } = require("express");

class CoursesRoutes {
  path = "/courses";
  router = Router();

  constructor() {
    this.initCoursesRoutes();
  }

  initCoursesRoutes() {
    this.router.get(`${this.path}`, async (req, res) => {
      return res.json({ message: `course path` });
    });

    this.router.get(`${this.path}/:courseId`, async (req, res) => {
      return res.json({ message: `course GET` });
    });

    this.router.post(`${this.path}/`, async (req, res) => {
      return res.json({ message: `course POST` });
    });

    this.router.put(`${this.path}/:courseId`, async (req, res) => {
      return res.json({ message: `course PUT` });
    });

    this.router.delete(`${this.path}/:courseId`, async (req, res) => {
      return res.json({ message: `course DELETE` });
    });
  }
}

module.exports = CoursesRoutes;
