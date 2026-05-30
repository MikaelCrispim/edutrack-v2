## Contexto

Este design descreve a abordagem técnica para finalizar os fluxos de Registro e Redefinição de Senha, introduzindo um mecanismo de OTP (código de verificação) de uso único.

## Objetivos / Não‑objetivos

**Objetivos:**
- Adicionar uma etapa intermediária na UI de Registro para que o usuário insira um código.
- Adicionar uma etapa intermediária na UI de Redefinição de Senha para que o usuário insira um código e a nova senha.
- Definir os requisitos exatos no backend (Xano) para que possam ser configurados manualmente.

**Não‑objetivos:**
- Implementar soluções complexas de autenticação multifator (MFA).

## Decisões

### 1. Fluxo de Registro
- **Passo 1:** O usuário informa nome, email e senha e submete. O frontend chama `POST /auth/signup`.
- **Ação no Backend:** O Xano cria o usuário (status: unverified), gera um código de 6 dígitos, salva em `users` e simula/envia o email (via SendGrid ou similar).
- **Passo 2:** O frontend exibe um formulário "Inserir Código". O usuário digita o código e submete.
- **Ação no Backend:** O frontend chama `POST /auth/verify`. O Xano verifica o código; se válido, marca o usuário como verificado e retorna um token de autenticação.

### 2. Fluxo de Redefinição de Senha
- **Passo 1:** O usuário informa o email e submete. O frontend chama `POST /auth/password-reset`.
- **Ação no Backend:** O Xano encontra o usuário, gera um código de redefinição, salva no banco e envia o código por email.
- **Passo 2:** O frontend exibe um formulário com "Código de Verificação" e "Nova Senha".
- **Ação no Backend:** O frontend chama `POST /auth/reset-password-verify`. O Xano valida o código e atualiza a senha.

### 3. Arquitetura do Frontend
- Modificar `Register.jsx` e `PasswordReset.jsx` para usar um estado `step` (`step === 1` para o formulário inicial e `step === 2` para verificação do código).
- Adicionar novas funções em `api.js`: `verifyRegistration(email, code)` e `verifyPasswordReset(email, code, newPassword)`.

## Riscos / Compensações
- **[Risco] Entrega de email:** Se os emails não forem entregues pelo Xano, usuários podem ficar travados.
  - **Mitigação:** Documentar claramente como verificar o código gerado diretamente no banco (caso o addon de email não esteja configurado).
