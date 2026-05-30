## Requisitos ADICIONADOS

### Requisito: Excluir Insight de IA
O sistema DEVE permitir que os usuários excluam insights de IA individuais de seu painel.

#### Cenário: Usuário exclui um insight
- **DADO** que um usuário tem pelo menos um insight de IA exibido em seu painel
- **QUANDO** o usuário clicar no botão de exclusão associado a um insight específico
- **ENTÃO** o sistema DEVE enviar uma requisição para excluir o insight.
- **E** o sistema DEVE desativar temporariamente o botão de exclusão ou exibir um indicador de carregamento.
- **E** após a exclusão bem-sucedida, o sistema DEVE remover o insight da visualização sem requerer um recarregamento completo da página.
