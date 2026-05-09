# EduTrack AI - Assistente Educacional Personalizado

**Versão:** 2.0  
**Status:** Em Desenvolvimento  
**Tecnologias:** React + Vite + Tailwind CSS + Xano + OpenSpec  

---

## 1. Visão Geral do Projeto
O **EduTrack AI** é uma aplicação web inteligente projetada para ajudar estudantes de cursos técnicos e superiores a gerenciarem seu progresso acadêmico. O sistema resolve o problema de sobrecarga de informações ao centralizar disciplinas, tarefas e fornecer insights baseados em dados.

Diferente de gerenciadores de tarefas comuns, o EduTrack AI utiliza **Spec-Driven Development (OpenSpec)** para guiar a implementação de funcionalidades complexas e lógica de IA.

### O que compõe este ecossistema:
*   **Web App (Frontend):** Desenvolvido com React 19, Vite e Tailwind CSS, oferecendo uma interface rápida, moderna e responsiva.
*   **Backend Inteligente (Xano):** Uma infraestrutura robusta que utiliza XanoScript para schemas programáticos e integração de lógica customizada.
*   **Documentação Viva (OpenSpec):** Todo o desenvolvimento é guiado por especificações técnicas que servem de "ponte" entre o arquiteto (estudante) e a IA.

---

## 2. Tecnologias Utilizadas

### Frontend
*   **React 19:** Biblioteca principal para a interface.
*   **Vite:** Build tool de última geração para alta performance no desenvolvimento.
*   **Tailwind CSS 4:** Framework utilitário para design moderno e responsivo.
*   **React Router Dom:** Gerenciamento de rotas da aplicação.
*   **Axios:** Consumo de APIs do backend.

### Backend & Lógica
*   **Xano:** Plataforma No-Code/Low-Code para o banco de dados e APIs.
*   **XanoScript:** Para automação e lógica de schemas.
*   **Python (via OpenSpec):** Utilizado para cálculos complexos de métricas e geração de relatórios.
*   **OpenSpec:** Metodologia de desenvolvimento guiado por especificações.

### Ferramentas de IA & Apoio
*   **IA Principal:** Antigravity / Gemini (Google DeepMind).
*   **Versionamento:** Git & GitHub.
*   **Testes:** Jest & React Testing Library.

---

## 3. Estrutura do Projeto

```text
/
├── frontend/             # Aplicação React (Vite + Tailwind)
├── apis/                 # Definições de API do Xano
├── functions/            # Funções e lógica de backend
├── tables/               # Definições de tabelas/schemas
├── docs/                 # Guias e especificações técnicas
├── openspec/             # Especificações de mudanças e propostas
└── workflow_tests/       # Documentação de testes de fluxo
