## Por que

A aplicação usa o plano gratuito do Xano para o backend, que impõe um limite de taxa de 10 requisições a cada 20 segundos. Atualmente, a página principal do painel dispara múltiplas chamadas simultâneas ao carregar componentes diversos. Isso frequentemente causa falhas com erro `429 Too Many Requests`, impedindo o carregamento correto da página e prejudicando severamente a experiência do usuário.

Resolver esse problema é crítico para a estabilidade da aplicação no plano gratuito.

## O que será alterado

- **Cache de Requisições API:** Implementar um mecanismo de cache (usando `axios-cache-interceptor` ou um cache em memória customizado) em `frontend/src/api.js` para armazenar `GET` por um curto período. Isso evita chamadas redundantes quando múltiplos componentes solicitam os mesmos dados simultaneamente.
- **Retries Automáticos:** Adicionar um interceptor (por exemplo, `axios-retry`) para capturar automaticamente erros `429` e re-tentar a requisição após um delay, suavizando picos de rate limit sem expor erro ao usuário.
- **Otimização do Fetch de Dados:** Revisar a página principal (`DashboardPage.jsx` e seus filhos`) para garantir que os dados sejam buscados de forma eficiente, possivelmente passando-os via props em vez de permitir que cada filho faça sua própria requisição.

## Capacidades

### Capacidades Modificadas

- `dashboard`: Maior estabilidade e confiabilidade no carregamento.
- `global-api`: Cliente de API aprimorado com cache e lógica de retry.

## Impacto

- **Frontend:** Alterações em `frontend/src/api.js` para adicionar cache e interceptors de retry. Pequena refatoração possível em `DashboardPage.jsx` e componentes relacionados.
- **Backend:** Nenhuma. As mudanças mitigam a limitação no frontend.
