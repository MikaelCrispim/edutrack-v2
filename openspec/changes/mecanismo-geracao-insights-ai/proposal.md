## Por quê

A implementação atual de AI Insights não possui um mecanismo claro para gerar e popular os insights. Esta proposta descreve uma estratégia concreta de como a IA irá analisar os dados do usuário e por que armazenar esses insights em uma tabela dedicada é necessário e eficiente.

## O que mudar

- Uma explicação detalhada de por que a tabela `ai_insights` é benéfica para desempenho, custo e experiência do usuário.
- Uma nova função no Xano, baseada em trigger, será desenhada para gerar os insights.
- A nova função irá coletar dados do usuário, construir um prompt para o serviço de IA e armazenar os insights gerados na tabela `ai_insights`.

## Capacidades

### Novas Capacidades

- `ai-insight-generation`: Capacidade de backend que analisa o progresso acadêmico do usuário, interage com um serviço de IA para gerar recomendações personalizadas e armazena os resultados.

### Capacidades Modificadas

- Nenhuma

## Impacto

- **Backend**: Será necessário criar uma nova função no Xano — o núcleo da lógica de geração de insights.
- **Serviços Externos**: Requererá uma chave de API e integração com um serviço de IA (por exemplo, OpenAI).
- **Banco de Dados**: A tabela `ai_insights` será utilizada ativamente. Podemos também considerar adicionar um campo em `users` (ex.: `last_insight_generated_at`) para controlar a frequência de geração.
