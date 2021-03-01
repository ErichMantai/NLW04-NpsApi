import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../app';
import createConnection from '../database';


describe("Surveys", () => {

    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    })

    it("Should be able to create a new survey", async () => {
        const response = await request(app).post("/surveys").send({
            title: "ASJDKJASKL21312312DJASL8sss9898989121231231231231KDJLAS",
            description: "Description askdjlasjd1231sss2123123131231lkasl"
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });

    it("Should be able to get all surveys", async () => {
        await request(app).post("/surveys")
            .send({
                title: "Example21231123989912sss2312311",
                description: "Description Example21ss89982312312123122"
            });

        const response = await request(app).get("/surveys");

        expect(response.body.length).toBe(2);
    });
});