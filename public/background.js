import { TOTP } from './lib/otpauth.esm.min.js';

chrome.commands.onCommand.addListener((command) => {
    if (command === 'insert-text') {
        insertText();
    }
});

function insertText() {
    chrome.storage.sync.get(['config'], (result) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            try {
                const parsedConfig = JSON.parse(result['config']);
                const matches = parsedConfig.filter((item) => {
                    const { url } = tabs[0];
                    return item['auto-fill'].some((host) => doesHostMatch(url, host));
                });
                matches.sort((m1, m2) => new Date(m1.lastUsed).compare(new Date(m2.lastUsed)));
                const token = getToken(matches[0].secret);
                chrome.tabs.sendMessage(tabs[0].id, token);
            } catch(err) {
                console.error(err);
            }
        });
    });
}

function doesHostMatch(url, expectedHost) {
    const exp = /^(?:https?:\/\/)?([^\/?\n]+)/;
    const [, actualHost] = exp.exec(url);
    return expectedHost === actualHost;
}

function getToken(secret) {
    const totp = new TOTP({ secret });
    return totp.generate();
}
