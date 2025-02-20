const request = require("supertest");
const app = require("./index"); 
require("dotenv").config();
const mongoose = require("mongoose");
const db = require("./mysql"); 

describe("Testes da API", () => {
  // Teste do endpoint GET /colaboradores
  it("Deve retornar uma lista de colaboradores", async () => {
    const response = await request(app).get("/colaboradores");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  // Teste do endpoint POST /agendar-jornada (caso queira testar sem envio real de e-mail)
  it("Deve agendar uma jornada corretamente", async () => {
    const requestBody = {
      colaborador: 1, 
      jornada: 1, 
      data: new Date(Date.now() + 3600 * 1000).toISOString(), // 1 hora no futuro
    };

    const response = await request(app)
      .post("/agendar-jornada")
      .send(requestBody)
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Jornada agendada com sucesso!");
  });

  // Teste de erro ao enviar um agendamento com data inválida
  it("Deve retornar erro ao agendar jornada com data inválida", async () => {
    const requestBody = {
      colaborador: 1,
      jornada: 1,
      data: "2000-01-01T00:00:00.000Z", 
    };
    
    const response = await request(app)
      .post("/agendar-jornada")
      .send(requestBody)
      .set("Accept", "application/json");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "A data deve ser futura e válida!");
  });
});



afterAll(async () => {
  await mongoose.connection.close();
});


afterAll(async () => {
  db.end(); 
});



