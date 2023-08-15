# app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import re

import process_text as pt

app = Flask(__name__)
CORS(app)


@app.route('/send-text', methods=['POST'])
def receive_text_content():
    data = request.json
    text = data.get('text')

    # Process the text and generate HTML code
    html_code = pt.process_text(text)
    
    # Respond with HTML code
    return jsonify({"htmlCode": html_code})

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5001)
