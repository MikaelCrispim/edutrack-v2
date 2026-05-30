## Requisitos ADICIONADOS

### Requisito: Criar Disciplina
O sistema DEVE permitir que um usuário autenticado crie uma nova disciplina acadêmica.

#### Cenário: Criação de Disciplina com Sucesso
- **QUANDO** um usuário enviar o formulário para criar uma nova disciplina com todos os campos obrigatórios (nome, professor, carga horária, descrição, datas de início/fim)
- **ENTÃO** um novo registro de disciplina DEVE ser criado e associado ao usuário atual.

### Requisito: Visualizar Disciplinas
O sistema DEVE permitir que um usuário visualize uma lista de todas as suas disciplinas.

#### Cenário: Exibir Disciplinas
- **QUANDO** um usuário navegar para a lista de disciplinas
- **ENTÃO** o sistema DEVE exibir todas as disciplinas criadas por esse usuário.

### Requisito: Editar Disciplina
O sistema DEVE permitir que um usuário edite os detalhes de uma disciplina existente de sua propriedade.

#### Cenário: Atualização de Disciplina com Sucesso
- **QUANDO** um usuário atualizar os detalhes de uma disciplina e salvar as alterações
- **ENTÃO** o registro da disciplina DEVE ser atualizado com as novas informações.

### Requisito: Excluir Disciplina
O sistema DEVE permitir que um usuário exclua uma disciplina de sua propriedade.

#### Cenário: Exclusão de Disciplina com Sucesso
- **QUANDO** um usuário optar por excluir uma disciplina
- **ENTÃO** o registro da disciplina DEVE ser removido do sistema.
- **E** todas as tarefas associadas também DEVEM ser excluídas.
