## Por que

A implementação atual de autenticação permite cadastro e solicitação de redefinição de senha, mas falta a etapa final de verificação. Para garantir segurança e contato válido, o sistema deve verificar o email durante o registro e exigir um código para redefinição de senha.

## O que será alterado

- **Backend (Xano):** Adição de campos no banco para armazenar códigos de verificação e criação de endpoints para verificar registro e tratar redefinição de senha usando estes códigos.
- **Frontend:** Atualizações em `Register.jsx` e `PasswordReset.jsx` para incluir a etapa onde o usuário insere o código recebido por email.

## Capacidades

### Capacidades Modificadas

- `user-auth`: Aprimorado para incluir verificação por código via email nos fluxos de registro e redefinição de senha.

## Impacto

- **Frontend:** Pequenas mudanças de UI nos componentes de auth para adicionar formulários em passos (ex.: Passo 1: Solicitar, Passo 2: Verificar Código). Inclusão de novas funções de API em `src/api.js`.
- **Backend:** Alterações significativas na lógica de auth do Xano, requerendo novos endpoints e alterações na tabela para armazenar e validar códigos.
