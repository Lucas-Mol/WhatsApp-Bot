const { ipcRenderer } = require('electron');

var config = readJson('./config.json');

const headerDescription = document.querySelector('.header p');
const chatBalloon = document.querySelector('.chat-ballon');

const mainForm = document.querySelector("form[name=mainForm]");

const contactName = document.querySelector('#contact-name-input');
const messageOrFileCheckbox = document.querySelector("#message-or-file-checkbox");
const messageOrFileLabel = document.querySelector("#message-or-file-label");
const amountOfMessageInput = document.querySelector("#amount-of-message-input");
const messageInput = document.querySelector("#message-input");
const delayInput = document.querySelector("#delay-input");

const messageSection = document.querySelector('.message-section');
const fileSection = document.querySelector('.file-section');

const fileLabel = document.querySelector('#file-label');
const fileTextAreaInput = document.querySelector('#file-text-area-input')

var submitJsonContent = {};
var submitTextContent = '';

startWindow();

async function startWindow() {
    configPath = './config.json';
    config = await readJson(configPath);
    
    contactName.value = config.CONTACT;
    delayInput.value = config.DELAY_TO_SEND;
    messageOrFileCheckbox.checked = config.MESSAGE_OR_FILE;
    amountOfMessageInput.value = config.AMOUNT_OF_MESSAGES;
    messageInput.value = config.MESSAGE;
    
    fileLabel.innerHTML += config.FILE_PATH;
    fileTextAreaInput.value = await readTextFile(config.FILE_PATH);

    const mapSentenceBalloon = randomizeSentence();
    headerDescription.innerHTML = (config.FIRST_RUN) ? 'Hi, I\'m WhatsApp Bot, Welcome!' : mapSentenceBalloon.sentence;
    chatBalloon.style.width = (config.FIRST_RUN) ? '272px' : mapSentenceBalloon.balloon;

    verifySectionRules();
};

mainForm.addEventListener('submit', (event) => {
    submitJsonContent = {
        CONTACT: contactName.value,
        MESSAGE_OR_FILE: messageOrFileCheckbox.checked,
        AMOUNT_OF_MESSAGES: amountOfMessageInput.value,
        MESSAGE: messageInput.value,
        DELAY_TO_SEND: delayInput.value,
        FILE_PATH: config.FILE_PATH,
        BROWSER_PATH: config.BROWSER_PATH,
        USER_DATA_PATH: config.USER_DATA_PATH,
        FIRST_RUN: false
    }

    submitTextContent = fileTextAreaInput.value;

    ipcRenderer.send('renderer/submit', submitJsonContent, submitTextContent);

    event.preventDefault();
}, config);

ipcRenderer.on('main/submit', (event, message) => {
    if(message.status === 200)
        showLoading();
        ipcRenderer.send('renderer/executeBot', null);
    if(message.status === 400)
        alert('Error 400: ' + message.message)
});

ipcRenderer.on('main/executeBotError', (event, message) => {
    alert('Error ' + message.status + ': ' + message.message);
    hideLoading();
});

ipcRenderer.on('main/browserClosed', (arg) => {
    if(arg) {
        hideLoading();
    }
});

messageOrFileCheckbox.addEventListener('change', () => {   
    verifySectionRules();
});

function verifySectionRules() {
    messageOrFileLabel.innerHTML = (messageOrFileCheckbox.checked) ? 'File' : 'Message';
    fileTextAreaInput.required = (messageOrFileCheckbox.checked) ? true : false ;
    amountOfMessageInput.required = (messageOrFileCheckbox.checked) ? false : true ;
    messageInput.required = (messageOrFileCheckbox.checked) ? false : true ;
    messageSection.style.display = (messageOrFileCheckbox.checked) ? 'none' : 'block';
    fileSection.style.display = (messageOrFileCheckbox.checked) ? 'block' : 'none';
}

async function readJson(path) {
    let result = await fetch(path)
    .then((res) => res.json())
    .then((data) => data);
    
    return await result;
};

async function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
            if(rawFile.status === 200 || rawFile.status == 0){}
                return rawFile.responseText;
    }
    rawFile.send(null);
    return await rawFile.responseText;
}

function showLoading() {
    const loader = document.querySelector('.loader');
    const inputs = [] = document.querySelectorAll('input, textarea');

    inputs.forEach(i => i.disabled = true);

    headerDescription.innerHTML = 'Sending...'
    chatBalloon.style.width = '100px';
    headerDescription.style.opacity = '0.2';
    chatBalloon.style.opacity = '0.2';
    loader.style.display = 'block';
}

function hideLoading() {
    ipcRenderer.send('renderer/restartWindow', null);
}

function randomizeSentence() {
    let mapSentenceBalloons = [];

    mapSentenceBalloons.push({sentence: 'Hey, you\'re back!', balloon: '160px'});
    mapSentenceBalloons.push({sentence: 'Oh you again?!', balloon: '135px'});
    mapSentenceBalloons.push({sentence: 'I think I\'ve seen you before... somewhere', balloon: '333px'});
    mapSentenceBalloons.push({sentence: 'Let\'s try with another friends?', balloon: '250px'});

    return mapSentenceBalloons[Math.floor(Math.random() * mapSentenceBalloons.length)];
}