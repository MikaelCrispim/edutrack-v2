## Contexto

Este documento descreve o design para adicionar a funcionalidade de exclusão e melhorias visuais ao recurso AI Insights.

## Objetivos / Não‑Objetivos

**Objetivos:**
- Permitir que usuários excluam insights específicos gerados pela IA.
- Atualizar automaticamente a lista de insights após a exclusão bem‑sucedida.
- Melhorar espaçamentos, tipografia e agrupamento visual dos cards de insights na UI.

**Não‑Objetivos:**
- Implementar edição de insights (insights são gerados pela IA e não devem ser editáveis pelo usuário).

## Decisões

### 1. Integração com a API
- **Decisão:** Adicionar `deleteAIInsight(id)` em `src/api.js` que chame `DELETE /ai_insights/{id}`.

### 2. Atualizações em `AIInsights.jsx`
- **Botão de Exclusão:** Adicionar um pequeno ícone de lixeira no canto superior direito de cada card de insight.
- **Confirmação (Opcional, mas recomendado):** Ao clicar, pode‑se disparar a ação de exclusão e mostrar um estado de loading no card específico (ou no container), em seguida re‑buscar a lista.
- **Melhorias Visuais:** Ajustar padding, bordas e cores para que cada card se destaque e evitar cansaço visual quando houver muitos insights.

## Riscos / Compensações
- **[Risco] Exclusão Acidental:** Sem diálogo de confirmação, há chance de exclusão acidental.
  - **Mitigação:** Impacto baixo (insights são sugestões geradas); priorizar interação rápida (click‑to‑delete) e, se necessário, usar um pequeno undo/feedback em vez de um diálogo lento.
