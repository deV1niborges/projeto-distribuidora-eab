module.exports = async (req, res) => {
  const axios = require("axios");

  // Configura cabeçalhos CORS (não necessário se no mesmo domínio, mas incluído por segurança)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Método não permitido" });
  }

  try {
    const dados = {
      ...req.body,
      chave: "GS2024@FormSecure-7x9kPm2qRv5#wY8zNcL",
    };
    const response = await axios.post(
      "https://script.google.com/macros/s/AKfycby_EgfjLg_0d6E4ShFo3jfsWADYzGakRN5CjU4J_2FDpDlW4NTLfzckpDlEDQEaS0c-MA/exec",
      dados,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Erro no proxy:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Erro no proxy: " + error.message });
  }
};
