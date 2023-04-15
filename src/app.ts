import express from "express";
import router from "./routes/index";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
const app = express();


app.use(express.json());

app.use("/", router);
// Enable Api Docs
    const specs = swaggerJsdoc({
        swaggerDefinition: {
            info: {
                title: "Inventory Service API",
                description: "Inventory Service API",
                contact: {
                    name: "Pau Developer :)"
                },
                servers: ["http://localhost:8000"]
            }
        },
        apis:[`${__dirname}/swagger.yml`]
    });
    console.log(specs);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));    



export default app;