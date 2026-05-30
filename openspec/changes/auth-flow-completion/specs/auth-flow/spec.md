## Requisitos ADICIONADOS

### Requisito: Verificar Registro via Código
O sistema DEVE exigir que os usuários verifiquem seu registro usando um código enviado para seu e-mail.

#### Cenário: Usuário se registra com sucesso
- **QUANDO** o usuário envia dados de registro válidos
- **ENTÃO** o sistema DEVE transitar para uma etapa de verificação.
- **E** o sistema DEVE solicitar ao usuário um código de verificação.
- **E** ao inserir o código correto, o usuário DEVE ser autenticado no sistema.

### Requisito: Verificar Redefinição de Senha via Código
O sistema DEVE exigir um código de verificação para autorizar uma redefinição de senha.

#### Cenário: Usuário solicita redefinição de senha
- **QUANDO** o usuário envia seu e-mail para redefinição de senha
- **ENTÃO** o sistema DEVE transitar para uma etapa de verificação.
- **E** o sistema DEVE solicitar ao usuário um código de verificação e uma nova senha.
- **E** ao inserir o código correto e uma nova senha válida, o sistema DEVE atualizar a senha e direcionar o usuário para a página de login.
