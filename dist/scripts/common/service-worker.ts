import { ServiceWorkerMessage } from '../../../src/extension.types';


chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "openSidePanel",
    title: "Open Extension",
    contexts: ["all"],
  });
  chrome.tabs.create({ url: "post-installation/post-installation.html" });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "openSidePanel" && tab?.windowId) {
    chrome.sidePanel.open({ windowId: tab.windowId });
  }
});

// ================== linkedin specific ==============
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    chrome.tabs.sendMessage(tabId, {
      action: "urlChanged",
      newUrl: tab.url,
    });
  }
});

chrome.runtime.onMessage.addListener((message: ServiceWorkerMessage, sender) => {
  if (message.action === "print-job-info") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTabId = tabs[0].id;

      if(!activeTabId) return;
      
      chrome.tabs.sendMessage(activeTabId, {
        action: "print-job-info",
        payload: message.payload,
      });
    });
  }
});
