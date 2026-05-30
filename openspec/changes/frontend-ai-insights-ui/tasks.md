## 1. Integração com a API

- [x] 1.1 Em `frontend/src/api.js`, adicionar a função `getAIInsights` para realizar `GET` no endpoint `/ai_insights`.

## 2. Implementação do Componente

- [x] 2.1 Criar o arquivo `AIInsights.jsx` em `frontend/src/components/dashboard/`.
- [x] 2.2 Implementar estados `insights`, `loading`, `generating` e `error`.
- [x] 2.3 Criar a função `fetchInsights` e chamá‑la via `useEffect` no mount.
- [x] 2.4 Criar `handleGenerateInsights` que chama a API de geração e em seguida refaz o fetch dos insights.
- [x] 2.5 Construir UI para o estado de carregamento (robô girando).
- [x] 2.6 Construir UI para o estado de erro (alerta vermelha descartável).
- [x] 2.7 Construir UI para o estado vazio (ainda não há insights).
- [x] 2.8 Construir UI para o estado populado, iterando sobre `insights` para renderizar cartões estilizados.
- [x] 2.9 Estilizar o botão "Gerar Insights", garantindo resposta ao estado `generating`.

## 3. Integração no Dashboard

- [x] 3.1 Abrir `frontend/src/pages/DashboardPage.jsx`.
- [x] 3.2 Importar o componente `AIInsights`.
- [x] 3.3 Adicionar o componente ao layout da página, abaixo de `DashboardSummary`.
