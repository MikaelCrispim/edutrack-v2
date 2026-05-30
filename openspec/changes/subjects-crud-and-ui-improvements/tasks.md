## 1. Camada de API

- [x] 1.1 Em `frontend/src/api.js`, adicionar `updateSubject(id, subjectData)` que envia `PATCH /api/subjects/{id}`.
- [x] 1.2 Em `frontend/src/api.js`, adicionar `deleteSubject(id)` que envia `DELETE /api/subjects/{id}`.
- [x] 1.3 Em `frontend/src/api.js`, garantir que `createSubject` inclua todos os campos necessários: `name`, `professor`, `course_load`, `description`, `start_date` e `end_date`.

## 2. Componentes de UI - Campos do Formulário

- [x] 2.1 Modificar `frontend/src/components/subjects/SubjectCreate.jsx` para incluir inputs para `name`, `professor`, `course_load` (número), `description` (textarea), `start_date` (data) e `end_date` (data).
- [x] 2.2 Criar `frontend/src/components/subjects/SubjectEdit.jsx`. Este componente será similar a `SubjectCreate.jsx`, mas buscará os dados da disciplina por ID e pré‑preencherá o formulário.
- [x] 2.3 Implementar em `SubjectEdit.jsx` a lógica para buscar os dados da disciplina usando o ID da URL e preencher os campos.
- [x] 2.4 Implementar `onSubmit` em `SubjectEdit.jsx` para chamar `updateSubject`.

## 3. Componentes de UI - Lista e Layout em Cartões

- [x] 3.1 Criar `frontend/src/components/subjects/SubjectCard.jsx` que receba um objeto `subject` como prop e exiba seus detalhes em formato de cartão.
- [x] 3.2 `SubjectCard.jsx` deve incluir botões "Editar" e "Excluir".
- [x] 3.3 Atualizar `frontend/src/components/subjects/SubjectList.jsx` para buscar a lista de disciplinas.
- [x] 3.4 Modificar `SubjectList.jsx` para renderizar `SubjectCard` para cada disciplina em um grid responsivo.
- [x] 3.5 Implementar o handler do botão "Editar" em `SubjectCard.jsx` para navegar até `/subjects/:id/edit`.
- [x] 3.6 Implementar o handler do botão "Excluir" em `SubjectCard.jsx` para mostrar confirmação e chamar `deleteSubject`.
- [x] 3.7 Em `SubjectList.jsx`, atualizar o estado para remover o item excluído sem recarregar a página.

## 4. Rotas

- [x] 4.1 No roteador principal (`App.jsx` ou similar), adicionar as rotas:
    - `/subjects/new` → `SubjectCreate.jsx`
    - `/subjects/:id/edit` → `SubjectEdit.jsx`
    - `/subjects` → `SubjectList.jsx`

## 5. Estilização

- [x] 5.1 Adicionar regras CSS em `App.css` (ou arquivo dedicado) para estilizar os cartões, o grid e os formulários.
- [x] 5.2 Garantir responsividade em diferentes tamanhos de tela.
