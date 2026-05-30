## Por que

O módulo de disciplinas atual carece de funcionalidades CRUD completas e possui uma UI básica. Esta mudança implementará o conjunto completo de operações de criar, ler, atualizar e remover, além de introduzir um layout baseado em cartões mais profissional e amigável, tornando o módulo completo e melhorando a experiência do usuário.

## O que será alterado

- Adicionar um formulário com os campos `name`, `professor`, `course_load`, `description`, `start_date` e `end_date` para criação e edição de disciplinas.
- Implementar um botão "Excluir" em cada item da lista de disciplinas para removê‑lo do sistema.
- Implementar um botão "Editar" em cada item para permitir a modificação dos detalhes.
- Redesenhar a lista de disciplinas de uma visualização em texto para um grid responsivo de cartões.
- Separar o formulário de criação/edição da visualização da lista para um layout mais limpo.

## Capacidades

### Novas Capacidades
- `subjects-crud`: Funcionalidade completa de criar, ler, atualizar e remover para o módulo de disciplinas.

### Capacidades Modificadas
- Nenhuma

## Impacto

- **Frontend:**
  - `frontend/src/components/subjects/SubjectList.jsx`: Será atualizado para incluir botões de editar/excluir e UI baseada em cartões.
  - `frontend/src/components/subjects/SubjectCreate.jsx`: Será atualizado com campos adicionais no formulário.
  - `frontend/src/components/subjects/SubjectEdit.jsx`: Novo componente para edição de disciplinas.
  - `frontend/src/api.js`: Pode requerer novas funções para `PATCH`/`PUT` e `DELETE` para `subjects`.
- **Backend:**
  - Serão usados os endpoints `DELETE /subjects/{id}` e `PATCH /subjects/{id}` (ou `PUT`).
