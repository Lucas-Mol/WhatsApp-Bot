# WhatsApp Bot

WhatsApp Bot is a simple bot project to send repeated messages or a entire text script to your friends on WhatsApp.

**Version 2.0:** WhatsApp version 2.0 received a Graphic Interface, allowing to Users interact with no code expertise.

## Intro

I made this project to enjoy into the world of Bot's creations and at intention of avocation, although in some specific cases it can be useful to automate some process.

It also ended up being a good practice of build a project from scratch with Node.JS (and using Electron JS too).

## Overview

![Home](https://cdn.discordapp.com/attachments/778788148921761822/1028061901801918544/unknown.png)

![Bot Sentences](https://cdn.discordapp.com/attachments/778788148921761822/1028063154304978954/unknown.png)

![Loading](https://cdn.discordapp.com/attachments/778788148921761822/1028061994609279076/unknown.png)

![WhatsApp Access](https://cdn.discordapp.com/attachments/778788148921761822/1028062421358747678/unknown.png)

## How to run the project?

Run the following 2 codes in the terminal inside the Project folder:

```
npm install 
node index.js
```

**OR**

If you're in Windows, just open the **whatsappbot.bat**
## Config.json documentation

WhatsApp Bot save your last submit in **config.json**

I **do not** recommend to manually write this file, except ... TODO

|     Variáveis      |  Tipo   |                                            Descrição                                            |                                            Observações                                             |
| :----------------: | :-----: | :---------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------: |
|      CONTACT       | String  |                                        O nome do Contato                                        | Evite nomes com Emoticons<br/>(se necessário, inspecione<br/>o elemento e copie como está no HTML) |
|  MESSAGE_OR_FILE   | Boolean |  Se 'false' irá enviar repetição da mensagem<br/>Se 'true' irá enviar linha por linha do texto  |                                                ---                                                 |
| AMOUNT_OF_MESSAGES | Number  |                             Número de Mensagens que serão enviadas                              |                  Aplicará **somente** quando MESSAGE_OR_FILE<br/>estiver 'false'                   |
|      MESSAGE       | String  |                                    Mensagem que será enviada                                    |                  Aplicará  **somente** quando MESSAGE_OR_FILE<br/>estiver 'false'                  |
|     FILE_PATH      | String  | O caminho do arquivo .txt (deve haver<br/>quebras de linha para enviar em diferentes mensagens) |             **Recomendo** usar o arquivo já existente<br/> e só alterar o seu conteúdo             |
|   DELAY_TO_SEND    | Number  |                           Tamanho do Delay entre as mensagens em 'ms'                           |                                   Será aplicado a todos os casos                                   |
|    BROWSER_PATH    | String  |                         O caminho do executável do seu Browser Favorito                         |              **Default** está o caminho onde a maioria dos Chrome estão no SO Windows              |
|   USER_DATA_PATH   | String  |                          O caminho da pasta de cookies do seu Browser                           |        **Default** está o caminho onde a maioria dos cookies de Chrome estão no SO Windows.        |
|   FIRST_RUN   | Boolean  |                          Indicate to bot the first run                           |                |

## Tecnologias Utilizadas

Node.JS

Electron JS

Puppeteer
