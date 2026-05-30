## 1. Melhorias no Cliente API
- [X] 1.1 Instalar `axios-retry` e `axios-cache-interceptor` via npm no diretório `frontend`.
- [X] 1.2 Em `frontend/src/api.js`, configurar `axios-retry` para interceptar status `429` e re-tentar com delay.
- [X] 1.3 Em `frontend/src/api.js`, envolver a instância `axios.create` com `setupCache` do `axios-cache-interceptor`, definindo um TTL curto (ex.: 5–10 segundos) para `GET`.

## 2. Estratégia de Invalidação de Cache
- [X] 2.1 Garantir que métodos de mutação (ex.: `createSubject`, `updateTask`) limpem ou ignorem o cache para que `GET` subsequentes obtenham dados atualizados.

## 3. Revisão de Componentes do Dashboard
- [X] 3.1 Revisar `DashboardPage.jsx` para assegurar que spinners/estados de carregamento estejam presentes enquanto os dados são buscados (especialmente durante retries).
- [X] 3.2 Identificar componentes aninhados que façam chamadas duplicadas desnecessárias e refatorá‑los para usar props ou confiar no cliente API com cache.
