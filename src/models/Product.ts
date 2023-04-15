import { prop, getModelForClass } from "@typegoose/typegoose";
import * as mongoose from "mongoose";

export class  Product{
    @prop({ unique: true, required: true })
    name: string;
    @prop({ required: true })
    stock: Number;
    @prop({ required: true })
    description: String
}


const ProductModel = getModelForClass(Product);

export default ProductModel;