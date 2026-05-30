## Por que

O módulo de disciplinas atual, embora funcional, sofre com uma experiência do usuário frágil e aparência desatualizada. Elementos-chave de navegação estão ausentes e a estilização é inconsistente. Esta mudança resolve esses problemas implementando uma barra de navegação global, configurando o Tailwind CSS para um sistema de design moderno e refatorando os componentes relacionados a disciplinas para usar Tailwind, resultando em uma UI profissional e responsiva.

## O que será alterado

- Criar um componente persistente `Navbar` para usuários autenticados com links para o painel e um botão de logout funcional.
- Adicionar botões "Cancelar/Voltar" nos formulários `SubjectCreate` e `SubjectEdit`.
- **BREAKING**: Remover o CSS previamente adicionado para disciplinas em `App.css`.
- Instalar e configurar Tailwind CSS, PostCSS e Autoprefixer para o projeto Vite.
- Refatorar `SubjectList`, `SubjectCard`, `SubjectCreate` e `SubjectEdit` para usar exclusivamente classes utilitárias do Tailwind para estilização.
- Redesenhar `SubjectList` como uma grade responsiva de cartões modernos.
- Restilizar formulários para torná‑los profissionais e fáceis de usar.

## Capacidades

### Novas Capacidades
- `global-navigation`: Fornece uma barra de navegação consistente para usuários autenticados.

### Capacidades Modificadas
- `subjects-crud`: A interface e experiência do CRUD de disciplinas serão significativamente melhoradas com um design moderno e responsivo usando Tailwind CSS.

## Impacto

- **Configuração do projeto:**
  - `package.json`: Será atualizado com novas dependências de desenvolvimento (`tailwindcss`, `postcss`, `autoprefixer`).
  - `tailwind.config.js`: Novo arquivo será criado.
  - `postcss.config.js`: Novo arquivo poderá ser criado.
  - `frontend/src/index.css`: Será atualizado para incluir as diretivas do Tailwind.
- **Componentes do Frontend:**
  - `Navbar.jsx`: Novo componente será criado.
  - `App.jsx`: Será modificado para incluir o `Navbar` no layout das rotas protegidas.
  - `SubjectList.jsx`, `SubjectCard.jsx`, `SubjectCreate.jsx`, `SubjectEdit.jsx`: Serão amplamente refatorados para usar Tailwind em vez de classes CSS convencionais.
- **CSS:**
  - `App.css`: As regras CSS do módulo de disciplinas serão removidas.
