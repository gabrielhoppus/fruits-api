import supertest from "supertest";
import app from '../src/index';

const api = supertest(app);

describe("Testando a API", () => {
    it("Testando GET: /fruits", async () => {
        const resultado = await api.get("/fruits");
        expect(resultado.status).toBe(200)
    })
})

describe('POST /fruits', () => {

    it('Should respond with status 201 if correctly submitted', async () => {

        const result = await api.post('/fruits').send(
            {
                "name": "Banana",
                "price": 10,
            }
        )

        expect(result.status).toBe(201);
    })

    it ('Should respond with status 409 if invalid body', async () => {

        const result = await api.post('/fruits').send(
            {
                "name": "Banana",
                "price": "10",                
            }
        )

        expect(result.status).toBe(409);
    }) 
})

describe("GET /fruits/:id", () => {
    it("should respond with code 200 for a valid fruit id", async() =>{
        const result = await api.get("/fruits/1")
        expect (result.status).toBe(200);
        expect (result.body).toBeTruthy()
    });

    it("should respond with code 404 for a invalid fruit id", async() =>{
        const result = await api.get("/fruits/4")
        expect (result.status).toBe(404);
        expect (!result.body).toBeTruthy()
    });
});