## 1. Configuração do Backend (Xano)

- [x] 1.1 **[Xano Table Designer]** Criar a tabela `users`. (Observação: usar a tabela de usuário padrão do Xano e estendê‑la se necessário, conforme `xanoscript-dev-guide.md`).
- [x] 1.2 **[Xano Table Designer]** Criar a tabela `subjects` com os campos: `name` (texto), `professor` (texto), `course_load` (inteiro), `description` (texto), `start_date` (timestamp), `end_date` (timestamp), e relacionamento com `users`.
- [x] 1.3 **[Xano Table Designer]** Criar a tabela `academic_tasks` com os campos: `title` (texto), `description` (texto), `due_date` (timestamp), `status` (texto) e relacionamento com `subjects`.

## 2. Autenticação de Usuário (Xano)

- [x] 2.1 **[Xano API Query Writer]** Implementar o endpoint `/auth/signup` conforme a especificação `user-auth`.
- [x] 2.2 **[Xano API Query Writer]** Implementar o endpoint `/auth/login` conforme a especificação `user-auth`.
- [x] 2.3 **[Xano API Query Writer]** Implementar o endpoint `/auth/password-reset` conforme a especificação `user-auth`.
- [x] 2.4 **[Xano Unit Test Writer]** Escrever testes unitários para os endpoints de autenticação.

## 3. Gerenciamento de Disciplinas (Xano)

- [x] 3.1 **[Xano API Query Writer]** Criar endpoints CRUD para `/subjects` (Criar, Ler, Atualizar, Remover) conforme `subject-management`. Endpoints devem ser autenticados.
- [x] 3.2 **[Xano Unit Test Writer]** Escrever testes unitários para `/subjects`, garantindo que usuários só acessem suas próprias disciplinas.

## 4. Gerenciamento de Tarefas (Xano)

- [x] 4.1 **[Xano API Query Writer]** Criar endpoints CRUD para `/tasks` conforme `task-management`. Endpoints devem ser autenticados.
- [x] 4.2 **[Xano Unit Test Writer]** Escrever testes unitários para os endpoints de `/tasks`.

## 5. Lógica do Dashboard (Xano & Node.js)

- [x] 5.1 **[Xano Function Writer]** Criar função Xano `calculate_subject_progress` que recebe `subject_id` e retorna percentual de conclusão baseado nas tarefas.
- [x] 5.2 **[Xano API Query Writer]** Criar endpoint `/dashboard` que agrega dados do usuário, chamando `calculate_subject_progress` para cada disciplina.
- [x] 5.3 **[Node.js]** (Futuro) Preparar um serviço Node.js para cálculos mais complexos (fora do escopo inicial do MVP, mas previsto).

## 6. Implementação do Frontend (React/React Native)

- [x] 6.1 **[Frontend Developer]** Inicializar o projeto React/React Native.
- [x] 6.2 **[Frontend Developer]** Construir componentes de UI para login, cadastro e recuperação de senha.
- [x] 6.3 **[Frontend Developer]** Integrar a UI com os endpoints `/auth`.
- [x] 6.4 **[Frontend Developer]** Construir componentes para criar, visualizar, editar e remover disciplinas.
- [x] 6.5 **[Frontend Developer]** Integrar a UI de disciplinas com os endpoints `/subjects`.
- [ ] 6.6 **[Frontend Developer]** Construir componentes para gerenciamento de tarefas dentro de uma disciplina.
- [ ] 6.7 **[Frontend Developer]** Integrar a UI de tarefas com os endpoints `/tasks`.
- [ ] 6.8 **[Frontend Developer]** Construir a UI do dashboard para exibir progresso e gráficos.
- [ ] 6.9 **[Frontend Developer]** Integrar o dashboard com o endpoint `/dashboard`.
