from flask import Flask, send_from_directory
from flask_cors import CORS
from routes.upload import upload_bp
import os

app = Flask(__name__)
CORS(app)

app.register_blueprint(upload_bp)

UPLOAD_FOLDER = "uploads"

@app.route("/")
def home():
    return {"message": "VelocisAI Backend Running"}

@app.route("/uploads/<path:filename>")
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

if __name__ == "__main__":
    app.run(debug=True)