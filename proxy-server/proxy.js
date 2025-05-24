const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(cors()); // Habilita CORS para todas as origens
app.use(express.json());

app.post("/proxy", async (req, res) => {
  try {
    const response = await axios.post(
      "https://script.google.com/macros/s/AKfycby_EgfjLg_0d6E4ShFo3jfsWADYzGakRN5CjU4J_2FDpDlW4NTLfzckpDlEDQEaS0c-MA/exec",
      req.body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Erro no proxy: " + error.message });
  }
});

app.listen(3000, () => console.log("Servidor proxy rodando na porta 3000"));
