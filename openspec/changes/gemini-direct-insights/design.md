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
│       │       └── buildStudentContext(subjects, tasks)   │
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

O endpoint `POST /ai_insights` do Xano já deve existir (é o mesmo que o fluxo antigo usava internamente). Basta enviar o campo `text` com o conteúdo do insight.

---

### 2. `AIInsights.jsx` — Refatoração do `handleGenerateInsights`

**Antes (via Xano):**
```javascript
const handleGenerateInsights = async () => {
  const response = await generateAIInsights(); // Xano faz tudo
  await fetchInsights();
};
```

**Depois (via Gemini direto):**
```javascript
import { generateInsightsWithGemini } from '../../services/geminiService';
import { getSubjects, getTasksBySubject, saveAIInsight } from '../../api';

const handleGenerateInsights = async () => {
  // 1. Buscar dados do aluno no Xano
  const subjectsRes = await getSubjects();
  const subjects = subjectsRes.data;

  // 2. Buscar tarefas por disciplina
  const tasksBySubject = {};
  for (const subject of subjects) {
    const tasksRes = await getTasksBySubject(subject.id);
    tasksBySubject[subject.id] = tasksRes.data;
  }

  // 3. Chamar Gemini diretamente
  const insightsArray = await generateInsightsWithGemini(subjects, tasksBySubject);

  // 4. Persistir cada insight no Xano
  for (const text of insightsArray) {
    await saveAIInsight(text);
  }

  // 5. Recarregar lista de insights da UI
  await fetchInsights();
};
```

---

### 3. `geminiService.js` — Já implementado ✅

O serviço já contém:
- `buildStudentContext()` — monta contexto textual das disciplinas e tarefas
- `generateInsightsWithGemini()` — inicializa SDK, envia prompt, parseia JSON
- Tratamento de erros e fallbacks

---

## Estrutura do Prompt (já implementada)

```
Você é um assistente educacional inteligente especializado em ajudar
estudantes universitários e técnicos a melhorarem seu desempenho acadêmico.

Analise os dados acadêmicos abaixo e gere exatamente 3 insights
personalizados, práticos e motivadores em português.

DADOS DO ESTUDANTE:
[Contexto montado dinamicamente com disciplinas e tarefas]

REGRAS OBRIGATÓRIAS:
1. Cada insight deve ser específico, acionável e baseado nos dados fornecidos
2. Priorize: tarefas atrasadas, disciplinas com baixo progresso e oportunidades
3. Use linguagem encorajadora e direta
4. Responda SOMENTE com um array JSON de strings, sem markdown
5. Formato exato: ["Insight 1 aqui.", "Insight 2 aqui.", "Insight 3 aqui."]
```

---

## Tratamento de Erros

| Cenário | Comportamento |
|---|---|
| API Key inválida/ausente | Exibir mensagem: "Configure sua VITE_GEMINI_API_KEY" |
| Resposta não é JSON válido | Tentar extrair texto como insight único |
| Nenhuma disciplina cadastrada | Gerar insights genéricos (prompt trata esse caso) |
| Erro de rede no Gemini | Exibir mensagem de erro amigável com opção de retry |
| Erro ao salvar no Xano | Exibir insights na UI mesmo sem persistência |

---

## Testes de Validação

1. **Teste funcional:** Clicar em "Generate Insights" e verificar se os 3 insights aparecem
2. **Teste de persistência:** Recarregar a página e verificar se os insights foram salvos
3. **Teste de erro:** Remover a API Key do `.env.local` e verificar mensagem amigável
4. **Teste de delete:** Deletar um insight e verificar que desaparece da lista
