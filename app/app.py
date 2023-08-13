# app.py

from flask import Flask, request, jsonify

app = Flask(__name__)

def process_text(text):
    # Process the received text and generate HTML code
    # For demonstration, let's just wrap the text in a <strong> tag
    html_code = f'<strong>{text}</strong>'
    return html_code

@app.route('/send-text', methods=['POST'])
def receive_text_content():
    data = request.json
    text = data.get('text')
    
    # Process the text and generate HTML code
    html_code = process_text(text)

    # Respond with HTML code
    return jsonify({"htmlCode": html_code})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
