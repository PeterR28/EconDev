from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/hello', methods=['GET'])
def hello_world():
    return jsonify(message="Hello, World from Flask!")

if __name__ == '__main__':
    app.run(debug=True)