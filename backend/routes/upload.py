from flask import Blueprint

upload_bp = Blueprint("upload", __name__)

@upload_bp.route("/upload")
def upload():

    return {
        "message":"Upload Route Ready"
    }