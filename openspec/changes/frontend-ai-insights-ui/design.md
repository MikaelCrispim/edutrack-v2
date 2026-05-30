## Contexto

Este documento descreve o design da interface frontend para a funcionalidade AI Insights. O objetivo é fornecer uma UI limpa e envolvente onde os usuários possam ler insights anteriores e acionar a geração de novos insights diretamente pelo painel.

## Objetivos / Não‑objetivos

**Objetivos:**
- Projetar um componente React que busque e exiba uma lista de insights.
- Implementar um botão interativo "Gerar Insights".
- Fornecer feedback visual claro para estados de carregamento, geração e erro.
- Exibir um estado vazio (empty state) quando não houver insights.

**Não‑objetivos:**
- Modificar o prompt de geração de IA ou a lógica de rate limiting no backend.

## Decisões

### 1. Estrutura do Componente

Criaremos `AIInsights.jsx` em `src/components/dashboard`.

- **Gerenciamento de Estado:**
  - `insights` (Array): Lista de insights.
  - `loading` (Boolean): Controla o spinner do fetch inicial.
  - `generating` (Boolean): Controla o spinner e desabilita o botão durante a geração.
  - `error` (String | null): Mensagens de erro a exibir.
- **Busca de Dados:** No mount, `useEffect` chama `fetchInsights()` (que usa `getAIInsights`).

### 2. Design da UI

- **Layout Principal:** Container estilizado com cabeçalho ("AI Insights" + ícone de robô) e botão "Gerar Insights" no canto superior direito.
- **Estado Vazio:** Se `insights.length === 0`, exibir uma tela de boas‑vindas convidando o usuário a completar tarefas e um botão proeminente "Gerar Primeiro Insight".
- **Lista de Insights:** Insights exibidos como uma lista vertical de cartões visuais. Cada cartão mostra o texto do insight e a data de criação. Emojis (⭐ para o mais recente, 💡 para os anteriores) adicionam interesse visual.
- **Mecanismos de Feedback:**
  - Emoji de robô girando (`🤖`) durante o carregamento inicial.
  - Ampulheta girando (`⏳`) e texto atualizado no botão durante a geração.
  - Caixa de alerta vermelha descartável para erros.

### 3. Integração com API

- **Busca:** Adicionar `getAIInsights` em `src/api.js` para chamar `GET /ai_insights`.
- **Geração:** Usar `generateAIInsights` para chamar `POST /generate_insights`. Quando a geração for bem‑sucedida, chamar `fetchInsights()` novamente para atualizar a lista.

## Riscos / Compensações

- **[Risco] Tempo longo de geração:** A geração por IA pode levar alguns segundos; se o usuário navegar, a UI não atualizará imediatamente.
  - **Mitigação:** O estado `generating` fornece feedback imediato e o botão é desabilitado para prevenir cliques repetidos. O limite de 24 horas no backend ajuda a evitar abuso.
