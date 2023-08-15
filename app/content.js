// Apply the received HTML code to the node (replace the content)
function applyHtmlToNode(node, htmlCode) {
  node.innerHTML = htmlCode;
}

// Send text to python server in JSON format and handle the response
function sendTextToPython(text, node) {
  fetch('http://localhost:5001/send-text', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  })
  .then(response => response.json())
  .then(data => {
    applyHtmlToNode(node, data.htmlCode); // Apply HTML code to the node
  })
  .catch(error => {
    alert("ERROR COMMUNICATING WITH PYTHON SERVER ");
  });
}

// Highlight entities recognized by our NER model on the webpage
function highlightEntities() {
  // Gather text content from HTML nodes
  const nodes = document.getElementsByTagName("p");
  if (nodes.length == 0) {
    alert("Was unable to find any <p> tags on this page. Currently, only text within <p> tags is supported :)");
  }
  for (const node of nodes) {
    const text = node.textContent;
    sendTextToPython(text, node); // Pass the node as an argument
  }
}

// Listen for notification that the button has been pressed
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'highlightEntities') {
    highlightEntities();
  }
});