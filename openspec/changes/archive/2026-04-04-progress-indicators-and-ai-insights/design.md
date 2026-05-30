## Contexto

O painel atual é minimalista e não fornece dados agregados sobre o progresso acadêmico dos usuários. A proposta descreve a necessidade de um painel mais informativo com indicadores de progresso e insights gerados por IA. Este documento detalha a abordagem técnica para implementar essas funcionalidades.

## Objetivos / Não‑objetivos

**Objetivos:**

- Projetar os componentes frontend `DashboardSummary` e `AIInsights`.
- Definir os endpoints de API necessários para suportar os novos componentes.
- Descrever a lógica de backend para calcular métricas de progresso e gerar insights por IA.
- Propor um esquema de banco de dados para armazenar insights gerados.

**Não‑objetivos:**

- Este design não cobre detalhes específicos de implementação do modelo de IA; foca na integração com um serviço de IA hipotético.
- O design de UI/UX será funcional, com foco na apresentação clara dos dados; um design visual completo está fora do escopo.

## Decisões

### 1. Componentes Frontend

- **`DashboardSummary.jsx`**: Novo componente para exibir indicadores de progresso. Buscará dados em `/api/dashboard/summary`. Exibirá estatísticas como "Total de Disciplinas", "Atividades Pendentes" e "Percentual de Conclusão".
- **`AIInsights.jsx`**: Componente para exibir insights retornados por `/api/ai/insights`, renderizando o texto gerado de forma clara e legível.
- **`DashboardPage.jsx`**: A página principal do painel será atualizada para incluir `DashboardSummary` e `AIInsights`, dispostos para fornecer uma visão geral no topo da página.

### 2. Endpoints de API no Backend

- **`GET /api/dashboard/summary`**: Retorna um objeto JSON com as métricas de progresso do usuário.
  - **Request**: Nenhuma
  - **Response**:
    ```json
    {
      "totalSubjects": 5,
      "pendingActivities": 10,
      "completionPercentage": 45.5
    }
    ```
- **`GET /api/ai/insights`**: Retorna os insights gerados por IA para o usuário.
  - **Request**: Nenhuma
  - **Response**:
    ```json
    {
      "insights": [
        {
          "id": "insight-1",
          "text": "Você está indo muito bem em 'Introdução à Programação'! Considere explorar tópicos avançados.",
          "createdAt": "2026-04-04T10:00:00Z"
        },
        {
          "id": "insight-2",
          "text": "Você tem algumas tarefas pendentes em 'Estruturas de Dados'. Procure finalizá‑las esta semana para manter o ritmo.",
          "createdAt": "2026-04-03T15:30:00Z"
        }
      ]
    }
    ```

### 3. Lógica de Backend

- **Cálculo de Progresso:** O backend deve consultar `subjects` e `academic_tasks` para calcular o total de disciplinas, tarefas pendentes e a porcentagem de conclusão. Essa lógica será encapsulada em um serviço usado por `/api/dashboard/summary`.
- **Geração de Insights por IA:** O endpoint `/api/ai/insights` ficará responsável por gerar e recuperar insights.
  - **Geração:** Uma tarefa agendada ou um gatilho ao completar uma tarefa pode iniciar o processo de geração de insights, enviando os dados do usuário a um serviço de IA e armazenando o resultado em `ai_insights`.
  - **Recuperação:** O endpoint buscará os insights mais recentes na tabela `ai_insights`.

### 4. Esquema de Banco de Dados

- Criar a tabela `ai_insights` para armazenar os insights gerados.

    | Column      | Type       | Description                               |
    |-------------|------------|-------------------------------------------|
    | `id`        | `uuid`     | Chave primária                             |
    | `user_id`   | `uuid`     | FK para a tabela `users`                   |
    | `text`      | `text`     | Texto do insight gerado pela IA            |
    | `created_at`| `timestamp`| Quando o insight foi gerado                |

## Riscos / Compensações

- **Dependência do serviço de IA:** A funcionalidade depende de um serviço de IA. Se estiver indisponível ou lento, a experiência será afetada.
  - **Mitigação:** Implementar cache para reduzir chamadas ao serviço de IA e manter dados em cache quando o serviço estiver fora do ar. Implementar tratamento de erro e exibir mensagem amigável ao usuário caso não seja possível obter insights.
- **Performance:** O cálculo de métricas pode ser oneroso com grande volume de dados.
  - **Mitigação:** Pré‑calcular e cachear o resumo de progresso. Atualizar cálculos via gatilhos ao alterar dados ou executar como job periódico.
