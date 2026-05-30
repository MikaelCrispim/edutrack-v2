## Por que

Esta alteração inicia o desenvolvimento da aplicação EduTrack AI, um assistente educacional personalizado. O objetivo é fornecer aos estudantes uma ferramenta para gerenciar disciplinas, acompanhar tarefas e monitorar o progresso acadêmico, conforme especificado no projeto. Este trabalho segue a solicitação do usuário para começar a produção com base na documentação fornecida.

## O que será alterado

- **Nova Aplicação**: Scaffold e desenvolvimento do MVP EduTrack AI.
- **Configuração do Backend**: Implementação do esquema de banco de dados e APIs no Xano.
- **Configuração do Frontend**: Criação de uma aplicação React/React Native para a interface do usuário.
- **Funcionalidades Principais**:
  - Autenticação de usuários (cadastro, login).
  - Gerenciamento de disciplinas acadêmicas (`subjects`).
  - Gerenciamento de tarefas associadas às disciplinas.
  - Um dashboard para visualizar o progresso.

## Capacidades

### Novas Capacidades
- `user-auth`: Gerencia registro, login e sessão do usuário.
- `subject-management`: CRUD de disciplinas acadêmicas.
- `task-management`: Gerencia tarefas vinculadas às disciplinas, incluindo status e prazos.
- `dashboard`: Fornece visão geral do progresso do estudante, incluindo percentuais de conclusão e outras métricas.

### Capacidades Modificadas
- Nenhuma

## Impacto

- **Codebase**: Criará uma nova aplicação funcional.
- **Backend**: Um novo backend Xano será construído, incluindo tabelas, APIs e lógica de negócio em XanoScript.
- **Frontend**: Uma nova aplicação React/React Native será desenvolvida para interagir com o backend.
- **Lógica Customizada**: Scripts Node.js serão criados para cálculos e processamento de dados complexos, conforme a documentação do projeto.
- **Ferramentas**: O processo de desenvolvimento será guiado pelo OpenSpec e pelo fluxo de trabalho baseado em agentes em `docs/xanoscript-dev-guide.md`.
