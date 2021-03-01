import request from 'supertest';
import { app } from '../app';
import { getConnection } from 'typeorm';
import createConnection from '../database';


describe("Users", () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    })

    it("estou criando um novo usuário", async () => {
        const response = await request(app).post("/users").send({
            email: "euaueaueu12312sssfff3111112a111@example.com",
            name: "teste JEST123131ffff2121112"
        });
        expect(response.status).toBe(201);
    });

    it("Não pode criar um usuário que ja exista no banco de dados.", async () => {
        const response = await request(app).post("/users").send({
            email: "euaueaueu12312sssfff3111112a111@example.com",
            name: "User Example"
        });
        expect(response.status).toBe(400);
    })
});