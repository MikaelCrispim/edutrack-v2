## Contexto

Este documento descreve o design técnico para implementar a aplicação EduTrack AI, conforme definido em `proposal.md`. O projeto prevê uma aplicação híbrida web/móvel usando React/React Native no frontend e Xano como backend. Lógica de negócio mais complexa será implementada em serviços Node.js separados quando necessário.

Todo o processo de desenvolvimento seguirá os princípios de Spec-Driven Development usando OpenSpec e respeitará o fluxo de trabalho baseado em agentes detalhado em `docs/xanoscript-dev-guide.md`. O agente orquestrador planejará e delegará implementações XanoScript para agentes especializados.

## Objetivos / Não‑Objetivos

**Objetivos:**
- Definir a arquitetura de alto nível para o MVP EduTrack AI.
- Esclarecer o papel de cada componente tecnológico (React, Xano, Node.js).
- Estabelecer o processo de desenvolvimento, incluindo a entrega de tarefas para agentes especializados na parte Xano.
- Fornecer uma base técnica clara para as tarefas de implementação.

**Não‑Objetivos:**
- Este design não abrange funcionalidades além do MVP definido, como recursos avançados de IA ou geração de PDFs.
- Não inclui especificações detalhadas de UI/UX, que serão baseadas em templates Figma existentes.
- Não detalha a implementação exata de cada função ou endpoint; isso será especificado em `tasks.md` e nas etapas subsequentes.

## Decisões

1. **Plataforma de Backend:**
     - **Decisão:** Usar Xano como backend principal para autenticação, esquema de banco e APIs CRUD.
     - **Justificativa:** Xano permite desenvolvimento rápido de serviços backend comuns. O `xanoscript-dev-guide.md` fornece um fluxo de trabalho claro para implementar no Xano usando agentes especializados.

2. **Lógica de Negócio Customizada:**
     - **Decisão:** Implementar lógica complexa (ex.: cálculos de progresso ponderado) em serviços Node.js separados.
     - **Justificativa:** Node.js oferece flexibilidade e um ecossistema mais amplo para tarefas computacionais que não são ideais para execução direta no Xano.

3. **Framework de Frontend:**
     - **Decisão:** Desenvolver a aplicação cliente com React/React Native.
     - **Justificativa:** Permite um único codebase servir web e mobile, aumentando a eficiência conforme os requisitos do projeto.

4. **Fluxo de Trabalho de Desenvolvimento:**
     - **Decisão:** Seguir estritamente o fluxo de trabalho baseado em agentes descrito em `docs/xanoscript-dev-guide.md`.
     - **Justificativa:** Assegura separação de responsabilidades e usa agentes especialistas para cada parte do backend Xano (tabelas, APIs, funções). O orquestrador planeja e delega, sem implementar diretamente.

## Riscos / Compensações

- **Risco:** O fluxo distribuído baseado em agentes pode ser complexo de coordenar.
    - **Mitigação:** `tasks.md` conterá um plano detalhado com instruções claras e resultados esperados para cada tarefa delegada; cada etapa será verificada.

- **Risco:** Inconsistências potenciais entre frontend e contrato de API do backend Xano.
    - **Mitigação:** O desenvolvimento do frontend começará apenas após as APIs do backend serem definidas e suas especificações serem obtidas. A regra do `Xano Frontend Developer` de sempre usar `get_xano_api_specifications` será aplicada.
