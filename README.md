# WhatsApp Bot

O WhatsApp Bot é um projeto simples de Bot para mandar mensagens repetidas ou um script de texto para seus amigos no WhatsApp.

## Intro

O Projeto foi feito para me aventurar no mundo de criações de Bots e no intuito de distração, embora em algum caso específico possa ser útil para automatizar algum processo.

Também acabou servindo como prática de criação de projetos do zero com Node.JS.

## Como configurar sua experiência?

O WhatsApp Bot foi projetado para configurar toda suas funcionalidades em um único lugar (**config.js**)

Segue a tabela das configurações permitidas pelo Bot:

| Variáveis | Tipo | Descrição | Observações | 
| :---: | :---: | :---: | :---: |
| CONTACT | String | O nome do Contato | Evite nomes com Emoticons<br/>(se necessário, inspecione<br/>o elemento e copie como está no HTML) |
| MESSAGE_OR_FILE | Boolean | Se 'false' irá enviar repetição da mensagem<br/>Se 'true' irá enviar linha por linha do texto | --- | 
| AMOUNT_OF_MESSAGES | Number | Número de Mensagens que serão enviadas | Aplicará **somente** quando MESSAGE_OR_FILE<br/>estiver 'false' |
| MESSAGE | String | Mensagem que será enviada | Aplicará  **somente** quando MESSAGE_OR_FILE<br/>estiver 'false' |
| FILE_PATH | String | O caminho do arquivo .txt (deve haver<br/>quebras de linha para enviar em diferentes mensagens) | **Recomendo** usar o arquivo já existente<br/> e só alterar o seu conteúdo |
| DELAY_TO_SEND | Number | Tamanho do Delay entre as mensagens em 'ms' | Será aplicado a todos os casos |
| BROWSER_PATH | String | O caminho do executável do seu Browser Favorito | **Default** está o caminho onde a maioria dos Chrome estão no SO Windows |
| USER_DATA_PATH | String | O caminho da pasta de cookies do seu Browser | **Default** está o caminho onde a maioria dos cookies de Chrome estão no SO Windows. |


As configurações acima devem ser feitas antes da execução do código no arquivo **config.js**.

**OBS:** As configurações AMOUNT_OF_MESSAGES e MESSAGE só se aplicarão quando MESSAGE_OR_FILE for 'false', enquanto FILE_PATH só se aplicará quando MESSAGE_OR_FILE for 'true', as demais configurações serão apicadas a todos cenários.

**OBS²:** USER_DATA_PATH é importante para o código conseguir ter acesso a sua Autorização de Login no WhatsApp, se estiver errado pedirá para logar todas as vezes que rodar o WhatsApp Bot.

## Como rodar o projeto?

Execute os 2 seguintes códigos no terminal dentro da pasta do Projeto:

```
npm install 
node index.js
```

**OBS:** É possível que na primeira execução, devido a demora ao logar (variando da sua velocidade de internet), o browser aberto fique parado na tela inicial.
Se acontecer, execute-o novamente.

## Tecnologias Utilizadas

Node.JS

Puppeteer
