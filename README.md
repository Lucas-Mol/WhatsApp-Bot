# WhatsApp Bot

WhatsApp Bot is a simple bot project to send repeated messages or a entire text script to your friends on WhatsApp.

**Version 2.0:** WhatsApp version 2.0 received a Graphic Interface, allowing Users with no coding expertise interact to.

## Intro

I made this project to enjoy into the world of Bot's creations and to have fun, although in some specific cases it can be useful to automate some process.

It also ended up being a good practice of build a project from scratch with Node.JS (and using Electron JS too).

**OBS:** The WhatsAppBot changes his sentences randomly after each completed run (After complete the job, 
make sure to close the browser)

## Overview

![Home](https://cdn.discordapp.com/attachments/778788148921761822/1028061901801918544/unknown.png)

![Bot Sentences](https://cdn.discordapp.com/attachments/778788148921761822/1028063154304978954/unknown.png)

![Loading](https://cdn.discordapp.com/attachments/778788148921761822/1028061994609279076/unknown.png)

![WhatsApp Access](https://cdn.discordapp.com/attachments/778788148921761822/1028062421358747678/unknown.png)

## How to run the project?

**Require:** **Node** installed

Run the following 2 codes in the terminal inside the Project folder:

```
npm install 
node index.js
```

**OR**

If you're in Windows, just open the **whatsappbot.bat**
## Config.json documentation

WhatsApp Bot save your last submit in **config.json**

I **do not** recommend to manually write this file, except to resolve the Error:
<br/><br/>
```Failed to launch the browser process! spawn C:\Program Files\Google\Chrome\Application\chrome.exe ENOENT```
Variables      |  Type   |                                            Description                                            |                                            Observations                                             |
| :----------------: | :-----: | :---------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------: |
|      CONTACT       | String  |                                        The Contact name                                        | Avoid names with emoticons<br/>(if you do,<br/> inspect the HTML element and copy it) |
|  MESSAGE_OR_FILE   | Boolean |  If 'false' it will send the repeated message<br/>If 'true'  it will send line by line of text file  |                                                ---                                                 |
| AMOUNT_OF_MESSAGES | Number  |                             The amout of messages you wish to send repeatedly                              |                  **Just** aplly when MESSAGE_OR_FILE<br/>is 'false'                   |
|      MESSAGE       | String  |                                    The Message you wish to send                                    |                  **Just**  apply when MESSAGE_OR_FILE<br/>is 'false'                  |
|     FILE_PATH      | String  | The '.txt' file path (it must have<br/>break lines to break message on different parts) |             **Recommended:** keep the existing file<br/> and just change its content             |
|   DELAY_TO_SEND    | Number  |                           The delay between messages in 'ms'                            |                                   Apply in **all** cases                                   |
|    BROWSER_PATH    | String  |                         Your Favorite Browser path                         |              **Default:** Chrome path on most of Windows PCs              |
|   USER_DATA_PATH   | String  |                          Your Favorite Browser's cookies path                          |        **Default:** Chrome's Cookies path on most of Windows PCs.        |
|   FIRST_RUN   | Boolean  |                          Indicate to bot the first run when you open the App                          |         ---       |

If you're facing this **Error:**
<br/><br/>
```Failed to launch the browser process! spawn C:\Program Files\Google\Chrome\Application\chrome.exe ENOENT```

Change manually your BROWSER_PATH in config.json to your favorite browser.exe path

## Tech Stack

Node.JS

Electron JS

Puppeteer
