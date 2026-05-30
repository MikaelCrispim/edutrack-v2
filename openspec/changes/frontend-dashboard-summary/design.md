## Contexto

O painel do usuário precisa de uma seção resumo que destaque métricas chave: Total de Disciplinas, Atividades Pendentes e Percentual de Conclusão. Este design descreve como o componente frontend será estruturado para buscar e exibir esses dados dinamicamente.

## Objetivos / Não‑objetivos

**Objetivos:**
- Projetar um componente React que busque dados do endpoint `/summary` no backend.
- Fornecer um layout visualmente atraente com cartões e ícones para cada métrica.
- Incluir uma barra de progresso para a taxa de conclusão.
- Tratar estados de carregamento e erro de forma elegante.

**Não‑objetivos:**
- Modificar ou implementar a lógica de backend para calcular o resumo (assume‑se que o endpoint já existe).

## Decisões

### 1. Estrutura do Componente

Criaremos `DashboardSummary.jsx` em `src/components/dashboard`.

- **Gerenciamento de Estado:** Usar `useState` para `summaryData`, `loading` e `error`.
- **Busca de Dados:** Usar `useEffect` para chamar `getDashboardSummary` na montagem do componente.

### 2. Design da UI

- **Layout:** Usar grid CSS (`grid-cols-1 md:grid-cols-3`) para exibir as três métricas de forma responsiva.
- **Visuais:** Cada métrica será exibida em um cartão com um leve gradiente, um ícone e um valor em destaque. O cartão de Percentual de Conclusão terá uma barra de progresso horizontal.
- **Feedback:**
  - Exibir spinner durante a busca de dados.
  - Exibir um bloco de erro se a chamada à API falhar.

### 3. Integração com API

- **Decisão:** Adicionar a função `getDashboardSummary` em `src/api.js` para tratar `GET /summary` usando o cliente Axios existente.

## Riscos / Compensações

- **[Risco] Dependência da API:** O componente depende do endpoint `/summary`. Se lento ou indisponível, a experiência do painel degrada.
  - **Mitigação:** Exibir estados de carregamento e mensagens de erro apropriadas para informar o usuário.
