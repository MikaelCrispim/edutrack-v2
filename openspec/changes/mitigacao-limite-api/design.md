## Contexto

Este documento descreve o design técnico para mitigar os limites de taxa (rate limits) do Xano (10 requisições / 20 segundos) na aplicação frontend, especificamente para evitar falhas na página principal do painel.

## Objetivos / Não‑objetivos

**Objetivos:**
- Evitar que a aplicação quebre ao atingir o limite `429 Too Many Requests` do Xano.
- Reduzir o número total de chamadas redundantes durante o carregamento inicial.
- Implementar um mecanismo de retry automático para requisições que falham por causa do rate limit.

**Não‑objetivos:**
- Atualizar o plano do Xano.
- Reescrever todo o gerenciamento de estado para uma solução pesada como Redux ou React Query (o objetivo é uma mitigação leve e rápida).

## Decisões

### 1. Cache de Requisições API
- **Decisão:** Implementar cache simples para requisições `GET` em `frontend/src/api.js`. Podemos usar `axios-cache-interceptor` para cachear respostas por um curto período (ex.: 5–10 segundos). Se dois componentes solicitarem `/subjects` simultaneamente, apenas uma requisição de rede será feita; a outra receberá o resultado em cache.

### 2. Retries Automáticos
- **Decisão:** Integrar `axios-retry` ao `apiClient`. Será configurado para interceptar respostas com status `429` e tentar novamente a requisição usando backoff exponencial (ou um delay fixo).

### 3. Otimização do Fetch no Dashboard
- **Decisão:** Revisar `DashboardPage.jsx` e componentes como `TasksList`, `SubjectsList` e `AIInsights`. Se eles estiverem buscando os mesmos dados independentemente (ex.: `getAllTasks` e `getSubjects`), iremos elevar (hoist) a lógica de fetch para `DashboardPage.jsx` e passar os dados via props, ou confiar no novo cache do axios. Considerando o prazo, confiar no `axios-cache-interceptor` é a solução menos intrusiva e mais eficaz a curto prazo.

## Riscos / Compensações
- **[Risco] Dados desatualizados:** Cachear `GET` pode fazer o usuário ver dados obsoletos logo após uma mutação (ex.: criação de uma disciplina).
  - **Mitigação:** Garantir que mutações (`POST`, `PUT`, `DELETE`, `PATCH`) invalidem entradas relevantes do cache, ou manter TTL curto (ex.: 5 segundos) apenas para sobreviver ao pico inicial de carregamento.
- **[Risco] Percepção de lentidão no retry:** Se a requisição atingir o rate limit e for re-tentada após alguns segundos, o usuário perceberá atraso.
  - **Mitigação:** Exibir estados de carregamento apropriados na UI, indicando que a aplicação está processando.
