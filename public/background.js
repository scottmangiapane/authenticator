import { TOTP } from './lib/otpauth.esm.min.js';
import validateConfig from './utils/config-validator.js';
import { get, set } from './utils/storage.js';

// const exampleConfig = '[\n'
// + '  {\n'
// + '    "name": "Example",\n'
// + '    "secret": "JBSWY3DPEHPK3PXP",\n'
// + '    "auto-fill": [\n'
// + '      "example.com"\n'
// + '    ]\n'
// + '  }\n'
// + ']\n';

chrome.commands.onCommand.addListener((command) => {
    if (command === 'insert-token') {
        insertToken();
    }
});

chrome.runtime.onMessage.addListener(({ action, request }, sender, sendResponse) => {
    switch (action) {
        case 'fetch-items':
            fetchItems(request).then((response) => sendResponse(response));
            return true;
        case 'set-config':
            set('config', request).then(() => sendResponse());
            return true;
    }
});

async function fetchItems() {
    const config = await get('config');
    if (!validateConfig(config)) {
        return { error: 'Could not parse config' };
    }
    try {
        const items = JSON.parse(config).map(entry => {
            const { name, secret } = entry;
            return { name, token: getToken(secret) };
        });
        return { items };
    } catch(err) {
        console.error(err);
    }
    return { error: 'Invalid config entry' };
}

async function insertToken() {
    const config = await get('config');
    if (validateConfig(config)) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const matches = JSON.parse(config).filter((item) => {
                return item['auto-fill'].some((host) => doesHostMatch(tabs[0].url, host));
            });
            try {
                const token = getToken(matches[0].secret);
                chrome.tabs.sendMessage(tabs[0].id, token);
            } catch(err) {
                console.error(err);
            }
        });
    }
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
