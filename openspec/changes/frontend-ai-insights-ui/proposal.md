## Por que

Embora a lógica de backend para gerar AI insights exista, o frontend precisa de uma interface para exibir esses insights ao usuário. Além disso, permitir que o usuário solicite manualmente novos insights aumenta a interatividade e garante feedback imediato quando necessário.

## O que será alterado

- Um novo componente `AIInsights` será adicionado ao painel.
- O componente buscará insights gerados anteriormente via endpoint `/ai_insights` e exibirá os resultados.
- Um botão "Gerar Insights" será disponibilizado para chamar manualmente o endpoint `/generate_insights`, acionando o processo no backend e atualizando os insights exibidos.
- O layout do painel será atualizado para incluir este componente.

## Capacidades

### Novas Capacidades

- `ai-insights-ui`: Interface para visualização de recomendações personalizadas por IA e elemento interativo para disparar a geração.

### Capacidades Modificadas

- `dashboard`: Aprimorado para incluir o componente AI Insights.

## Impacto

- **Frontend**: Implementação do componente `AIInsights.jsx`. `DashboardPage.jsx` será atualizado para incluí‑lo. Adicionar `getAIInsights` em `api.js` (a função `generateAIInsights` foi definida nas tarefas de backend).
- **Backend**: Depende dos endpoints definidos em `ai-insight-generation-mechanism`.
