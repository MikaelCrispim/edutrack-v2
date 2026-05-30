## Requisitos ADICIONADOS

### Requisito: Cache de Requisições GET
O cliente de API do sistema DEVE armazenar em cache as respostas das requisições `GET` por um curto período de tempo para evitar chamadas redundantes simultâneas.

#### Cenário: Componentes solicitam os mesmos dados simultaneamente
- **QUANDO** múltiplos componentes na mesma página enviarem requisições `GET` idênticas para a API (ex.: `/subjects`)
- **ENTÃO** apenas a primeira requisição DEVE ser enviada ao servidor.
- **E** as requisições subsequentes do mesmo tipo DEVEM ser atendidas usando o resultado armazenado em cache (dentro do tempo de expiração definido).

### Requisito: Retentativa Automática de Requisições de API (Retry)
O cliente de API DEVE tentar reenviar automaticamente qualquer requisição que falhe devido ao limite de taxa do servidor (HTTP 429).

#### Cenário: Requisição atinge limite de taxa
- **QUANDO** uma chamada de API retornar um erro HTTP `429 Too Many Requests`
- **ENTÃO** o cliente de API DEVE aguardar um curto período de tempo.
- **E** o cliente DEVE tentar executar a requisição novamente de forma automática e transparente para o usuário.

### Requisito: Invalidação de Cache em Mutação
O cache de requisições `GET` DEVE ser invalidado ou contornado sempre que ocorrer uma operação de escrita.

#### Cenário: Criação ou alteração de dados
- **QUANDO** o usuário submeter uma requisição de mutação (`POST`, `PUT`, `DELETE`, `PATCH`)
- **ENTÃO** as requisições `GET` subsequentes do mesmo recurso DEVEM contornar o cache para carregar os dados mais recentes do servidor.
