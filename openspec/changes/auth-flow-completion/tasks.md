## 1. Configuração do Backend no Xano (Passo a passo)

Siga estes passos no seu workspace Xano para configurar rotas de verificação por código.

### 1.1 Atualizar a tabela `users`
1. Acesse **Database** no Xano e selecione a tabela `users`.
2. Adicione um campo: tipo **Text**, nome `verification_code`.
3. Adicione um campo: tipo **Boolean**, nome `is_verified` (Default: `false`).

### 1.2 Atualizar o endpoint `/auth/signup`
1. Abra o endpoint `/auth/signup`.
2. Após o passo que faz `Add Record` em `users`, adicione uma etapa **Utility -> Generate Random String/Number** para criar um código de 6 dígitos.
3. Adicione um passo **Edit Record** para salvar esse código em `verification_code` para o usuário criado.
4. *(Opcional)* Adicione um passo para enviar um email com o código (SendGrid ou similar).

### 1.3 Criar o endpoint `/auth/verify`
1. Crie um novo endpoint: `POST /auth/verify`.
2. Adicione Inputs: `email` (Text) e `code` (Text).
3. **Fluxo da Função:**
   - **Query Record:** Buscar o usuário em `users` onde `email` corresponde ao input.
   - **Precondition:** Verificar se `user.verification_code` é igual ao `code` recebido; se não, retornar erro ("Código inválido").
   - **Edit Record:** Atualizar o usuário, definindo `is_verified` como `true` e limpando `verification_code`.
   - **Create Auth Token:** Gerar e retornar um token para o usuário.

### 1.4 Atualizar o endpoint `/auth/password-reset`
1. No endpoint `/auth/password-reset`, após localizar o usuário, gerar um código de 6 dígitos.
2. Salvar esse código em `verification_code` do usuário.
3. Enviar o código por email.

### 1.5 Criar o endpoint `/auth/reset-password-verify`
1. Criar novo endpoint: `POST /auth/reset-password-verify`.
2. Adicionar Inputs: `email` (Text), `code` (Text) e `new_password` (Password).
3. **Fluxo da Função:**
   - **Query Record:** Buscar o usuário por `email`.
   - **Precondition:** Verificar se `user.verification_code` é igual ao `code` recebido.
   - **Edit Record:** Atualizar a senha do usuário com `new_password` e limpar `verification_code`.

---

## 2. Integração no Frontend

- [x] 2.1 Em `frontend/src/api.js`, adicionar funções para os novos endpoints de verificação (`verifyRegistration` e `verifyPasswordReset`).
- [x] 2.2 Em `frontend/src/components/auth/Register.jsx`, adicionar estado `step` (1 ou 2).
- [x] 2.3 Atualizar `Register.jsx` para, após signup bem‑sucedido, avançar para o passo 2 e exibir o input do código.
- [x] 2.4 No passo 2, chamar `verifyRegistration` e efetuar login ao receber sucesso.
- [x] 2.5 Em `frontend/src/components/auth/PasswordReset.jsx`, adicionar estado `step`.
- [x] 2.6 Atualizar `PasswordReset.jsx` para, após envio do email, avançar para o passo 2 e exibir inputs para Código e Nova Senha.
- [x] 2.7 No passo 2, chamar `verifyPasswordReset` e redirecionar para login ao receber sucesso.
