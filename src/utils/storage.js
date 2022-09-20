/* global chrome */

export function get(key, fallback) {
    return new Promise((resolve) => {
        if (!chrome?.runtime?.id) {
            resolve(fallback);
        }
        chrome.storage.sync.get([key], (result) => {
            resolve(result[key] || fallback);
        });
    });
}

export function set(key, value) {
    return new Promise((resolve) => {
        if (!chrome?.runtime?.id) {
            resolve();
        }
        chrome.storage.sync.set({ [key]: value }, () => {
            resolve();
        });
    });
}
