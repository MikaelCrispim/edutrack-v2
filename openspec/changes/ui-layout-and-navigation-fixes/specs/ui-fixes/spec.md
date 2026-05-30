## Requisitos ADICIONADOS

### Requisito: Navegação Responsiva
O sistema DEVE fornecer uma barra lateral (sidebar) de navegação que se adapte ao tamanho da tela do usuário, sem sobrepor o conteúdo inadequadamente.

#### Cenário: Usuário visualiza o aplicativo no desktop
- **QUANDO** o usuário visualizar o aplicativo em uma tela com largura maior que 1024px
- **ENTÃO** a barra lateral DEVE estar posicionada de forma estática ao lado do conteúdo principal, sem sobrepô-lo.

### Requisito: Criação de Disciplina em Modal
O sistema DEVE permitir que os usuários criem novas disciplinas por meio de um modal sobreposto (overlay) para preservar o contexto do painel (dashboard).

#### Cenário: Usuário clica em "Nova Disciplina"
- **QUANDO** o usuário clicar no botão "Nova Disciplina" no painel
- **ENTÃO** uma tela sobreposta (modal) DEVE aparecer sobre o conteúdo do painel, escurecendo o fundo.
- **E** o formulário de criação de disciplina DEVE ser exibido no centro do modal.

#### Cenário: Usuário descarta o modal
- **DADO** que o modal "Nova Disciplina" está aberto
- **QUANDO** o usuário clicar no botão de fechar ou criar uma disciplina com sucesso
- **ENTÃO** o modal DEVE fechar, revelando o painel totalmente interativo.
