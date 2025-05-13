const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
const express = require("express");
const path = require("path");

const PORT = 8000;

// Caminho base do projeto
const basePath = path.join(__dirname, "../../");

// Configura o LiveReload
const liveReloadServer = livereload.createServer({
  exts: ["html", "css", "js"], // Extensões monitoradas
  delay: 100, // Tempo de espera antes de atualizar
});
liveReloadServer.watch(basePath);

// Middleware para LiveReload
const app = express();
app.use(connectLivereload());

// Servir arquivos estáticos
app.use(express.static(basePath));

// Redireciona URLs amigáveis para os arquivos corretos
app.get("/produtos", (req, res) => {
  res.sendFile(path.join(basePath, "src/pages/produtos.html"));
});

app.get("/contato", (req, res) => {
  res.sendFile(path.join(basePath, "src/pages/contato.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(basePath, "index.html"));
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// Atualiza o navegador automaticamente
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
