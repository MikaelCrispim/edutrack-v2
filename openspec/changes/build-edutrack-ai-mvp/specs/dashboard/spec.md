## Requisitos ADICIONADOS

### Requisito: Exibir Progresso das Disciplinas
O sistema DEVE exibir uma lista de todas as disciplinas com um percentual de progresso calculado.

#### Cenário: Visualizar Progresso
- **QUANDO** um usuário navegar para o painel (dashboard)
- **ENTÃO** o sistema DEVE exibir cada disciplina juntamente com uma barra de progresso.
- **E** o percentual de progresso DEVE ser calculado com base na proporção de tarefas concluídas em relação ao total de tarefas daquela disciplina.

### Requisito: Exibir Tempo Gasto por Disciplina
O sistema DEVE exibir um gráfico simples (pizza ou barra) mostrando o tempo gasto por disciplina.

#### Cenário: Visualizar Gráfico de Tempo
- **QUANDO** um usuário navegar para o painel (dashboard)
- **ENTÃO** o sistema DEVE exibir um gráfico representando a distribuição do tempo gasto entre todas as disciplinas.
- **NOTA**: O MVP dependerá da inserção manual de tempo por tarefa. Uma melhoria futura introduzirá um cronômetro.
