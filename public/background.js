import { TOTP } from './lib/otpauth.esm.min.js';
import validateConfig from './utils/config-validator.js';
import exampleConfig from './utils/example-config.js';
import { get, set } from './utils/storage.js';

chrome.commands.onCommand.addListener((command) => {
    if (command === 'insert-token') {
        insertToken();
    }
});

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

chrome.runtime.onMessage.addListener(({ action, request }, sender, sendResponse) => {
    switch (action) {
        case 'fetch-items':
            fetchItems(request).then((response) => sendResponse(response));
            return true;
        case 'get-config':
            get('config', exampleConfig).then((config) => sendResponse(config));
        case 'set-config':
            set('config', request).then(() => updateBadge() && sendResponse());
            return true;
    }
});

async function fetchItems() {
    const config = await get('config', exampleConfig);
    if (!validateConfig(config)) {
        return { error: 'Could not parse config' };
    }
    try {
        const items = JSON.parse(config).map(entry => {
            const { name, secret } = entry;
            return { name, token: getToken(secret) };
        });
        if (!items.length) {
            return { error: 'Config is empty' };
        }
        return { items };
    } catch(err) {
        console.error(err);
    }
    return { error: 'Invalid config entry' };
}

chrome.tabs.onActivated.addListener(updateBadge);
chrome.tabs.onUpdated.addListener(updateBadge);

function updateBadge() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (!tab) return;
        countItems(tab).then((count) => {
            chrome.action.setBadgeText({ text: '' + (count || ''), tabId: tab.id });
        });
    });
}

async function countItems(tab) {
    try {
        const config = await get('config', exampleConfig);
        if (validateConfig(config)) {
            return JSON.parse(config).filter((item) => {
                return item['auto-fill'].some((host) => doesHostMatch(tab.url, host));
            }).length;
        }
    } catch {}
    return 0;
}
