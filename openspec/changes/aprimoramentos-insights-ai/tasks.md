## 1. Integração com a API
- [x] 1.1 Em `frontend/src/api.js`, adicionar `deleteAIInsight(id)` que faz uma requisição `DELETE` para `/ai_insights/${id}`.

## 2. Implementação do Componente (`AIInsights.jsx`)
- [x] 2.1 Importar `deleteAIInsight` em `AIInsights.jsx`.
- [x] 2.2 Adicionar um novo estado `deletingId` para rastrear qual insight está sendo excluído atualmente (para exibir um spinner no cartão específico).
- [x] 2.3 Criar uma função `handleDeleteInsight(id)` que chama a API, trata erros e então chama `fetchInsights()` para atualizar a lista.
- [x] 2.4 Atualizar o JSX do cartão de insight para incluir um botão de exclusão (ex.: um ícone de lixeira `🗑️`).
- [x] 2.5 Estilizar o botão de exclusão para ser visualmente distinto, mas discreto (ex.: posicionado de forma absoluta no canto superior direito, visível ao passar o mouse ou cinza por padrão até o hover).
- [x] 2.6 Refinar as classes CSS gerais dos cartões de insight para melhorar a legibilidade (ex.: ajustando margens, espaçamento interno ou sombra).
