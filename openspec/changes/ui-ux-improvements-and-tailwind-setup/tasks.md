## 1. Configuração do Tailwind CSS

- [x] 1.1 No diretório `frontend`, instalar `tailwindcss`, `postcss` e `autoprefixer` como dependências de desenvolvimento.
- [x] 1.2 Criar um arquivo `tailwind.config.js` no diretório `frontend` com os paths de conteúdo corretos para um projeto Vite.
- [x] 1.3 Criar um arquivo `postcss.config.js` no diretório `frontend` incluindo os plugins Tailwind e Autoprefixer.
- [x] 1.4 Limpar o conteúdo de `frontend/src/index.css` e substituí‑lo pelas diretivas `@tailwind`.
- [x] 1.5 Remover o CSS relacionado a disciplinas de `frontend/src/App.css`.

## 2. Navegação Global e Layout

- [x] 2.1 Criar um novo componente `frontend/src/components/Navbar.jsx`.
- [x] 2.2 Implementar o componente `Navbar` com um link para `/subjects` e um botão "Logout" que limpe o `localStorage` e redirecione para `/login`.
- [x] 2.3 Criar um novo componente de layout `frontend/src/components/MainLayout.jsx` que renderize o `Navbar` e um `<Outlet />`.
- [x] 2.4 Atualizar `frontend/src/App.jsx` para usar `MainLayout` em todas as rotas protegidas. A rota raiz deve redirecionar para `/subjects`.

## 3. Refatoração de Componentes com Tailwind CSS

- [x] 3.1 Refatorar `frontend/src/components/subjects/SubjectCard.jsx` para utilizar apenas classes utilitárias do Tailwind (sombra, cantos arredondados, padding) e adotar um design de card moderno.
- [x] 3.2 Refatorar `frontend/src/components/subjects/SubjectList.jsx` para usar Tailwind numa grade responsiva.
- [x] 3.3 Refatorar `frontend/src/components/subjects/SubjectCreate.jsx` para estilizar o formulário e seus elementos com Tailwind. Adicionar um botão "Cancelar" que navegue para a página anterior.
- [x] 3.4 Refatorar `frontend/src/components/subjects/SubjectEdit.jsx` para estilizar o formulário e seus elementos com Tailwind. Adicionar um botão "Cancelar" que navegue para a página anterior.

## 4. Limpeza Final

- [x] 4.1 Rever todos os componentes modificados para garantir que não restaram atributos `className` com CSS inline e que a estilização seja feita com Tailwind.
- [x] 4.2 Verificar que a aplicação é totalmente responsiva.
