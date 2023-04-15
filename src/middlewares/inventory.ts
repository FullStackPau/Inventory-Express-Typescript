import Joi from "joi";
import mongoose from "mongoose";
const schema = Joi.object({
    name: Joi.string().required(),
    stock: Joi.number().required(),
    description: Joi.string().required()
});
export const validateProduct = async (req, res, next) => {
    try{
        const { error } = await schema.validate(req.body);
        if(error){
            return res.json({
                error: true,
                message: error.details[0].message
            });
        }
        next();
    }catch(e){
        return res.json({
            error: false,
            message: "Error Validating Product"
        });
    }
}

export const isValidMongooseIdParam = async (req, res, next) => {
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(404).json({
                error: true,
                message: "Product not Found"
            });
        }
        next();
    }catch(e){
        return res.status(500).json({
            error: true,
            message: "Error Validating Mongoose"
        });
    }
}