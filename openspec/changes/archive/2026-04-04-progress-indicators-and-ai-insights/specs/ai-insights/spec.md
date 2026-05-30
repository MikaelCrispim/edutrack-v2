## Requisitos ADICIONADOS

### Requisito: Exibir Insights Gerados por IA
O sistema DEVE exibir insights gerados por IA no painel (dashboard) do usuário.

#### Cenário: Usuário visualiza insights de IA
- **QUANDO** um usuário navegar para o painel
- **ENTÃO** o sistema DEVE exibir uma lista de insights personalizados gerados por IA sobre o seu progresso acadêmico.

### Requisito: Buscar Insights Gerados por IA
O sistema DEVE fornecer um endpoint de API para buscar os insights gerados por IA.

#### Cenário: Frontend busca insights de IA
- **QUANDO** o frontend enviar uma requisição `GET` para `/api/ai/insights`
- **ENTÃO** o backend DEVE retornar um objeto JSON contendo uma lista de insights gerados por IA, cada um com texto e data de criação.
