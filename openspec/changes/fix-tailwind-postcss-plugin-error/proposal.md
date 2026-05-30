## Por que

A aplicação falha ao iniciar devido a um erro de configuração do PostCSS com o Tailwind CSS. A mensagem de erro indica que o plugin PostCSS do Tailwind foi movido para um pacote separado, `@tailwindcss/postcss`. Essa alteração é necessária para corrigir o erro de build e permitir que a aplicação rode.

## O que será alterado

- Instalar o novo pacote `@tailwindcss/postcss`.
- Atualizar o arquivo `postcss.config.js` para referenciar corretamente o novo plugin.
- Atualizar as dependências garantindo a versão compatível do `tailwindcss`.

## Capacidades

### Novas Capacidades
- Nenhuma

### Capacidades Modificadas
- `tailwind-config`: A configuração do Tailwind CSS e do PostCSS será atualizada para usar os pacotes corretos e corrigir o erro de build.

## Impacto

- **Configuração do Projeto:**
  - `package.json`: Será atualizado para garantir as dependências corretas (`@tailwindcss/postcss` e `tailwindcss` na versão compatível).
  - `postcss.config.js`: Será atualizado para utilizar o novo plugin.
