import express from "express";
import cookieParser from "cookie-parser";
import displayRoutes from "express-routemap";
import compression from "express-compression";

const app = express();

const PORT_APP = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(compression()); // usando algoritmo GZIP
app.use(
  compression({
    brotli: { enable: true, zlib: {} },
  })
);

app.use("/api/long-str/", (req, res) => {
  let baseStr = `Hola Coders`;
  for (let index = 0; index < 10e1; index++) {
    baseStr += `hola Coders, contatenando string forever`;
  }
  res.send(baseStr);
});

app.listen(PORT_APP, () => {
  displayRoutes(app);
  console.log(`Listening on ${PORT_APP}`);
});
