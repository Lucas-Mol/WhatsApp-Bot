const { app, BrowserWindow, ipcMain} = require('electron');
const { writeFile, readFileSync } = require('fs');

const config = JSON.parse(readFileSync(`.\\config.json`));

setConfigToStart();

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 700,
        height: 700,
        resizable: false,
        autoHideMenuBar: true,
        title: 'WhatsApp Bot',
        icon: './images/bot-icon.png',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadURL(`file://${__dirname}/home.html`);
});

ipcMain.on('renderer/submit', (event, submitJsonContent, submitTextContent) => {
    try{
        writeFile('./config.json', JSON.stringify(submitJsonContent), 'utf-8', (err, result) => {
            if(!err || !result)
                console.log('config.json written')
            else
                console.log('Error: ' + err + '; Result: ' + result);
        });

        writeFile(config.FILE_PATH, submitTextContent, 'utf-8', (err, result) => {
            if(!err || !result)
                console.log(config.FILE_PATH + ' written')
            else
                console.log('Error: ' + err + '; Result: ' + result);
        });
    
        event.reply('main/submit', { status: 200 });
    } catch (err) {
        event.reply('main/submit', {status: 400, message: err})
    }
});

ipcMain.on('renderer/executeBot', async (event, arg) => {
    try {

        await mainPuppeteer();

    } catch (err) {
        if(err.message.endsWith('exceeded')) {
            err = 'Waiting failed: 30000ms exceeded \r\n' + 
            'Perhaps caused by a delay to access main Whatsapp Page';
        }
        else if(err.message.endsWith('closed.')) {
            err = 'Browser closed unexpectedly'
        }
        event.reply('main/executeBotError', {status: 400, message: err})
    }
});

ipcMain.on('renderer/restartWindow', async () => {
    mainWindow.reload();

    // Horrible solution to a bug that disable inputs editing
    mainWindow.webContents.openDevTools({mode: 'right'});
    await delay(280);
    mainWindow.webContents.closeDevTools();
});

/*
=============================================
*/


async function mainPuppeteer() {
    const puppeteer = require('puppeteer');

    const config = JSON.parse(readFileSync(`.\\config.json`));
        
        const browserPath = config.BROWSER_PATH;
        const userData = config.USER_DATA_PATH;
        const contactName = config.CONTACT;
        const amountOfMessages = config.AMOUNT_OF_MESSAGES;
        const message = config.MESSAGE;
        const textLines = [] = readFileSync(config.FILE_PATH).toString().split('\n');
        const delayToSend = config.DELAY_TO_SEND
        const messageOrFile = config.MESSAGE_OR_FILE;
        const whatsappUrl = 'https://web.whatsapp.com';  
    
    const browser = await puppeteer.launch({ headless: false,
        executablePath: browserPath,
        userDataDir: userData,
        args: [`--window-size=820,720`]});

    try {
        
        
        //configure browser and page
        const page = (await browser.pages())[0];
        await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
        
        //redirect to whatsapp page
        await page.goto(whatsappUrl)
        
        /**
         *  wait for div with span that has the contact names to proceed 
         *  (IMPORTANT: Class Name may eventually be changed by WhatsApp updates,
         *  if it does, use your Favorite Browser Dev Kit to inspect the new one)
         */
        await page.waitForSelector('.zoWT4', { timeout: 0})
        
        /**
         *  click on contact and wait for div with input text to proceed 
         *  (IMPORTANT: Class Name may eventually be changed by WhatsApp updates,
         *  if it does, use your Favorite Browser Dev Kit to inspect the new one)
         */
        await page.waitForSelector(`span[title='${contactName}']`, { timeout: 0})
        await page.click(`span[title='${contactName}']`)
        await page.waitForSelector('.g0rxnol2', { timeout: 0})
        
        //focus on input text
        const textEditor = await page.$("div[tabindex='-1']")
        await textEditor.focus()
        
        /**
         * if it has been set config.MESSAGE_OR_FILE as true it will send line by line of config.FILE_PATH,
         * otherwise it will just spam of config.MESSAGE
         */
        if(messageOrFile) {
            for (let i = 0; i < textLines.length; i++) {
                await page.evaluate((textLines = [], i) => {
                    const message = textLines[i]
                    document.execCommand('insertText', false, message)
                }, textLines, i)
                await delay(200)
                await page.click(`span[data-testid='send']`)
                await delay(delayToSend)
            }
        } else {
            for(let i = 0; i < amountOfMessages; i++) {
                await page.evaluate((message) => {
                    document.execCommand('insertText', false, message)
                }, message)
                await delay(200)
                await page.click(`span[data-testid='send']`)
                await delay(delayToSend)
            }
        }

        await browser.on('disconnected', () => {mainWindow.reload()});

    } catch (err) {
        browser.close();    
        console.error("Error :", err);
        throw err;
    } 
}

function delay(time) {
    return new Promise(function (resolve){
        setTimeout(resolve, time);
    })
}


function setConfigToStart() {
    config.FIRST_RUN = true;

    writeFile('./config.json', JSON.stringify(config), 'utf-8', (err, result) => {
        if(!err || !result)
            console.log('config.json (started pack) written')
        else
            console.log('Error: ' + err + '; Result: ' + result);
    });

    
}