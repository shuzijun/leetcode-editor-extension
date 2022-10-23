import CryptoJS from 'crypto-js'
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
