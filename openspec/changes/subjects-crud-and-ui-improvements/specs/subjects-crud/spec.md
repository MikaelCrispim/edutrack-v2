## Requisitos ADICIONADOS

### Requisito: Criar Disciplina
O sistema DEVE permitir que os usuários criem uma nova disciplina inserindo nome, professor, carga horária, descrição, data de início e data de fim.

#### Cenário: Criação de Disciplina com Sucesso
- **QUANDO** um usuário preencher o formulário de nova disciplina com dados válidos e clicar em "Criar".
- **ENTÃO** uma requisição `POST` DEVE ser enviada para o endpoint `/subjects`.
- **E** o sistema DEVE navegar o usuário para a página de lista de disciplinas.
- **E** a disciplina recém-criada DEVE aparecer na lista.

#### Cenário: Dados Inválidos na Criação de Disciplina
- **QUANDO** um usuário tentar criar uma disciplina com campos obrigatórios ausentes (ex.: nome).
- **ENTÃO** o formulário DEVE exibir erros de validação ao lado dos campos inválidos.
- **E** nenhuma requisição `POST` DEVE ser enviada ao servidor.

### Requisito: Visualizar Disciplinas
O sistema DEVE exibir uma lista de todas as disciplinas para o usuário.

#### Cenário: Visualizar Lista de Disciplinas
- **QUANDO** um usuário navegar para a página de disciplinas.
- **ENTÃO** uma requisição `GET` DEVE ser enviada para o endpoint `/subjects`.
- **E** o sistema DEVE exibir as disciplinas em uma grade responsiva de cartões.
- **E** cada cartão DEVE exibir o nome da disciplina, o professor e outros detalhes fundamentais.

### Requisito: Atualizar Disciplina
O sistema DEVE permitir que os usuários editem os detalhes de uma disciplina existente.

#### Cenário: Atualização de Disciplina com Sucesso
- **QUANDO** um usuário clicar no botão "Editar" em um cartão de disciplina.
- **ENTÃO** o usuário DEVE ser direcionado para a página de edição dessa disciplina.
- **E** o formulário DEVE estar pré-preenchido com os detalhes atuais da disciplina.
- **QUANDO** o usuário modificar os detalhes e clicar em "Salvar".
- **ENTÃO** uma requisição `PATCH` (ou `PUT`) DEVE ser enviada para o endpoint `/subjects/{id}` com os dados atualizados.
- **E** o usuário DEVE retornar para a página de lista de disciplinas.
- **E** a lista DEVE refletir as informações atualizadas da disciplina.

### Requisito: Excluir Disciplina
O sistema DEVE permitir que os usuários excluam uma disciplina.

#### Cenário: Exclusão de Disciplina com Sucesso
- **QUANDO** um usuário clicar no botão "Excluir" em um cartão de disciplina.
- **ENTÃO** uma mensagem de confirmação DEVE ser exibida.
- **QUANDO** o usuário confirmar a exclusão.
- **ENTÃO** uma requisição `DELETE` DEVE ser enviada para o endpoint `/subjects/{id}`.
- **E** a disciplina DEVE ser removida da lista na interface do usuário sem a necessidade de recarregar a página.

#### Cenário: Cancelar Exclusão de Disciplina
- **QUANDO** um usuário clicar no botão "Excluir" em um cartão de disciplina.
- **ENTÃO** uma mensagem de confirmação DEVE ser exibida.
- **QUANDO** o usuário cancelar a exclusão.
- **ENTÃO** nenhuma requisição `DELETE` DEVE ser enviada.
- **E** a disciplina DEVE permanecer na lista.
