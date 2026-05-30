## Requisitos MODIFICADOS

### Requisito: Visualizar Disciplinas com UI Moderna
O sistema DEVE exibir uma lista de todas as disciplinas ao usuário usando um layout moderno e responsivo em cartões, construído com Tailwind CSS.

#### Cenário: Visualizar Lista de Disciplinas
- **QUANDO** o usuário navegar para a página de disciplinas.
- **ENTÃO** deverá ser enviada uma requisição `GET` ao endpoint `/subjects`.
- **E** o sistema DEVE mostrar as disciplinas em uma grade responsiva de cartões estilizados com Tailwind CSS.
- **E** cada cartão DEVE ter cantos arredondados, sombra e espaçamento adequado.
- **E** o CSS legado referente a disciplinas em `App.css` DEVE ser removido.

### Requisito: Criar Disciplina com Formulário Moderno
O sistema DEVE permitir que usuários criem novas disciplinas usando um formulário estilizado com Tailwind CSS.

#### Cenário: Visualizar Formulário de Criação
- **QUANDO** o usuário acessar a página "Criar Disciplina".
- **ENTÃO** deverá ser exibido um formulário com campos para todos os atributos da disciplina.
- **E** todos os elementos do formulário (labels, inputs, botões) DEVERÃO ser estilizados com classes utilitárias do Tailwind para aparência profissional.
- **E** deverá existir um botão "Cancelar" que leve o usuário de volta à lista de disciplinas.

### Requisito: Atualizar Disciplina com Formulário Moderno
O sistema DEVE permitir que usuários editem os detalhes de uma disciplina existente usando um formulário estilizado com Tailwind CSS.

#### Cenário: Visualizar Formulário de Edição
- **QUANDO** o usuário acessar a página "Editar Disciplina".
- **ENTÃO** deverá ser exibido um formulário pré‑preenchido com os dados da disciplina.
- **E** todos os elementos do formulário DEVERÃO ser estilizados com Tailwind CSS.
- **E** deverá existir um botão "Cancelar" que leve o usuário de volta à lista de disciplinas.
