import puppeteer from 'puppeteer';
import fs from 'fs';
import config from './config.js'

const browserPath = config.BROWSER_PATH;
const userData = config.USER_DATA_PATH;
const contactName = config.CONTACT;
const amountOfMessages = config.AMOUNT_OF_MESSAGES;
const message = config.MESSAGE;
const textLines = fs.readFileSync(config.FILE_PATH).toString().split('\r' || '\n');
const delayToSend = config.DELAY_TO_SEND
const messageOrFile = config.MESSAGE_OR_FILE;
const url = 'https://web.whatsapp.com';

(async function main (){
    try {
        
        //configure browser and page
        const browser = await puppeteer.launch({ headless: false,
            executablePath: browserPath,
            userDataDir: userData})
        const page = await browser.newPage()
        await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36')
        
        //redirect to whatsapp page
        await page.goto(url)
        
        /**
         *  wait for div with span that has the contact names to proceed 
         *  (IMPORTANT: Class Name may eventually be changed by WhatsApp updates,
         *  if it does, use your Favorite Browser Dev Kit to inspect the new one)
         */
        await page.waitForSelector('.zoWT4')
        await delay(5000)
        
        /**
         *  click on contact and wait for div with input text to proceed 
         *  (IMPORTANT: Class Name may eventually be changed by WhatsApp updates,
         *  if it does, use your Favorite Browser Dev Kit to inspect the new one)
         */
        await page.click(`span[title='${contactName}']`)
        await page.waitForSelector('.g0rxnol2')
        
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

    } catch (e) {
        console.error("error mine", e)
    }
})()

function delay(time) {
    return new Promise(function (resolve){
        setTimeout(resolve, time);
    })
}