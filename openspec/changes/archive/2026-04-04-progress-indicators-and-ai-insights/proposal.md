## Por que

A aplicação carece atualmente de indicadores-chave que permitam aos usuários acompanhar o progresso acadêmico de forma eficaz. Exibir métricas como contagem de disciplinas, tarefas pendentes e percentuais de conclusão fornece feedback imediato e valioso. Além disso, incorporar insights gerados por IA oferece orientações personalizadas, ajudando os usuários a identificar áreas de melhoria e a focar esforços.

## O que será alterado

- Será adicionada uma seção de resumo no painel para exibir indicadores de progresso.
- Será introduzida uma seção de insights alimentada por IA para fornecer feedback e sugestões personalizadas.
- Serviços de backend serão desenvolvidos para calcular métricas de progresso e gerar insights por IA.

## Capacidades

### Novas Capacidades

- `dashboard-summary`: Fornece uma visão rápida do progresso acadêmico do usuário, incluindo número de disciplinas, atividades pendentes e taxa de conclusão.
- `ai-insights`: Entrega feedback e recomendações personalizadas por IA para ajudar o usuário a entender seu progresso, identificar pontos fortes e fracos e descobrir oportunidades de melhoria.

### Capacidades Modificadas

- Nenhuma

## Impacto

- **Frontend**: Novos componentes serão criados para o resumo do painel e os insights de IA. A página principal do painel será atualizada para incluir esses componentes.
- **Backend**: Novos endpoints de API serão necessários para fornecer os dados das novas funcionalidades; envolverá lógica adicional para calcular progresso e integrar com um serviço de IA.
- **Banco de Dados**: Pode ser necessária uma nova tabela para armazenar insights gerados por IA para cada usuário.
