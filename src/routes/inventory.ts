import express, { Request, Response, NextFunction} from "express";
import { getInventoryController, getProductByIdController, createProductController, updateProductController, deleteProductByIdController } from "../controllers/product.controller";
import { validateProduct, isValidMongooseIdParam } from "../middlewares/inventory";
const inventory = express.Router();

inventory.get("/", getInventoryController);
inventory.get("/:id", isValidMongooseIdParam, getProductByIdController);
inventory.post("/product/new", validateProduct, createProductController);
inventory.put("/:id", isValidMongooseIdParam, validateProduct, updateProductController);
inventory.delete("/:id", isValidMongooseIdParam, deleteProductByIdController);

export default inventory;