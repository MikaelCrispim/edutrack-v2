# Tasks: Integração Direta Gemini API

**Referência:** proposal.md + design.md  
**Status:** em andamento  
**Atualizado:** 2026-05-09

---

## Checklist de Implementação

### Fase 1 — Infraestrutura (✅ Concluída)

- [x] **T1** — Instalar dependência `@google/generative-ai` via npm no `frontend/`
- [x] **T2** — Criar `frontend/.env.local` com a variável `VITE_GEMINI_API_KEY`
- [x] **T3** — Garantir que `*.local` esteja no `.gitignore`
- [x] **T4** — Criar `frontend/src/services/geminiService.js` com a função `generateInsightsWithGemini(subjects, tasksBySubject)`

### Fase 2 — Integração no Frontend (❌ Pendente)

- [x] **T5** — Adicionar função `saveAIInsight(text)` em `frontend/src/api.js`
- [x] **T6** — Refatorar `handleGenerateInsights` em `AIInsights.jsx` para usar o novo fluxo:
  1. Buscar subjects do Xano via `getSubjects()`
  2. Buscar tasks por subject via `getTasksBySubject()`
  3. Chamar `generateInsightsWithGemini()` do geminiService
  4. Persistir cada insight via `saveAIInsight()`
  5. Recarregar lista de insights

### Fase 3 — Validação (❌ Pendente)

- [ ] **T7** — Testar localmente com API Key real
  - Verificar geração de 3 insights
  - Verificar persistência no Xano
  - Verificar exibição na UI
  - Verificar tratamento de erros
- [ ] **T8** — Documentar a variável de ambiente no `README.md`

---

## Critérios de Aceitação

- ✅ Ao clicar em "Generate Insights", os insights são gerados pela Gemini API diretamente (sem passar pelo Xano)
- ✅ Os insights gerados são exibidos no dashboard e persistidos no Xano
- ✅ A API Key não está hardcoded no código-fonte
- ✅ Erros de API são exibidos amigavelmente na UI
- ✅ O fluxo antigo (delete, listagem) continua funcionando

---

## Estimativas

| Task | Esforço |
|---|---|
| T5 — saveAIInsight em api.js | ~5 min |
| T6 — Refatorar AIInsights.jsx | ~15 min |
| T7 — Testes locais | ~10 min |
| T8 — Documentação | ~5 min |
| **Total restante** | **~35 min** |
