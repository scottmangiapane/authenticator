function isEditable(element) {
    return element && !element.readOnly && !element.disabled
        && ['input', 'textarea'].includes(element.tagName.toLowerCase());
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const element = document.activeElement;
    if (isEditable(element)) {
        element.value = request;
    }
    sendResponse();
});
