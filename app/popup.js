// chrome.action.onClicked.addListener((tab) => {
//   chrome.scripting.executeScript({
//     target: {tabId: tab.id},
//     function: openPopup
//   });
// });

// function openPopup() {
//   // This will send a message to your content script
//   chrome.runtime.sendMessage({ action: "manipulateDOM" });
// }

// document.addEventListener('DOMContentLoaded', function() {
//   var pasteButton = document.getElementById('pasteButton');

//   pasteButton.addEventListener('click', function() {
//     // Insert your custom logic here
//     // For example, display an alert when the button is clicked
//     alert("Button clicked!");
//     chrome.tabs.executeScript(tab.id, { file: 'content.js' }, () => {
//       // After script is executed, send a message to trigger DOM manipulation
//       chrome.runtime.sendMessage({ action: 'manipulateDOM' });
//     });
//   });
// });

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    function: openPopup
  });
});

function openPopup() {
  chrome.runtime.sendMessage({ action: "manipulateDOM" });
}
