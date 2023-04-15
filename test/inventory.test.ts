import mongoose from "mongoose";
import app from "../src/app";
import request from "supertest";
import "dotenv/config";

describe("Testing Inventory", () => {
    beforeAll(async () => {
        try{
            await mongoose.connect(`mongodb://localhost:27017/testing`);
        }catch(e){
            console.log(e);
        }
       
    });
    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });
    describe("POST METHODS", () => {
        it("Create Product", async () => {
            const body = {
                name: "Apple",
                stock:25,
                description:"Just an Apple"
            }
            const response = await request(app).post("/inventory/product/new").send(body).set("Content-Type", "application/json").set("Accept", "application/json");
            expect(response.body.error).toBe(false);
            expect(response.body.message).toBe("Product Created");
            expect(response.body.data.name).toBe(body.name);
        });
    });
    describe("GET METHODS", () => {
        it("GET Inventory", async () => {
            const response = await request(app).get("/inventory");
            expect(response.body.error).toBe(false);
            expect(Array.isArray(response.body.data)).toBe(true);
        });
        it("GET Product By Id", async () => {
            const list = await request(app).get("/inventory");
            expect(list.body.error).toBe(false);
            expect(Array.isArray(list.body.data)).toBe(true);
            const response = await request(app).get(`/inventory/${list.body.data[0]._id}`);
            expect(response.body.error).toBe(false);
            expect(response.status).toBe(200);
        });
    });
    describe("PUT METHODS", () => {
        it("Update Product By Id", async () => {
            const body = {
                name: "Lemon",
                stock:50,
                description:"Just a Lemon Updated"
            }
            const list = await request(app).get("/inventory");
            expect(list.body.error).toBe(false);
            expect(Array.isArray(list.body.data)).toBe(true);
            const response = await request(app).put(`/inventory/${list.body.data[0]._id}`).send(body);
            console.log(response.body.data);
            expect(response.status).toBe(200);
            expect(response.body.data._id).toBe(list.body.data[0]._id);
            expect(response.body.data.name).toBe(body.name);
        });
    });
    describe("DELETE METHODS", () => {
        it("Delete By Id", async () => {
            const list = await request(app).get("/inventory");
            expect(list.body.error).toBe(false);
            expect(Array.isArray(list.body.data)).toBe(true);
            const response = await request(app).delete(`/inventory/${list.body.data[0]._id}`);
            expect(response.status).toBe(200);
            const productdeleted = await request(app).get(`/inventory/${list.body.data[0]._id}`);
            expect(productdeleted.body.error).toBe(true);
            expect(productdeleted.status).toBe(404);
            
        });
    });
});