# Design Técnico: Integração Direta Gemini API

**Referência:** proposal.md  
**Status:** em andamento  
**Atualizado:** 2026-05-09

---

## Fluxo de Dados Detalhado

```
┌─────────────────────────────────────────────────────────┐
│                  AIInsights.jsx                         │
│                                                         │
│  1. handleGenerateInsights()                            │
│       │                                                 │
│       ├─ 2. api.getSubjects()  ──────► Xano /subjects   │
│       │       └── [{ id, name, workload, ... }]         │
│       │                                                 │
│       ├─ 3. api.getTasksBySubject() ─► Xano /tasks      │
│       │       (para cada subject)                       │
│       │       └── [{ title, status, due_date, ... }]    │
│       │                                                 │
│       ├─ 4. geminiService.generateInsightsWithGemini()  │
│       │       └── buildStudentContext(subjects, tasks)  │
│       │       └── monta prompt → chama Gemini API       │
│       │       └── recebe → parseia JSON → string[]      │
│       │                                                 │
│       ├─ 5. api.saveAIInsight(text) ─► Xano /ai_insights│
│       │       (um POST por insight gerado)              │
│       │                                                 │
│       └─ 6. fetchInsights() → atualiza estado UI        │
└─────────────────────────────────────────────────────────┘
```

---

## Detalhamento por Arquivo

### 1. `api.js` — Nova função `saveAIInsight`

```javascript
// Salva um insight individual gerado pela Gemini no Xano
export const saveAIInsight = (text) => {
  return apiClient.post('/ai_insights', { text });
};
```

---

### 2. `AIInsights.jsx` — Refatoração do `handleGenerateInsights`

(Resumido — ver arquivo original para detalhes de implementação.)

---

### 3. `geminiService.js` — Já implementado ✅

O serviço já contém:
- `buildStudentContext()` — monta contexto textual das disciplinas e tarefas
- `generateInsightsWithGemini()` — inicializa SDK, envia prompt, parseia JSON
- Tratamento de erros e fallbacks

---

## Estrutura do Prompt (já implementada)

(Ver `geminiService.js` para o prompt exato em português.)

---

## Tratamento de Erros

- API Key inválida/ausente: exibir mensagem apropriada
- Resposta não é JSON válido: tentar extrair texto como insight único
- Nenhuma disciplina cadastrada: gerar insights genéricos
- Erro de rede no Gemini: oferecer opção de retry
- Erro ao salvar no Xano: exibir insights na UI mesmo sem persistência

---

## Testes de Validação

1. Clicar em "Generate Insights" e verificar se os 3 insights aparecem
2. Recarregar a página e confirmar persistência dos insights
3. Remover a API Key e verificar a mensagem de erro amigável
4. Deletar um insight e verificar remoção da lista
