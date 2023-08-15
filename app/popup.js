// Here, we're working in the chrome extension popup, so document refers to popup.html
// We add an event listener to await the button press, and then send a message to the listener in content.js
document.addEventListener('DOMContentLoaded', function() {
  var button = document.getElementById('highlightButton');

  button.addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { action: 'highlightEntities' });
    });
  });
});