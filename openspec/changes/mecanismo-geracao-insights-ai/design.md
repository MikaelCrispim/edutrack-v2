## Contexto

O usuário precisa de uma forma clara e automatizada para gerar os insights com IA para o painel. Este documento descreve o design técnico de um processo de backend que gera e armazena esses insights. Optamos por armazenar os insights em uma tabela em vez de gerá‑los a cada carregamento da página por várias razões principais:

- **Desempenho:** A geração por IA pode ser lenta. Pré‑calcular e armazenar insights garante que o painel carregue rapidamente.
- **Custo:** A maioria dos serviços de IA cobra por chamada de API. Gerar insights apenas quando os dados mudam, em vez de a cada visualização, reduz significativamente os custos operacionais.
- **Experiência do Usuário:** Armazenar insights permite construir um histórico de recomendações e evita que o usuário veja conselhos inconsistentes ou levemente diferentes a cada atualização da página.

## Objetivos / Não‑objetivos

**Objetivos:**

- Projetar uma nova função no Xano responsável por gerar insights de IA.
- Definir um mecanismo de disparo (trigger) para quando essa função deve ser executada.
- Especificar a coleta de dados, a construção do prompt e a interação com o serviço de IA.
- Propor uma estratégia de limitação de execução (rate limiting) para evitar execuções excessivas.

**Não‑objetivos:**

- Este design não especifica o modelo de IA exato a ser usado (ex.: GPT‑4, Gemini), mas assume uma interação padrão via API.
- Não cobre faturamento ou configuração de conta do serviço externo de IA.

## Decisões

### 1. Disparo da Geração de Insights

Usaremos um **trigger baseado em webhook**. Um novo endpoint de API será criado que, quando chamado, executará a lógica de geração de insights. O frontend será responsável por chamar este endpoint no momento apropriado.

- **Decisão:** Criar um novo endpoint: `POST /ai/generate-insights`.
- **Justificativa:** Dá ao frontend controle sobre quando disparar a geração. Um bom momento para chamar seria após o usuário concluir uma tarefa acadêmica. É mais flexível que um gatilho rígido no banco ou um cron fixo.

### 2. Rate Limiting

Para evitar que o endpoint `generate-insights` seja chamado com muita frequência, implementaremos uma limitação baseada em tempo.

- **Decisão:** Adicionar um campo de timestamp na tabela `users` chamado `last_insight_generated_at`.
- **Lógica:**
    1. Ao receber `POST /ai/generate-insights`, verificar o `last_insight_generated_at` do usuário autenticado.
    2. Se o timestamp for mais recente que o período definido (ex.: 24 horas), encerrar a função sem gerar novos insights.
    3. Se já passou tempo suficiente (ou o campo for nulo), proceder com a geração e atualizar o timestamp ao concluir.

### 3. Design da Função "Generate Insights"

Esta será uma nova função no Xano associada ao endpoint `POST /ai/generate-insights`.

**Fluxo da Função:**

1. **Obter dados do usuário:** Recuperar o registro do usuário autenticado (`auth.id`) e checar `last_insight_generated_at`. Interromper se não passou tempo suficiente.
2. **Coletar contexto acadêmico:**
   - Consultar todas as `subjects` do usuário.
   - Consultar todas as `academic_tasks` do usuário.
3. **Construir o prompt para a IA:**
   - Criar uma variável de texto que servirá como prompt, estruturada para fornecer contexto claro.
      - **Exemplo de Prompt:**
         ```
         Você é um orientador acadêmico para a aplicação EduTrack. Um estudante precisa de insights personalizados com base em sua carga acadêmica atual.

         Dados do estudante:
         - Disciplinas: [Inserir lista formatada das disciplinas do usuário]
         - Tarefas Acadêmicas: [Inserir lista formatada das tarefas do usuário, incluindo status (ex.: pendente, concluída) e datas de entrega]

         Gere 2-3 insights breves e acionáveis para este estudante. Foque em prazos próximos, disciplinas com baixo progresso e oportunidades onde o estudante esteja se destacando. Use um tom positivo e encorajador. Retorne os insights como um array JSON de strings.
         ```
4. **Chamar o serviço externo de IA:**
   - Usar a etapa **External API Request** do Xano.
   - Configurar um `POST` para o endpoint do provedor de IA escolhido (por exemplo, OpenAI).
   - O corpo da requisição conterá o prompt construído.
   - **IMPORTANTE:** A chave de API do serviço de IA deve ficar armazenada nas variáveis de ambiente do Xano, não hardcoded.
5. **Processar e armazenar a resposta:**
   - Parsear a resposta da IA para extrair o array de strings com os insights.
   - Usar um **Loop** para iterar pelos insights.
   - Dentro do loop, para cada insight, usar **Add Record** para criar uma entrada na tabela `ai_insights` vinculada ao `user_id`.
6. **Atualizar o timestamp do usuário:**
   - Após o loop, usar **Edit Record** para atualizar `last_insight_generated_at` com o timestamp atual.
7. **Retornar sucesso:** Retornar uma mensagem de sucesso para o frontend.

## Riscos / Compensações

- **[Risco] Falha do serviço de IA externo:** A API externa pode estar inacessível ou retornar erro.
  - **Mitigação:** Incluir tratamento de erros na chamada externa. Se falhar, registrar o erro e encerrar sem atualizar o timestamp do usuário.
- **[Risco] Resposta lenta da IA:** A geração pode demorar alguns segundos.
  - **Mitigação:** Tornar o processo assíncrono. O frontend dispara a chamada e não precisa aguardar; o usuário verá os novos insights na próxima vez que carregar o painel. Isso evita bloquear a experiência do usuário.
