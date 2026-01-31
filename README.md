# webhook-listener-mini

## Problema

Integrar sistemas externos frequentemente exige receber notificações via **webhooks**. Implementar um listener confiável e simples para testes ou MVPs pode agilizar a validação de integrações sem a complexidade de um backend completo.

## Solução

**webhook-listener-mini** é um servidor Node.js utilizando Express que expõe um endpoint `/webhook` para receber requisições HTTP POST. Ele valida campos obrigatórios (`event` e `data`), registra o payload recebido no console e retorna uma resposta JSON padrão. É ideal para testar integrações de webhooks locais ou em ambientes de desenvolvimento.

## Como rodar

1. Certifique‑se de ter o [Node.js](https://nodejs.org/) instalado (versão 16 ou superior).
2. Clone este repositório ou copie os arquivos para sua máquina.
3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o servidor:

   ```bash
   npm start
   ```

Por padrão ele ouvirá na porta `3000`. Defina a variável de ambiente `PORT` para alterar essa porta.

## Exemplo de uso

Com o servidor em execução, envie um webhook utilizando `curl` ou outra ferramenta HTTP:

```bash
curl -X POST http://localhost:3000/webhook \
     -H "Content-Type: application/json" \
     -d '{"event": "user_created", "data": {"id": 1, "name": "Alice"}}'
```

Se os campos obrigatórios estiverem presentes, você receberá:

```json
{"received": true}
```

Caso algum campo obrigatório esteja faltando, o servidor responderá com um erro 400 e uma mensagem informando os campos ausentes.

## Limitações

- Este servidor não implementa autenticação nem assinatura de payload (HMAC). Para produção, adicione verificação de assinaturas e HTTPS.
- A validação do payload é básica; para esquemas mais complexos utilize uma biblioteca como `ajv`.
- Logs são enviados apenas para o console; considere integrar com um sistema de logs real em ambientes maiores.

## Próximos passos

- Adicionar suporte a verificação de assinaturas (por exemplo, webhook secret).
- Permitir configuração de múltiplos endpoints e filtros de eventos.
- Criar testes automatizados usando uma biblioteca de testes para Express.
