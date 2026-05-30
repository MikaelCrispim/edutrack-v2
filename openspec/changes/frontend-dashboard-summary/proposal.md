## Por que

O painel precisa de indicadores claros para ajudar usuários a entender rapidamente seu progresso acadêmico. Sem um resumo de alto nível, o usuário precisa contar manualmente disciplinas, tarefas pendentes e percentuais de conclusão. Exibir essas métricas fornece feedback imediato e melhora a experiência do usuário.

## O que será alterado

- Um novo componente `DashboardSummary` será adicionado ao painel.
- O componente buscará dados de progresso (total de disciplinas, atividades pendentes, percentual de conclusão) do endpoint `/summary`.
- O layout do painel será atualizado para acomodar esta seção no topo da página.

## Capacidades

### Novas Capacidades

- `dashboard-summary`: Fornece um resumo visual do progresso do usuário, incluindo estatísticas de disciplinas e tarefas.

### Capacidades Modificadas

- `dashboard`: Aprimorado para incluir o novo componente de métricas.

## Impacto

- **Frontend**: Implementação do componente `DashboardSummary.jsx`. `DashboardPage.jsx` será atualizado para renderizá‑lo. Adicionar `getDashboardSummary` em `api.js`.
- **Backend**: Pressupõe a existência do endpoint `/summary` que calcula e retorna essas métricas.
