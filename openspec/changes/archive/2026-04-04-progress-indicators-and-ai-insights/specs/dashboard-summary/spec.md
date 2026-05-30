## Requisitos ADICIONADOS

### Requisito: Exibir Resumo no Painel
O sistema DEVE exibir um resumo do progresso acadêmico do usuário no painel (dashboard).

#### Cenário: Usuário visualiza resumo do painel
- **QUANDO** um usuário navegar para o painel
- **ENTÃO** o sistema DEVE exibir a quantidade total de disciplinas, o número de atividades pendentes e a porcentagem geral de conclusão.

### Requisito: Buscar Dados do Resumo do Painel
O sistema DEVE fornecer um endpoint de API para buscar os dados de resumo do painel.

#### Cenário: Frontend busca dados do resumo
- **QUANDO** o frontend enviar uma requisição `GET` para `/api/dashboard/summary`
- **ENTÃO** o backend DEVE retornar um objeto JSON contendo `totalSubjects`, `pendingActivities` e `completionPercentage`.
