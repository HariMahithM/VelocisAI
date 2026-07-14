from flask import Flask, send_from_directory
from flask_cors import CORS

from routes.process import process_bp
from routes.upload import upload_bp
from routes.frame import frame_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(upload_bp)
app.register_blueprint(frame_bp)
app.register_blueprint(process_bp)

@app.route("/")
def home():
    return {
        "message": "VelocisAI Backend Running"
    }


@app.route("/uploads/<filename>")
def uploads(filename):
    return send_from_directory("uploads", filename)


@app.route("/frames/<filename>")
def frames(filename):
    return send_from_directory("frames", filename)

@app.route("/outputs/<filename>")
def outputs(filename):
    return send_from_directory("outputs", filename)


@app.route("/snapshots/<filename>")
def snapshots(filename):
    return send_from_directory("snapshots", filename)


if __name__ == "__main__":
    app.run(debug=True)