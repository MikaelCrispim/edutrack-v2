## Contexto

O recurso de gerenciamento de disciplinas do aplicativo está funcional, mas carece de uma UI/UX profissional. Não há navegação global, o que dificulta a movimentação entre seções e o logout. A estilização é inconsistente e não baseada em um framework moderno de CSS, resultando em aparência desatualizada e problemas de manutenção.

## Objetivos / Não-objetivos

**Objetivos:**
- Estabelecer uma UI consistente e moderna integrando o Tailwind CSS.
- Fornecer navegação persistente e clara para usuários autenticados.
- Melhorar a usabilidade dos formulários adicionando funcionalidade de cancelar/voltar.
- Refatorar todos os componentes relacionados a disciplinas para usar Tailwind CSS, tornando‑os responsivos e visualmente atraentes.

**Não-objetivos:**
- Esta alteração não introduzirá nova funcionalidade de backend.
- Não mudará a paleta de cores ou o branding já existentes; apenas aplicará via configuração do Tailwind.
- Não cobrirá a UI de partes não autenticadas da aplicação (ex.: páginas de login ou registro).

## Decisões

1.  **Integração do Tailwind CSS:**
    *   **Decisão**: Vamos instalar e configurar o Tailwind CSS para o frontend baseado em Vite, incluindo `tailwindcss`, `postcss` e `autoprefixer`.
    *   **Justificativa**: Tailwind fornece um fluxo de trabalho utilitário eficiente, permitindo desenvolvimento rápido de UIs modernas e responsivas. É altamente configurável e facilita a criação de um sistema de design consistente.
    *   **Configuração**:
        *   `tailwind.config.js`: Será criado para definir os paths de conteúdo (scan de classes) e eventuais customizações de tema.
        *   `postcss.config.js`: Será criado para incluir os plugins `tailwindcss` e `autoprefixer`.
        *   `index.css`: O `frontend/src/index.css` existente será limpo e substituído pelas três diretivas principais do Tailwind: `@tailwind base;`, `@tailwind components;` e `@tailwind utilities;`.

2.  **Estrutura de Layout e Navegação:**
    *   **Decisão**: Criar um componente `MainLayout.jsx` que renderize o `Navbar` e um `<Outlet />` do `react-router-dom`. O `ProtectedRoute` será ajustado para renderizar seus filhos dentro deste `MainLayout`.
    *   **Justificativa**: Isso separa claramente o layout (navegação) do conteúdo da página e garante que qualquer rota aninhada em `ProtectedRoute` receba a barra de navegação global automaticamente.
    *   **Componente Navbar**: Criar `Navbar.jsx` contendo:
        *   Um `NavLink` do `react-router-dom` apontando para `/subjects` (novo home/painel).
        *   Um botão "Logout" que, ao ser clicado, remova o token de autenticação de `localStorage` e navegue o usuário para `/login`.

3.  **Refatoração de Componentes:**
    *   **Decisão**: Reescrever `SubjectList`, `SubjectCard`, `SubjectCreate` e `SubjectEdit` para utilizar classes utilitárias do Tailwind. O CSS existente em `App.css` relacionado a estes componentes será removido.
    *   **Justificativa**: Essencial para alcançar um visual consistente e moderno, além de centralizar a lógica de estilização nos próprios componentes, melhorando a manutenibilidade.
    *   **Especificações**:
        *   `SubjectList`: Usará utilitários de grid do Tailwind (ex.: `grid`, `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, `gap-4`).
        *   `SubjectCard`: Usará utilitários de padding (`p-4`), sombras (`shadow-lg`), cantos arredondados (`rounded-md`) e cores de fundo (`bg-white`).
        *   `SubjectCreate`/`SubjectEdit`: Os formulários serão estilizados usando utilitários (ou plugin de formulários do Tailwind, se disponível) para inputs, labels e botões, garantindo espaçamento e alinhamento. Será adicionado um botão "Cancelar" que utilize `useNavigate` para voltar à página anterior (`navigate(-1)`).

## Riscos / Compensações

-   **Risco**: Purga incorreta de classes CSS. A build de produção do Tailwind remove classes não utilizadas; se os paths em `tailwind.config.js` não estiverem corretos, estilos podem quebrar em produção.
    -   **Mitigação**: Garantir que o array `content` em `tailwind.config.js` aponte corretamente para todos os arquivos que contêm JSX/HTML (`./src/**/*.{js,jsx,ts,tsx}`).
-   **Compensação**: A configuração inicial do Tailwind adiciona alguma complexidade.
    -   **Justificativa**: Os benefícios a longo prazo em velocidade de desenvolvimento, manutenção e consistência da UI superam o custo inicial.
-   **Risco**: Conflitos de CSS global. A diretiva `@tailwind base` redefine alguns estilos padrão do navegador.
    -   **Mitigação**: Esse efeito é desejado para consistência. Testaremos a aplicação para garantir que não impacte negativamente outros estilos que queiramos manter. Como estamos refatorando os principais componentes, esse risco é baixo.
