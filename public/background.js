importScripts('./lib/otpauth.umd.min.js');

function getToken(secret) {
    const totp = new OTPAuth.TOTP({ secret });
    return totp.generate();
}

function insertText() {
    chrome.storage.sync.get(['config'], (result) => {
        try {
            const parsedConfig = JSON.parse(result['config']);
            const token = getToken(parsedConfig[0].secret);
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, token);
            });
        } catch(err) {
            console.error(err);
        }
    });
}

chrome.commands.onCommand.addListener((command) => {
    if (command === 'insert-text') {
        insertText();
    }
});
