from flask import Blueprint, request, jsonify
import cv2
import os

frame_bp = Blueprint("frame", __name__)

UPLOAD_FOLDER = "uploads"
FRAME_FOLDER = "frames"

os.makedirs(FRAME_FOLDER, exist_ok=True)

@frame_bp.route("/api/extract-frame", methods=["POST"])
def extract_frame():

    data = request.get_json()

    filename = data["filename"]

    video_path = os.path.join(UPLOAD_FOLDER, filename)

    cap = cv2.VideoCapture(video_path)

    success, frame = cap.read()

    cap.release()

    if not success:
        return jsonify({
            "success": False,
            "message": "Unable to read video"
        }), 400

    frame_name = "frame.jpg"

    frame_path = os.path.join(FRAME_FOLDER, frame_name)

    cv2.imwrite(frame_path, frame)

    return jsonify({
        "success": True,
        "frame": frame_name
    })