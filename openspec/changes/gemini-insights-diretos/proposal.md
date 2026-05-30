# Proposta: Integração Direta com Gemini API no Frontend

**ID:** gemini-direct-insights  
**Status:** em andamento (parcialmente implementado)  
**Data:** 2026-05-09  
**Autor:** Mikael Crispim  
**Revisor:** Antigravity (IA)  
**Atualizado:** 2026-05-09

---

## 1. Contexto e Motivação

Atualmente o fluxo de geração de insights é:

```
Web (React) → Xano (POST /generate_insights) → Gemini API
```

Problemas identificados:
- **Latência adicional:** A requisição passa por um intermediário (Xano), adicionando latência.
- **Acoplamento:** A lógica do prompt e do parsing fica no backend, dificultando iterações rápidas.
- **Custo de manutenção:** Qualquer alteração no prompt exige deploy no Xano.

Propomos mover a chamada à Gemini API para o frontend React, deixando o Xano responsável por persistir e servir dados estruturados (subjects, tasks, insights).

Fluxo proposto:
```
Web (React) → Xano API (busca subjects + tasks)
Web (React) → Gemini API (gera insights com os dados)
Web (React) → Xano API (persiste os insights gerados)
```

---

## 2. Estado Atual da Implementação

| Item | Status |
|---|---|
| SDK `@google/generative-ai` instalado | ✅ Concluído |
| `frontend/.env.local` com `VITE_GEMINI_API_KEY` | ✅ Concluído |
| `frontend/src/services/geminiService.js` criado | ✅ Concluído |
| Função `saveAIInsight` em `api.js` | ❌ Pendente |
| `AIInsights.jsx` usando Gemini direto | ❌ Pendente (ainda usa Xano) |
| Testes e validação local | ❌ Pendente |

---

## 3. Objetivos

- Chamar a Gemini API (`gemini-2.0-flash`) diretamente do React, sem passar pelo Xano.
- Buscar dados do usuário (disciplinas e tarefas) do Xano para compor o contexto do prompt.
- Exibir os insights gerados em tempo real em `AIInsights.jsx`.
- Persistir os insights gerados no Xano via `POST /ai_insights`.

---

## 4. Não‑Objetivos

- **Não** modificar endpoints existentes do Xano.
- **Não** remover a listagem/exclusão de insights já salvos.
- **Não** usar streaming; usaremos a resposta completa da API.
- **Não** remover o endpoint antigo `generateAIInsights` em `api.js` (manter como fallback).

---

## 5. Decisões de Design

### 5.1 Segurança da API Key
A Gemini API Key **não deve** ser commitada no repositório.
Usar variável de ambiente via Vite (`VITE_GEMINI_API_KEY` em `.env.local`, ignorado pelo `.gitignore`).

> ⚠️ Limitação: em SPAs a key fica no bundle; para produção recomenda‑se usar um proxy backend. Para dev/propósitos acadêmicos, `.env.local` é aceitável.

### 5.2 Modelo e SDK
Usar o **Google Generative AI SDK** (`@google/generative-ai`) — já instalado.

### 5.3 Contexto do Prompt
`geminiService.js` já implementa montagem de contexto, prompt estruturado para 3 insights em JSON e parsing robusto.

### 5.4 Persistência
Após geração, o frontend fará `POST /ai_insights` por insight via `api.js` para manter histórico.

---

## 6. Impacto e Riscos

| Risco | Probabilidade | Mitigação |
|---|---|---|
| API Key exposta no bundle | Alta (produção) | Documentar limitação; usar proxy em produção |
| CORS bloqueando Gemini API | Baixa | API do Google permite chamadas de browser |
| Custo de tokens | Baixa | Usar `gemini-2.0-flash` eficiente |
| Prompt mal formatado | Média | Validar JSON antes de persistir |

---

## 7. Arquivos Afetados

| Arquivo | Ação | Status |
|---|---|---|
| `frontend/.env.local` | Variável de ambiente | ✅ Pronto |
| `frontend/package.json` | Dependência `@google/generative-ai` | ✅ Pronto |
| `frontend/src/services/geminiService.js` | Serviço Gemini | ✅ Pronto |
| `frontend/src/api.js` | [MODIFICAR] Adicionar `saveAIInsight()` | ❌ Pendente |
| `frontend/src/components/dashboard/AIInsights.jsx` | [MODIFICAR] Usar Gemini direto | ❌ Pendente |

---

## 8. Referências

- https://ai.google.dev/docs
- https://www.npmjs.com/package/@google/generative-ai
- https://vitejs.dev/guide/env-and-mode
