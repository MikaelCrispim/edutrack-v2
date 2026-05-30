## Requisitos ADICIONADOS

### Requisito: Disparar Geração de Insights de IA
O sistema DEVE fornecer um endpoint para disparar o processo de geração de insights por IA.

#### Cenário: Frontend dispara geração de insights
- **QUANDO** o frontend enviar uma requisição `POST` para `/api/ai/generate-insights`
- **ENTÃO** o backend DEVE iniciar o processo de geração de insights.

### Requisito: Limitação de Taxa na Geração de Insights
O sistema DEVE evitar que o processo de geração de insights seja executado com muita frequência para um mesmo usuário.

#### Cenário: Usuário tenta gerar insights antes do prazo de limitação
- **QUANDO** uma requisição `POST` for enviada para `/api/ai/generate-insights` para um usuário que gerou insights nas últimas 24 horas
- **ENTÃO** o sistema DEVE retornar uma resposta indicando que a requisição atingiu o limite de taxa (rate limit) e não deve gerar novos insights.

#### Cenário: Usuário gera insights após o término do período de limitação
- **QUANDO** uma requisição `POST` for enviada para `/api/ai/generate-insights` para um usuário que não gerou insights nas últimas 24 horas
- **ENTÃO** o sistema DEVE prosseguir com o processo de geração de insights.

### Requisito: Armazenar Insights Gerados
O sistema DEVE armazenar os insights gerados pelo serviço de IA na tabela `ai_insights` do banco de dados.

#### Cenário: Geração e armazenamento de insights com sucesso
- **QUANDO** o serviço de IA retornar com sucesso uma lista de insights
- **ENTÃO** o sistema DEVE criar um novo registro na tabela `ai_insights` para cada insight, vinculando-o ao usuário correto.
- **E** o sistema DEVE atualizar o timestamp `last_insight_generated_at` correspondente ao usuário.
