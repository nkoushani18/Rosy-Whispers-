from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from journal import add_entry, load_entries

app = Flask(__name__)
CORS(app)

# Route to render the HTML page
@app.route('/')
def index():
    return render_template('johtml.html')

# Route to handle adding entries via POST
@app.route('/add_entry', methods=['POST'])
def add_entry_route():
    data = request.get_json()
    entry_text = data.get('entry', '').strip()  # Get the text from the request
    if entry_text:
        add_entry(entry_text)  # Save the entry to a JSON file
        return jsonify({"status": "success"}), 201
    return jsonify({"status": "error", "message": "No entry text provided"}), 400

# Route to handle fetching entries via GET
@app.route('/get_entries', methods=['GET'])
def get_entries():
    entries = load_entries()  # Load all the saved entries
    return jsonify(entries)

if __name__ == "__main__":
    app.run(debug=True)
