// content.js

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
    console.log('Response from Python:', data);
    alert(data.htmlCode);
    applyHtmlToNode(node, data.htmlCode); // Apply HTML code to the node
  })
  .catch(error => {
    alert("ERROR: ", error);
    console.error('Error communicating with Python:', error);
  });
}

function applyHtmlToNode(node, htmlCode) {
  // Apply the received HTML code to the node (replace the content)
  node.innerHTML = htmlCode;
}

// Gather text content from HTML nodes
const nodes = document.getElementsByTagName("p");
alert("nodes.length = " + nodes.length);
for (const node of nodes) {
  alert("trying on: " + node.textContent);
  const text = node.textContent;
  sendTextToPython(text, node); // Pass the node as an argument
}
