## Por quê

A funcionalidade atual de AI Insights gera e exibe insights, mas carece de funcionalidades CRUD básicas. Especificamente, os usuários não conseguem excluir insights que não são mais relevantes ou úteis, o que provoca uma interface poluída ao longo do tempo. Além disso, a apresentação visual dos insights pode ser aprimorada para ser mais amigável.

## O que mudar

- Adicionar um botão "Excluir" em cada card de insight.
- Implementar a chamada de API para excluir um insight no backend.
- Aprimorar a exibição visual do componente `AIInsights` para tornar os insights individuais mais fáceis de ler.

## Capacidades

### Capacidades modificadas

- `ai-insights-ui`: Atualizado para suportar a exclusão de insights individuais e melhorias na apresentação visual.

## Impacto

- **Frontend:** Modificações em `AIInsights.jsx` para tratar a ação de exclusão e melhorias de UI. `api.js` atualizado para incluir `deleteAIInsight`.
- **Backend:** Supõe a existência (ou requer a criação) do endpoint `DELETE /ai_insights/{id}`.
