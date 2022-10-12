// imports
const { app, BrowserWindow, ipcMain} = require('electron');
const { writeFile, readFileSync } = require('fs');
const { mainPuppeteer, delay} = require('./PuppeteerController.js');

// exports
module.exports = { reloadWindow }

//read saved configurations in config.json
const config = JSON.parse(readFileSync(`.\\config.json`));

setConfigToStart();

function setConfigToStart() {
    config.FIRST_RUN = true;

    //write FRIST_RUN always as TRUE when start application
    writeFile('./config.json', JSON.stringify(config), 'utf-8', (err, result) => {
        if(!err || !result)
            console.log('config.json (started pack) written')
        else
            console.log('Error: ' + err + '; Result: ' + result);
    });  
}

//declare GUI window
let mainWindow;

//start window with its properties and direct to home page
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

//----------- Request/Respond Functions -----------

//write config.json and transcript.txt when home-script.js submit
ipcMain.on('renderer/submit', (event, submitJsonContent, submitTextContent) => {
    try{
        //write config.json
        writeFile('./config.json', JSON.stringify(submitJsonContent), 'utf-8', (err, result) => {
            if(!err || !result)
                console.log('config.json written')
            else
                console.log('Error: ' + err + '; Result: ' + result);
        });

        //write transcript.txt
        writeFile(config.FILE_PATH, submitTextContent, 'utf-8', (err, result) => {
            if(!err || !result)
                console.log(config.FILE_PATH + ' written')
            else
                console.log('Error: ' + err + '; Result: ' + result);
        });
    
        //reply successfully
        event.reply('main/submit', { status: 200 });
    } catch (err) {
        //reply caught error
        event.reply('main/submit', {status: 400, message: err})
    }
});

//run the Puppeteer bot
ipcMain.on('renderer/executeBot', async (event, arg) => {
    try {

        //Puppeteer main function
        await mainPuppeteer();

    } catch (err) {
        //reword error message when browser is closed unexpectedly (may be caused by user's interaction)
        if(err.message.endsWith('closed.')) {
            err = 'Browser closed unexpectedly'
        }
        event.reply('main/executeBotError', {status: 400, message: err})
    }
});

// reload the window
ipcMain.on('renderer/restartWindow', async () => {
    reloadWindow();

    // Horrible solution to a bug that disable inputs editing
    mainWindow.webContents.openDevTools({mode: 'right'});
    await delay(290);
    mainWindow.webContents.closeDevTools();
});

function reloadWindow() {
    mainWindow.reload();
}