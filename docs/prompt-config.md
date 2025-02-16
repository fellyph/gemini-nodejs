# GenerationConfig

Opções de configuração para geração de modelo e saídas. Nem todos os parâmetros são configuráveis para cada modelo.

## Campos

### `stopSequences[]`

`string`

Opcional. O conjunto de sequências de caracteres (até 5) que interromperão a geração da saída. Se especificado, a API irá parar na primeira aparição de uma `stop_sequence`. A sequência de parada não será incluída como parte da resposta.

### `responseMimeType`

`string`

Opcional. Tipo MIME do texto candidato gerado. Os tipos MIME suportados são:

- `text/plain`: (padrão) Saída de texto.
- `application/json`: Resposta JSON nos candidatos de resposta.
- `text/x.enum`:ENUM como string de resposta.
  Consulte a documentação para obter uma lista de todos os tipos MIME de texto suportados.

### `responseSchema`

`object (Schema)`

Opcional. Esquema de saída do texto candidato gerado. Os esquemas devem ser um subconjunto do esquema OpenAPI e podem ser objetos, primitivos ou arrays.

Se definido, um `responseMimeType` compatível também deve ser definido. Tipos MIME compatíveis:

- `application/json`: Esquema para resposta JSON. Consulte o guia de geração de texto JSON para obter mais detalhes.

### `responseModalities[]`

`enum (Modality)`

Opcional. As modalidades solicitadas da resposta. Representa o conjunto de modalidades que o modelo pode retornar e deve ser esperado na resposta. Esta é uma correspondência exata com as modalidades da resposta.

Um modelo pode ter várias combinações de modalidades suportadas. Se as modalidades solicitadas não corresponderem a nenhuma das combinações suportadas, um erro será retornado.

Uma lista vazia é equivalente a solicitar apenas texto.

### `candidateCount`

`integer`

Opcional. Número de respostas geradas a serem retornadas.

Atualmente, este valor só pode ser definido como 1. Se não for definido, o padrão será 1.

### `maxOutputTokens`

`integer`

Opcional. O número máximo de tokens a serem incluídos em um candidato de resposta.

Nota: O valor padrão varia de acordo com o modelo, consulte o atributo `Model.output_token_limit` do Modelo retornado da função `getModel`.

### `temperature`

`number`

Opcional. Controla a aleatoriedade da saída.

Nota: O valor padrão varia de acordo com o modelo, consulte o atributo `Model.temperature` do Modelo retornado da função `getModel`.

Os valores podem variar de [0.0, 2.0].

### `topP`

`number`

Opcional. A probabilidade cumulativa máxima de tokens a serem considerados durante a amostragem.

O modelo usa amostragem Top-k e Top-p (núcleo) combinadas.

Os tokens são classificados com base em suas probabilidades atribuídas, de modo que apenas os tokens mais prováveis sejam considerados. A amostragem Top-k limita diretamente o número máximo de tokens a serem considerados, enquanto a amostragem de núcleo limita o número de tokens com base na probabilidade cumulativa.

Nota: O valor padrão varia de acordo com o Modelo e é especificado pelo atributo `Model.top_p` retornado da função `getModel`. Um atributo `topK` vazio indica que o modelo não aplica amostragem top-k e não permite a configuração de `topK` nas solicitações.

### `topK`

`integer`

Opcional. O número máximo de tokens a serem considerados durante a amostragem.

Os modelos Gemini usam amostragem Top-p (núcleo) ou uma combinação de amostragem Top-k e núcleo. A amostragem Top-k considera o conjunto dos `topK` tokens mais prováveis. Os modelos executados com amostragem de núcleo não permitem a configuração de `topK`.

Nota: O valor padrão varia de acordo com o Modelo e é especificado pelo atributo `Model.top_p` retornado da função `getModel`. Um atributo `topK` vazio indica que o modelo não aplica amostragem top-k e não permite a configuração de `topK` nas solicitações.

### `seed`

`integer`

Opcional. Semente usada na decodificação. Se não for definido, a solicitação usa uma semente gerada aleatoriamente.

### `presencePenalty`

`number`

Optional. Penalidade de presença aplicada aos logprobs do próximo token se o token já tiver sido visto na resposta.

Essa penalidade é binária (ligado/desligado) e não depende do número de vezes que o token é usado (após a primeira). Use `frequencyPenalty` para uma penalidade que aumenta a cada uso.

Uma penalidade positiva desencorajará o uso de tokens que já foram usados na resposta, aumentando o vocabulário.

Uma penalidade negativa incentivará o uso de tokens que já foram usados na resposta, diminuindo o vocabulário.

### `frequencyPenalty`

`number`
Optional. Penalidade de frequência aplicada aos logprobs do próximo token, multiplicada pelo número de vezes que cada token foi visto na resposta até o momento.

Uma penalidade positiva desencorajará o uso de tokens que já foram usados, proporcionalmente ao número de vezes que o token foi usado: quanto mais um token é usado, mais difícil é para o modelo usar esse token novamente, aumentando o vocabulário das respostas.

Cuidado: Uma penalidade negativa incentivará o modelo a reutilizar tokens proporcionalmente ao número de vezes que o token foi usado. Pequenos valores negativos reduzirão o vocabulário de uma resposta. Valores negativos maiores farão com que o modelo comece a repetir um token comum até atingir o limite `maxOutputTokens`.

### `responseLogprobs`

`boolean`

Opcional. Se verdadeiro, exporte os resultados de `logprobs` na resposta.

### `logprobs`

`integer`

Opcional. Válido apenas se `responseLogprobs=True`. Isso define o número de principais `logprobs` para retornar.