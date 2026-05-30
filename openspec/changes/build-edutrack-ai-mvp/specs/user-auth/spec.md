## Requisitos ADICIONADOS

### Requisito: Registro de Usuário
O sistema DEVE permitir que um novo usuário se registre com um e-mail e senha.

#### Cenário: Registro com Sucesso
- **QUANDO** um usuário enviar o formulário de registro com um e-mail válido e exclusivo e uma senha forte
- **ENTÃO** uma nova conta de usuário DEVE ser criada
- **E** o usuário DEVE ser conectado à aplicação.

#### Cenário: Registro com E-mail Existente
- **QUANDO** um usuário enviar o formulário de registro com um e-mail que já existe no sistema
- **ENTÃO** o sistema DEVE exibir uma mensagem de erro indicando que o e-mail já está em uso.

### Requisito: Login de Usuário
O sistema DEVE permitir que um usuário registrado faça login com seu e-mail e senha.

#### Cenário: Login com Sucesso
- **QUANDO** um usuário enviar o formulário de login com as credenciais corretas
- **ENTÃO** o usuário DEVE ser autenticado
- **E** um token de sessão (JWT) DEVE ser emitido.

#### Cenário: Login com Credenciais Incorretas
- **QUANDO** um usuário enviar o formulário de login com um e-mail ou senha incorretos
- **ENTÃO** o sistema DEVE exibir uma mensagem de erro indicando credenciais inválidas.

### Requisito: Recuperação de Senha
O sistema DEVE fornecer um mecanismo para que os usuários redefinam sua senha.

#### Cenário: Solicitação de Redefinição de Senha
- **QUANDO** um usuário solicitar a redefinição de senha para um endereço de e-mail válido
- **ENTÃO** o sistema DEVE enviar um e-mail com um link para redefinição de senha.

#### Cenário: Redefinição de Senha com Sucesso
- **QUANDO** um usuário seguir o link de redefinição e enviar uma nova senha
- **ENTÃO** a senha do usuário DEVE ser atualizada.
