## Requisitos ADICIONADOS

### Requisito: Integração Direta com Gemini no Frontend
O sistema DEVE permitir que o frontend consulte a Gemini API diretamente para gerar insights educacionais, utilizando os dados de disciplinas e tarefas do usuário.

#### Cenário: Geração direta de insights com sucesso
- **QUANDO** o usuário solicitar a geração de insights no painel
- **ENTÃO** o frontend DEVE buscar as disciplinas e tarefas ativas do usuário no Xano.
- **E** o frontend DEVE formular o prompt adequado e chamar a API do Gemini.
- **E** o frontend DEVE analisar a resposta recebida, que deve conter uma lista de 3 insights em formato de strings.
- **E** o frontend DEVE salvar individualmente cada insight gerado no Xano via requisição `POST`.
- **E** o frontend DEVE recarregar a lista de insights exibida na interface para refletir as novas inserções.
