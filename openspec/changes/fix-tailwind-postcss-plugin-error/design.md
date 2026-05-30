## Contexto

A build da aplicação estava falhando devido a uma configuração incorreta do PostCSS para o Tailwind CSS. A configuração atual faz referência a um pacote obsoleto.

## Objetivos / Não‑objetivos

**Objetivos:**
- Corrigir o erro de build atual atualizando a configuração do PostCSS e as dependências.
- Garantir que o processo de compilação do Tailwind CSS funcione corretamente.

**Não‑objetivos:**
- Este design não abrange alterações na UI ou na funcionalidade da aplicação.

## Decisões

1. **Gerenciamento de Dependências:**
   - **Decisão:** Desinstalar o pacote `tailwindcss` antigo e instalar o pacote `@tailwindcss/postcss`, juntamente com a versão compatível mais recente do `tailwindcss`.
   - **Justificativa:** A mensagem de erro indica que o plugin PostCSS foi movido para um pacote separado. Essa mudança garante o uso dos pacotes corretos e suportados oficialmente.

2. **Atualização de Configuração:**
   - **Decisão:** Atualizar o arquivo `postcss.config.js`. O objeto `plugins` será alterado para usar `'tailwindcss'` como chave, que o runner do PostCSS resolverá automaticamente para o pacote correto.
   - **Justificativa:** Esta é a forma padrão de configurar plugins do PostCSS e resolverá o erro de build.

## Riscos / Compensações

- **Risco:** Não existem riscos significativos associados a esta alteração, pois trata‑se de uma atualização padrão de dependência e configuração para corrigir um problema conhecido.
- **Compensação:** Nenhuma. A alteração é necessária para que a aplicação seja buildada.
