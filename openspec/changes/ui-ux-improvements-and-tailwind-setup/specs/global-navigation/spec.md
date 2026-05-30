## Requisitos ADICIONADOS

### Requisito: Barra de Navegação Persistente
O sistema DEVE exibir uma barra de navegação persistente no topo da tela em todas as rotas protegidas por autenticação.

#### Cenário: Visualizando a Navbar
- **QUANDO** um usuário autenticado navegar para qualquer página protegida (por exemplo, `/subjects`).
- **ENTÃO** o sistema DEVE mostrar a barra de navegação.
- **E** a barra DEVE conter um link visível para a página "Disciplinas" ou "Painel".
- **E** a barra DEVE conter um botão "Logout".

### Requisito: Logout de Usuário
O sistema DEVE permitir que um usuário autenticado faça logout.

#### Cenário: Logout bem‑sucedido
- **QUANDO** o usuário clicar no botão "Logout" na barra de navegação.
- **ENTÃO** o token de autenticação DEVE ser removido de `localStorage`.
- **E** o usuário DEVE ser redirecionado para a página `/login`.

### Requisito: Cancelamento de Formulário
O sistema DEVE fornecer uma maneira de o usuário cancelar um formulário e retornar à página anterior.

#### Cenário: Cancelar Criação de Disciplina
- **QUANDO** o usuário estiver no formulário "Criar Disciplina".
- **ENTÃO** um botão "Cancelar" ou "Voltar" DEVE estar visível.
- **QUANDO** o usuário clicar em "Cancelar" ou "Voltar".
- **ENTÃO** o usuário DEVE ser navegaddo de volta à lista de disciplinas.
