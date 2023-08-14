# app.py

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


def process_text(text):
    # Process the received text and generate HTML code
    html_code = f'<strong>{text}</strong>'
    print ("modified = " + html_code)
    return html_code

@app.route('/send-text', methods=['POST'])
def receive_text_content():
    data = request.json
    text = data.get('text')
    print("text is: " + text)
    
    # Process the text and generate HTML code
    html_code = process_text(text)

    # Respond with HTML code
    return jsonify({"htmlCode": html_code})

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5001)
