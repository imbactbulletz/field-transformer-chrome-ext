"use strict";

chrome.storage.sync.get('isExtensionEnabled', function (data) {
    let isExtensionEnabled = data.isExtensionEnabled;

    if(isExtensionEnabled === true) {
        // modify current DOM
        transformInputFields();
        // also modify whenever it changes
        document.addEventListener('DOMNodeInserted', transformInputFields)
    }
});

function transformInputFields() {
    $("input[type='password']").prop('type', 'text')
}