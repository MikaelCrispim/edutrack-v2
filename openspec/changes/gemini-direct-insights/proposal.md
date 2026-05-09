# Proposal: Integração Direta com Gemini API no Frontend

**ID:** gemini-direct-insights  
**Status:** em andamento (parcialmente implementado)  
**Data:** 2026-05-09  
**Autor:** Mikael Crispim  
**Revisor:** Antigravity (IA)  
**Atualizado:** 2026-05-09

---

## 1. Contexto e Motivação

Atualmente, o fluxo de geração de insights segue o caminho:

```
Web (React) → Xano (POST /generate_insights) → Gemini API
```

Esse fluxo apresenta os seguintes problemas:
- **Latência adicional:** A requisição passa por um intermediário (Xano) desnecessariamente para a geração de insights.
- **Acoplamento:** A lógica de prompt e formatação de resposta da IA fica "escondida" no backend, dificultando iterações rápidas.
- **Custo de manutenção:** Qualquer mudança no prompt exige deploy no Xano.

A proposta é mover a chamada para a Gemini API **diretamente para o frontend React**, deixando o Xano responsável apenas pelo que faz melhor: persistir e servir dados estruturados (subjects, tasks, insights).

Novo fluxo proposto:
```
Web (React) → Xano API (busca subjects + tasks)      ← dados do aluno
Web (React) → Gemini API (gera insights com os dados) ← chamada direta
Web (React) → Xano API (persiste os insights gerados) ← salva resultados
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

- Fazer a chamada à Gemini API (`gemini-2.0-flash`) diretamente do React, sem passar pelo Xano.
- Buscar os dados do aluno (disciplinas e tarefas) do Xano para montar o contexto do prompt.
- Exibir os insights gerados em tempo real no componente `AIInsights.jsx`.
- Persistir os insights gerados no Xano via `POST /ai_insights` para manter histórico.

---

## 4. Não-Objetivos

- **Não** modificar nenhum endpoint existente do Xano.
- **Não** remover a funcionalidade de listagem e delete de insights já salvos.
- **Não** usar streaming de resposta (utilizaremos a resposta completa da API).
- **Não** remover o endpoint antigo `generateAIInsights` do `api.js` (manter como fallback).

---

## 5. Decisões de Design

### 5.1 Segurança da API Key
A Gemini API Key **não deve ser exposta** no código-fonte commitado.  
Solução: variável de ambiente via Vite (`VITE_GEMINI_API_KEY` em arquivo `.env.local`, ignorado pelo `.gitignore`).

> ⚠️ **Limitação conhecida:** Em aplicações frontend puras (SPA), a API Key fica visível no bundle JS do browser. Para produção real, recomenda-se um proxy backend (Xano ou serverless function) como camada de segurança. Para fins acadêmicos/desenvolvimento, o uso direto com `.env` é aceitável.

### 5.2 Modelo e SDK
Utilizar o **Google Generative AI SDK** (`@google/generative-ai`) via `npm` — já instalado (v0.24.1).

### 5.3 Contexto do Prompt
O `geminiService.js` já implementa:
- Montagem do contexto com disciplinas, carga horária, tarefas, progresso e prazos.
- Prompt estruturado pedindo 3 insights em formato JSON.
- Parsing robusto do retorno com fallbacks.

### 5.4 Persistência
Após gerar os insights, o componente faz um `POST /ai_insights` para cada insight via `api.js`, mantendo o histórico no Xano.

---

## 6. Impacto e Riscos

| Risco | Probabilidade | Mitigação |
|---|---|---|
| API Key exposta no bundle | Alta (em produção) | Documentar limitação; usar `.env.local` em dev |
| CORS bloqueando Gemini API | Baixa | A API do Google permite chamadas de browser |
| Custo de tokens da API | Baixa | Modelo `gemini-2.0-flash` é eficiente e barato |
| Prompt mal formatado | Média | Validar retorno JSON antes de persistir |

---

## 7. Arquivos Afetados

| Arquivo | Ação | Status |
|---|---|---|
| `frontend/.env.local` | Variável de ambiente com a API Key | ✅ Pronto |
| `frontend/package.json` | Dependência `@google/generative-ai` | ✅ Pronto |
| `frontend/src/services/geminiService.js` | Serviço de chamada ao Gemini | ✅ Pronto |
| `frontend/src/api.js` | [MODIFICAR] Adicionar `saveAIInsight()` | ❌ Pendente |
| `frontend/src/components/dashboard/AIInsights.jsx` | [MODIFICAR] Usar Gemini direto | ❌ Pendente |

---

## 8. Referências

- [Gemini API Docs - Google AI Studio](https://ai.google.dev/docs)
- [Google Generative AI JS SDK](https://www.npmjs.com/package/@google/generative-ai)
- [Vite Env Variables](https://vitejs.dev/guide/env-and-mode)
