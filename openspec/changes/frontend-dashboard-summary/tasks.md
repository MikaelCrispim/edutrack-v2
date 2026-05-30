## 1. Integração com a API

- [x] 1.1 Em `frontend/src/api.js`, adicionar `getDashboardSummary` para realizar `GET` no endpoint `/summary`.

## 2. Implementação do Componente

- [x] 2.1 Criar `DashboardSummary.jsx` em `frontend/src/components/dashboard/`.
- [x] 2.2 Implementar estados `summaryData`, `loading` e `error`.
- [x] 2.3 Implementar `useEffect` para buscar dados no mount.
- [x] 2.4 Construir UI para o estado de carregamento (spinner).
- [x] 2.5 Construir UI para o estado de erro (caixa de alerta vermelha).
- [x] 2.6 Construir layout principal em grid para as estatísticas.
- [x] 2.7 Criar cartões para Total de Disciplinas, Atividades Pendentes e Percentual de Conclusão, com estilização e barra de progresso.

## 3. Integração no Dashboard

- [x] 3.1 Abrir `frontend/src/pages/DashboardPage.jsx`.
- [x] 3.2 Importar `DashboardSummary`.
- [x] 3.3 Adicionar o componente ao layout, abaixo do header e acima da lista de disciplinas.
