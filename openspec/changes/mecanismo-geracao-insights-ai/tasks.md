## 1. Configuração do Backend (Xano)

- [x] 1.1 Adicionar o campo `last_insight_generated_at` (timestamp) na tabela `users` no Xano.
- [x] 1.2 Criar um novo endpoint API: `POST /ai/generate-insights`.
- [x] 1.3 Armazenar a chave de API do serviço de IA nas variáveis de ambiente do Xano.

## 2. Implementação da Função "Generate Insights"

- [x] 2.1 No endpoint `/ai/generate-insights`, implementar a verificação de `last_insight_generated_at` e aplicar o limite de 24 horas.
- [x] 2.2 Adicionar a lógica para coletar todas as `subjects` e `academic_tasks` do usuário autenticado.
- [x] 2.3 Implementar a construção do prompt, formatando os dados do usuário para a IA.
- [x] 2.4 Adicionar a etapa **External API Request** para chamar o serviço de IA com o prompt.
- [x] 2.5 Implementar tratamento de erros para a chamada externa.
- [x] 2.6 Implementar a lógica para parsear a resposta da IA e iterar pelos insights retornados.
- [x] 2.7 Dentro do loop, usar **Add Record** para salvar cada insight na tabela `ai_insights`.
- [x] 2.8 Após o loop, usar **Edit Record** para atualizar `last_insight_generated_at` do usuário.

<!-- Instruções detalhadas de configuração no Xano foram omitidas por brevidade. -->

## 3. Integração no Frontend

- [x] 3.1 Em `frontend/src/api.js`, adicionar a função `generateAIInsights` que faz `POST` para `/api/ai/generate-insights`.
- [x] 3.2 Escolher onde disparar `generateAIInsights` — por exemplo, em `SubjectDetail.jsx` após marcar uma tarefa como completa.
- [x] 3.3 Disparar `generateAIInsights` como chamada "fire-and-forget"; não é necessário aguardar a resposta.
