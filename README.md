# Chrome Extension for Named Entity Recognition

A Chrome Extension which will highlight all "entities" on a webpage on click, making it significantly easier for you to skim the page quickly.

## Functionality

- Extension runs in the browser, awaiting a button click by the user.
- Once clicked, the extension performs a JavaScript injection which scrapes the webpage for all content within `<p>` tags.
- This text content is relayed to a Flask server, which preprocesses the data into sentence format and feeds into a Named Entity Recognition (NER) model
- The model consists of a bidirectional long short-term memory network (LSTM) -> helps us classify words using context from before AND after.
- Based on model output, the JS injection uses DOM manipulation to highlight words that are determined to be entities (could be places, people, etc).
