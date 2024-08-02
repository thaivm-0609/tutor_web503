import { Router } from "express";
import ProductController from "../controllers/ProductController.js";
import { checkPermission } from "../middlewares/index.js";

const productRouter = Router();
const productController = new ProductController();

productRouter.get("/", productController.getList); //lay danh sach
productRouter.get("/:id", productController.getDetail); //lay thong tin chi tiet
productRouter.post("/", checkPermission, productController.create); //them moi
productRouter.put("/:id", checkPermission, productController.update); //chinh sua
productRouter.delete("/:id", checkPermission, productController.delete); //xoa

export default productRouter;