import app from "./app";
import mongoose from "mongoose";
import "dotenv/config";

const startServer = async ():Promise<void> => {
    try{
        await mongoose.connect(`${process.env.MONGO_URI}/${process.env.NODE_ENV}`);
        app.listen(process.env.PORT, () => {
            console.log(`Server Started in ${process.env.PORT}`);
        });
    }catch(e){
        console.log("Error Starting Server");
        process.exit(1);
    }
}
startServer();