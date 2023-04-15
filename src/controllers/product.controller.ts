import { Request, Response, NextFunction} from "express";
import { getInventory, getProductById, createProduct, updateProduct, deleteProductById } from "../services/product.service";
import mongoose from "mongoose";

export const getInventoryController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const inventory = await getInventory();
        if(!inventory){
            throw new Error("Error Getting Inventory");
        }
        return res.status(200).json({
            error: false,
            data: inventory
        });
    }catch(e){
        return res.status(500).json({
            error: true,
            message: "Error Getting Inventory"
        });
    }
}

export const getProductByIdController = async (req: Request, res:Response, next: NextFunction) => {
    try{
        const product = await getProductById(req.params.id);
        if(!product){
            return res.status(404).json({
                error: true,
                message: "Product not Found"
            });
        }
        return res.status(200).json({
            error: false,
            data: product
        });
    }catch(e){
        console.log(e);
        return res.status(500).json({
            error: true,
            message: "Error Getting Product"
        });
    }
}

export const createProductController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { name, stock, description } = req.body;
        const product = await createProduct(name, stock, description);
        if(!product){
            throw new Error("Error Creating Product");
        }
        return res.status(200).json({
            error: false,
            message:"Product Created",
            data: product
        }); 
    }catch(e){
        if(e.code ===  11000){
            return res.status(409).json({
                error: true,
                message: "This Product exists."
            });
        }
        return res.status(500).json({
            error: true,
            message: "Error Creating Product"
        });
    }
}

export const updateProductController = async (req: Request, res:Response, next: NextFunction) => {
    try{ 
        const product = await updateProduct(req.params.id, req.body);
        if(!product){
            return res.status(404).json({
                error: true,
                message: "Product not Found"
            });
        }
        return res.status(200).json({
            error: false,
            data:product,
            message: "Product Updated"
        });

    }catch(e){
        console.log(e);
        return res.status(500).json({
            error: true,
            message: "Error Updating Product"
        });
    }
}
export const deleteProductByIdController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const product = await deleteProductById(req.params.id);
        console.log(product);
        if(!product){
            return res.status(404).json({
                error: true,
                message: "Product not found"
            });
        }
        return res.status(200).json({
            error: false,
            message: "Product Deleted"
        });
    }catch(e){
        return res.status(500).json({
            error: true,
            message: "Error Deleting Product"
        });
    }
}