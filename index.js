const express = require('express');

const app = express();

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post('/webhook', (req, res) => {
  const payload = req.body;
  // Verifica se os campos obrigatórios existem
  if (!payload.event || !payload.data) {
    return res.status(400).json({
      error: 'Campos obrigatórios ausentes: event, data',
    });
  }
  // Registra o payload no console para fins de debugging
  console.log('Webhook recebido:', payload);
  res.status(200).json({ received: true });
});

// Endpoint básico para verificar se o servidor está de pé
app.get('/', (req, res) => {
  res.send('Webhook listener está rodando');
});

app.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});
