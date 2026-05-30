## Contexto

Este documento descreve o design técnico para corrigir problemas de layout e navegação reportados no MVP EduTrack.

## Objetivos / Não‑Objetivos

**Objetivos:**
- Corrigir o problema de largura/exibição da sidebar que ocorre por volta de 1024px.
- Melhorar feedback visual (hover, cursor pointer) nos elementos interativos da Navbar.
- Converter o formulário inline de "Nova Disciplina" em um modal centralizado.

**Não‑Objetivos:**
- Alterar o esquema de cores geral ou a estrutura de rotas.
- Modificar APIs do backend para criação de disciplinas.

## Decisões

### 1. Responsividade da Sidebar
- **Problema Atual:** A `Sidebar` usa `w-64` e faz a transição para posicionamento estático no breakpoint `lg` (1024px), mas o layout principal pode não ter espaço suficiente, ou o toggle mobile não coincide com esse breakpoint.
- **Decisão:** Revisar `Sidebar.jsx` e `MainLayout.jsx` para garantir uso consistente de breakpoint (ex.: `md` ou `lg`) ao alternar entre drawer mobile fixo e sidebar desktop estática. Garantir que `lg:translate-x-0` não sobreponha o conteúdo principal.

### 2. Elementos Interativos da Navbar
- **Problema Atual:** Botões não transmitem sensação de interatividade.
- **Decisão:** Em `Navbar.jsx`, garantir que todos os `<button>` e `<NavLink>` tenham `cursor-pointer` e estilos de hover claros (ex.: `hover:bg-white/20`) para toggle e logout.

### 3. Modal para "Nova Disciplina"
- **Problema Atual:** `DashboardPage.jsx` renderiza `SubjectCreate` inline com `showCreateForm && <SubjectCreate />`.
- **Decisão:** Envolver `SubjectCreate` dentro de uma div full‑screen (`fixed inset-0 z-50 bg-black/50`) que centralize o formulário, servindo como Modal. Adicionar botão de fechar (X) e garantir que clicar fora do formulário feche o modal.

## Riscos / Compensações
- **[Risco] Conflito de Z-Index:** O novo modal pode conflitar com `z-index` da Sidebar ou Navbar.
  - **Mitigação:** Assegurar que o container do Modal tenha `z-index` (ex.: `z-50`) maior que Sidebar (`z-40`) e Navbar.
