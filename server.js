const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.json({ status: "DoughIA online" });
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Mensagem não fornecida"
      });
    }

    const response = await client.responses.create({
      model: "gpt-5-mini",
      input: message
    });

    res.json({
      response: response.output_text
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Erro ao conversar com a IA"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`DoughIA rodando na porta ${PORT}`);
});
