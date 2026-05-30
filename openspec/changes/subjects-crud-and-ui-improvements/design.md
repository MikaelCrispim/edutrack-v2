## Contexto

A implementação atual do módulo de disciplinas no frontend está incompleta. Permite apenas listar e criar disciplinas com um conjunto mínimo de campos. A interface é básica e não oferece uma boa experiência ao usuário. Este documento de design descreve a abordagem técnica para estender a funcionalidade para CRUD completo e melhorar a interface.

## Objetivos / Não‑Objetivos

**Objetivos:**
- Implementar CRUD completo (Criar, Ler, Atualizar, Excluir) para disciplinas.
- Melhorar a UI/UX do módulo de disciplinas introduzindo um layout baseado em cartões e separando o formulário da lista.
- Garantir que o frontend comunique corretamente com os endpoints existentes do backend para todas as operações CRUD.

**Não‑Objetivos:**
- Este design não altera o API do backend; assume‑se que os endpoints necessários (`GET`, `POST`, `PATCH`/`PUT`, `DELETE` para `/subjects`) já existem.
- Não inclui implementação de atualizações em tempo real (ex.: WebSockets).
- Não trata autenticação/autorizações, que são gerenciadas por `ProtectedRoute.jsx`.

## Decisões

1. **Estrutura de Componentes:**
   * `SubjectList.jsx`: Responsável por buscar e exibir a lista de disciplinas. Renderizará `SubjectCard` e conterá o botão "Add Subject" que navega para a página de criação.
   * `SubjectCard.jsx`: Componente apresentacional para exibir detalhes de uma disciplina em formato de cartão, incluindo botões "Editar" e "Excluir".
   * `SubjectCreate.jsx`: Componente com o formulário para criar uma nova disciplina (rota/página separada).
   * `SubjectEdit.jsx`: Novo componente para editar uma disciplina existente, pré‑preenchido com os dados atuais.
   * `api.js`: Será atualizado com funções `updateSubject(id, data)` e `deleteSubject(id)`.

2. **Rotas:**
   * `/subjects`: Rota principal, gerenciada por `SubjectList.jsx`.
   * `/subjects/new`: Rota para `SubjectCreate.jsx`.
   * `/subjects/:id/edit`: Rota para `SubjectEdit.jsx`.

3. **Fluxo de Dados para Edição:**
   * Usuário clica em "Editar" em um `SubjectCard`.
   * A aplicação navega para `/subjects/:id/edit`.
   * `SubjectEdit.jsx` busca os dados da disciplina usando o `id` dos parâmetros da URL.
   * O formulário é pré‑preenchido com os dados buscados.
   * Usuário altera os dados e submete o formulário.
   * É chamada a API `updateSubject`.
   * Ao atualizar com sucesso, o usuário é redirecionado de volta para a lista `/subjects`.

4. **Fluxo de Dados para Exclusão:**
   * Usuário clica em "Excluir" em um `SubjectCard`.
   * Apresentar diálogo de confirmação para evitar exclusões acidentais.
   * Se confirmado, chamar `deleteSubject`.
   * Após sucesso, remover o item do estado local em `SubjectList.jsx` para re‑renderizar a UI sem o item.

5. **Estilo:**
   * Usar CSS simples e limpo para criar o layout de cartões (Flexbox ou Grid para responsividade).
   * Não introduzir novos frameworks CSS; manter consistência com `App.css` e `index.css`.

## Riscos / Compensações

- **Risco:** Os endpoints do backend podem ter formatos de requisição/resposta ligeiramente diferentes do esperado.
  - **Mitigação:** Isolar interações com a API em `api.js` para facilitar ajustes; realizar testes durante a implementação.
- **Compensação:** Criar `SubjectEdit.jsx` separado versus usar um modal para edição.
  - **Justificativa:** Página separada oferece melhor experiência em telas pequenas e simplifica o gerenciamento de estado.
