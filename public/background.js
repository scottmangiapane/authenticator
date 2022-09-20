function totp(secret) {
    return '123456';
}

function insertText(index) {
    chrome.storage.sync.get(['config'], (result) => {
        try {
            const parsedConfig = JSON.parse(result['config']);
            const token = totp(parsedConfig[index].secret);
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, token);
            });
        } catch {}
    });
}

chrome.commands.onCommand.addListener((command) => {
    const [, index] = /insert-text-(\d+)/.exec(command);
    if (index) {
        insertText(index);
    }
});
