## Por que

A aplicação atualmente apresenta problemas de UI/UX que degradam a experiência do usuário:
1. A barra lateral (sidebar) se comporta de forma imprevisível em larguras próximas a 1024px, sobrepondo ou deslocando o conteúdo incorretamente.
2. Os ícones da navbar (ex.: botão de alternar sidebar e logout) não têm feedback visual adequado (efeitos de hover, cursor pointer), dando sensação de não responsividade.
3. A funcionalidade "Nova Disciplina" injeta um formulário inline ao final do dashboard, o que polui a interface e é fácil de passar despercebido.

Corrigir esses pontos resultará em uma interface mais polida, responsiva e intuitiva.

## O que será alterado

- **Responsividade da Sidebar:** Ajustar breakpoints do Tailwind (`lg:` para `md:` ou garantir comportamento estático/fixo) em `Sidebar.jsx` e `MainLayout.jsx` para transição suave entre overlay mobile e layout lado a lado em desktop.
- **Interatividade da Navbar:** Adicionar estados de hover (`hover:bg-opacity-20`), cores de fundo e estilos de cursor aos botões em `Navbar.jsx`.
- **Modal para Nova Disciplina:** Refatorar `DashboardPage.jsx` para que ao clicar em "New Subject" o componente `SubjectCreate` abra em um modal sobreposto (dimming do fundo), em vez de empurrar o conteúdo para baixo.

## Capacidades

### Capacidades Modificadas

- `dashboard`: Aprimorado com melhor responsividade e fluxo de criação de disciplinas via modal.
- `global-ui`: Elementos de navegação (Sidebar e Navbar) aprimorados.

## Impacto

- **Frontend:** Modificações em `Sidebar.jsx`, `Navbar.jsx` e `DashboardPage.jsx`. A lógica de layout ficará mais robusta e o fluxo de criação centralizado.
- **Backend:** Nenhum. Alterações são apenas de frontend (UI/UX).
