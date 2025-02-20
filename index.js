require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Agenda = require("agenda");
const moment = require("moment");
const { enviarEmail } = require('./email');
const {get_colaboradores} = require('./mysql');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => console.log("Conectado ao MongoDB"));

// Configuração do Agenda
const agenda = new Agenda({ db: { address: process.env.MONGO_URI, collection: 'agenda' } });

// Teste de agendamento
// agenda.define("registrar jornada", async (job) => {
//   const { colaborador, jornada, data } = job.attrs.data;
//   console.log(`Agendamento para ${colaborador}`);
//   console.log(`Jornada: ${jornada}`);
//   console.log(`Data e Hora: ${moment(data).format("DD/MM/YYYY HH:mm")}`);
// });


agenda.define('enviar email', async (job) => {

  const { colaborador, assunto, texto } = job.attrs.data;
  await enviarEmail(destinatario, assunto, texto);
});



(async function () {
  await agenda.start();
})();

// Endpoint para agendar jornada de trabalho
app.post("/agendar-jornada", async (req, res) => {
  try {
    const { colaborador, jornada, data } = req.body;

    // Verifica se a data é válida e futura
    const dataJob = moment(data);
    if (!dataJob.isValid() || dataJob.isBefore(moment())) {
      return res.status(400).json({ error: "A data deve ser futura e válida!" });
    }


    
    //await agenda.schedule(dataJob.toDate(), "registrar jornada", { colaborador, jornada, data });
    await agenda.schedule(dataJob.toDate(), "enviar email", { colaborador, jornada, data});
    res.json({ message: "Jornada agendada com sucesso!", colaborador, jornada, data });
  } catch (error) {
    res.status(500).json({ error: "Erro ao agendar jornada", details: error.message });
  }
});

app.get('/colaboradores', async (req, res) => {
  try {
    console.log("Entrou na busca de colaboradores")
    const query = 'SELECT * FROM colaboradores';
    const colaboradores = await get_colaboradores(query);
    console.log(colaboradores);
    res.json(colaboradores);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar colaboradores', details: error.message });
  }
});

/**
 * SELECT nome_colaborador, matricula, setor FROM colaborador where id = '?';
 */

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
