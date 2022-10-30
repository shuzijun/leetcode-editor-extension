import CryptoJS from 'crypto-js'
import {matchingType} from "~network";

console.log("HELLO WORLD")

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === 'get-user-data') {
        chrome.cookies.getAll({domain: sender.origin.replace("https://", "")}).then((cookies) => {
            const cookieString = cookies.map(c => c.name + "=" + c.value).join(';');
            console.log(cookieString);
            const encodedWord = CryptoJS.enc.Utf8.parse(cookieString);
            const encoded = CryptoJS.enc.Base64.stringify(encodedWord);
            sendResponse(encoded);
        });
    }
    return true
});


let filter:chrome.webRequest.RequestFilter = { urls: ['https://leetcode.cn/*','https://leetcode.com/*'],types: ["xmlhttprequest"] }
let extraInfoSpec = ['requestBody','extraHeaders']

chrome.webRequest.onBeforeRequest.addListener(function(details){
    let postedString = ""
    if (details.method === "POST"){
        postedString = decodeURIComponent(String.fromCharCode.apply(null, new Uint8Array(details.requestBody.raw[0].bytes)))
    }
    console.log(details)
    let message = matchingType(details,postedString)
    if (message){
        sendTabMessage(message)
    }
}, filter, extraInfoSpec)

function sendTabMessage(message) {
    if (message.retry>6){
        return
    }
    chrome.tabs.sendMessage(message.tabId,message,function(res) {
        if(!(res && res.status)) {
            message.retry = message.retry + 1
            setTimeout(sendTabMessage, 3000,message);
        }
    })
}