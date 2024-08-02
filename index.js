import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import cors from "cors";
import express from "express";
import {
  createUniversity,
  deleteUniversity,
  getUniversities,
  updateUniversity,
  
} from "./controllers/University.js";
import {
  createDepartment,
  deleteDepartment,
  getDepartmentsByUniversityId,
  updateDepartment,
} from "./controllers/Department.js";
import {
  createProduct,
  deleteProduct,
  getAllProductsByDepartmentId,
  productDetails,
  updateProduct,
  updateProductQty,
} from "./controllers/Product.js";
import { login, register } from "./controllers/User.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

//University Module
const storageUniv = multer.diskStorage({
  destination: "uploadsUniv/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});
const uploadUniv = multer({
  storage: storageUniv,
});

app.post("/university", uploadUniv.single("image"), createUniversity);
app.put("/university", uploadUniv.single("image"), updateUniversity);
app.delete("/university", deleteUniversity);
app.get("/university", getUniversities);

//Department Module
const storageDep = multer.diskStorage({
  destination: "uploadsDep/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});
const uploadDep = multer({
  storage: storageDep,
});

app.post("/department", uploadDep.single("image"), createDepartment);
app.put("/department", uploadDep.single("image"), updateDepartment);
app.delete("/department", deleteDepartment);
app.get("/department", getDepartmentsByUniversityId);

//Product Module
const storageProduct = multer.diskStorage({
  destination: "uploadsProduct/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});
const uploadsProduct = multer({
  storage: storageProduct,
});

app.post("/product", uploadsProduct.array("images"), createProduct);
app.put("/product", uploadsProduct.array("images"), updateProduct);
app.delete("/product", deleteProduct);
app.get("/product", getAllProductsByDepartmentId);
app.put("/updateProductQty", updateProductQty);
app.get("/productDetails", productDetails);

//User Module
app.post("/register", register);
app.post("/login", login);
//Access Images
app.use(express.static("uploadsUniv/"));
app.use(express.static("uploadsDep/"));
app.use(express.static("uploadsProduct/"));

mongoose
  .connect(process.env.DB_URL)
  .then((d) => {
    console.log("database connected");
    app.listen(process.env.PORT, () => {
      console.log("server running at port : " + process.env.PORT);
    });
  })
  .catch(() => {
    console.log("database connect error");
  });
