#!/bin/bash
set -euo pipefail

# Instala dependências sem prompts
npm install --silent

# Inicia o servidor em background
node index.js &
SERVER_PID=$!

# Aguarda o servidor iniciar
sleep 1

# Envia uma requisição de teste
RESPONSE=$(curl -s -X POST http://localhost:3000/webhook \
  -H "Content-Type: application/json" \
  -d '{"event":"ping","data":{"msg":"hello"}}')

# Interrompe o servidor
kill $SERVER_PID

echo "Resposta da API: $RESPONSE"
echo "Verificação concluída com sucesso."
