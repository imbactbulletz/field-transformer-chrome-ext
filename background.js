"use strict";

chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({isExtensionEnabled: true});
});

chrome.browserAction.onClicked.addListener(onIconClicked);

function onIconClicked() {
    chrome.storage.sync.get('isExtensionEnabled', function (data) {
        const previousState = data.isExtensionEnabled;
        const currentState = !previousState;

        chrome.storage.sync.set({isExtensionEnabled: currentState});

        if (currentState) {
            changeIcon(true);
            chrome.tabs.query({currentWindow: true}, function (tabs) {
                for(let i = 0; i < tabs.length; i++) {
                    chrome.tabs.sendMessage(tabs[i].id, {isExtensionEnabled: true})
                }
            });
        } else {
            changeIcon( false);
            chrome.tabs.query({currentWindow: true}, function (tabs) {
                for(let i = 0; i < tabs.length; i++) {
                    chrome.tabs.sendMessage(tabs[i].id, {isExtensionEnabled: false})
                }
            });
        }
    })
}

function changeIcon(selectedState) {
    let iconPath = "./icons/icon_";
    let iconExtension = ".png";

    if (selectedState === true) {
        iconPath += "active_128";
    } else {
        iconPath += "inactive_128";
    }

    iconPath += iconExtension;
    chrome.browserAction.setIcon({
        path: iconPath
    })
}