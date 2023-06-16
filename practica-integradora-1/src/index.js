const App = require("./app");
const BaseRoute = require("./routes/base.routes.js");
const StudentsRoute = require("./routes/students.routes");
const CoursesRoute = require("./routes/course.routes");
const viewsRoutes = require("./routes/views.routes");

const app = new App([
  new BaseRoute(),
  new StudentsRoute(),
  new CoursesRoute(),
  new viewsRoutes(),
]);

app.listen();
