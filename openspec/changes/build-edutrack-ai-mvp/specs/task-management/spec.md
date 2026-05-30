## Requisitos ADICIONADOS

### Requisito: Criar Tarefa
O sistema DEVE permitir que um usuário crie uma nova tarefa e a associe a uma disciplina.

#### Cenário: Criação de Tarefa com Sucesso
- **QUANDO** um usuário enviar o formulário para criar uma nova tarefa com título, descrição, data de entrega e disciplina associada
- **ENTÃO** um novo registro de tarefa DEVE ser criado e vinculado à disciplina especificada.

### Requisito: Visualizar Tarefas de uma Disciplina
O sistema DEVE permitir que um usuário visualize todas as tarefas associadas a uma disciplina específica.

#### Cenário: Exibir Tarefas
- **QUANDO** um usuário selecionar uma disciplina
- **ENTÃO** o sistema DEVE exibir uma lista de todas as tarefas daquela disciplina.

### Requisito: Atualizar Status da Tarefa
O sistema DEVE permitir que um usuário atualize o status de uma tarefa (ex.: "Pendente", "Em Andamento", "Concluída").

#### Cenário: Marcar Tarefa como Concluída
- **QUANDO** um usuário marcar uma tarefa como "Concluída"
- **ENTÃO** o status da tarefa DEVE ser atualizado para "Concluída".

### Requisito: Excluir Tarefa
O sistema DEVE permitir que um usuário exclua uma tarefa.

#### Cenário: Exclusão de Tarefa com Sucesso
- **QUANDO** um usuário optar por excluir uma tarefa
- **ENTÃO** o registro da tarefa DEVE ser removido do sistema.
