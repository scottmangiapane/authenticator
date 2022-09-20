chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    document.activeElement.value = request;
    sendResponse();
});
