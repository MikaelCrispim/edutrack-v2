## Requisitos ADICIONADOS

### Requisito: Exibir Insights de IA Existentes
O sistema DEVE exibir uma lista de insights de IA gerados anteriormente no painel (dashboard) do usuário.

#### Cenário: Usuário visualiza o painel com insights existentes
- **DADO** que o usuário gerou insights anteriormente
- **QUANDO** o usuário navegar para a página do painel
- **ENTÃO** o sistema DEVE buscar os insights do backend.
- **E** o sistema DEVE exibir cada insight com seu texto correspondente e data/hora de criação.

#### Cenário: Usuário visualiza o painel sem insights
- **DADO** que o usuário nunca gerou insights
- **QUANDO** o usuário navegar para a página do painel
- **ENTÃO** o sistema DEVE exibir um estado vazio amigável indicando que ainda não há insights disponíveis.

### Requisito: Geração Manual de Insights
O sistema DEVE permitir que o usuário dispare manualmente a geração de novos insights de IA a partir do painel.

#### Cenário: Usuário dispara geração de insights com sucesso
- **QUANDO** o usuário clicar no botão "Gerar Insights"
- **ENTÃO** o sistema DEVE exibir um indicador de carregamento e desativar o botão.
- **E** o sistema DEVE enviar uma requisição ao backend para gerar novos insights.
- **E** após a geração com sucesso, o sistema DEVE atualizar automaticamente a lista de insights exibida.

#### Cenário: Usuário dispara geração de insights mas o backend falha
- **QUANDO** o usuário clicar no botão "Gerar Insights"
- **E** a requisição ao backend falhar (ex.: por conta de limite de requisições ou erro de serviço)
- **ENTÃO** o sistema DEVE exibir uma mensagem de erro ao usuário.
- **E** o sistema DEVE reativar o botão "Gerar Insights".
