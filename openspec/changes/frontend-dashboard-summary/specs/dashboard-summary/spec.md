## Requisitos ADICIONADOS

### Requisito: Exibir Métricas de Resumo do Painel
O sistema DEVE exibir um resumo visual do progresso do usuário no painel principal (dashboard).

#### Cenário: Usuário visualiza o painel
- **QUANDO** o usuário navegar para a página do painel
- **ENTÃO** o sistema DEVE buscar as métricas de resumo do usuário (Total de Disciplinas, Atividades Pendentes, Percentual de Conclusão) no backend.
- **E** o sistema DEVE exibir um indicador de carregamento enquanto os dados estão sendo buscados.
- **E** após a recuperação dos dados com sucesso, o sistema DEVE exibir as métricas em cartões claramente separados.

#### Cenário: O backend falha em retornar dados do resumo
- **QUANDO** o usuário navegar para a página do painel
- **E** a requisição para buscar as métricas de resumo falhar
- **ENTÃO** o sistema DEVE exibir uma mensagem de erro amigável na seção de resumo.
- **E** o restante do painel DEVE continuar a funcionar normalmente.
