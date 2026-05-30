## 1. Implementação no Backend

- [x] 1.1 Criar a tabela `ai_insights` no banco com o esquema definido no design.
- [x] 1.2 Implementar o endpoint `GET /api/dashboard/summary`, incluindo o serviço de cálculo das métricas de progresso.
- [x] 1.3 Implementar o endpoint `GET /api/ai/insights`, incluindo a lógica para buscar os insights mais recentes na tabela `ai_insights`.
- [ ] 1.4 (Opcional) Implementar a lógica de geração de insights por IA (tarefa agendada ou trigger que chama o serviço de IA e armazena os resultados). (skipped)

## 2. Implementação no Frontend

- [x] 2.1 Criar o componente `DashboardSummary.jsx`.
- [x] 2.2 Conectar `DashboardSummary.jsx` ao endpoint `/api/dashboard/summary`.
- [x] 2.3 Criar o componente `AIInsights.jsx`.
- [x] 2.4 Conectar `AIInsights.jsx` ao endpoint `/api/ai/insights`.
- [x] 2.5 Atualizar `DashboardPage.jsx` para integrar `DashboardSummary.jsx` e `AIInsights.jsx`.

## 3. Testes

- [ ] 3.1 Escrever testes unitários para os novos endpoints do backend. (skipped)
- [x] 3.2 Escrever testes unitários para os novos componentes frontend.
- [ ] 3.3 Realizar testes end-to-end para validar as novas funcionalidades do painel. (skipped)
