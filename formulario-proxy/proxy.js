const express = require('express');
     const axios = require('axios');
     const cors = require('cors');
     const app = express();

     // Configura CORS para permitir requisições do domínio do frontend
     app.use(cors({
       origin: 'https://www.distribdeabltda.com', // Permite apenas o domínio do frontend
       methods: ['POST', 'OPTIONS'], // Permite requisições POST e OPTIONS
       allowedHeaders: ['Content-Type'], // Permite o cabeçalho Content-Type
     }));

     // Lida com requisições OPTIONS de preflight
     app.options('/proxy', (req, res) => {
       res.status(200).send();
     });

     app.use(express.json());

     app.post('/proxy', async (req, res) => {
       try {
         const dados = {
           ...req.body,
           chave: 'GS2024@FormSecure-7x9kPm2qRv5#wY8zNcL', // Chave de segurança
         };
         const response = await axios.post(
           'https://script.google.com/macros/s/AKfycby_EgfjLg_0d6E4ShFo3jfsWADYzGakRN5CjU4J_2FDpDlW4NTLfzckpDlEDQEaS0c-MA/exec',
           dados,
           {
             headers: {
               'Content-Type': 'application/json',
             },
           }
         );
         res.json(response.data);
       } catch (error) {
         console.error('Erro no proxy:', error.message);
         res.status(500).json({ success: false, message: 'Erro no proxy: ' + error.message });
       }
     });

     app.listen(process.env.PORT || 3000, () => console.log('Servidor proxy rodando'));