import os
from flask import Blueprint, request, jsonify
from numpy import record
from services.speed_detector import process_video
from models import Detection
from database import db


process_bp = Blueprint("process", __name__)


@process_bp.route("/api/process", methods=["POST"])
def process():

    try:

        data = request.get_json()
        print(data)

        video = data.get("video")
        line1 = data.get("line1")
        line2 = data.get("line2")
        distance = float(data.get("distance"))
        speed_limit = float(data.get("speed_limit"))

        if not video:
            return jsonify({
                "success": False,
                "message": "Video not provided"
            }), 400

        if line1 is None or line2 is None:
            return jsonify({
                "success": False,
                "message": "Lines not provided"
            }), 400

        video_path = os.path.join("uploads", video)

        if not os.path.exists(video_path):
            return jsonify({
                "success": False,
                "message": "Uploaded video not found"
            }), 404

        result = process_video(
            video_path=video_path,
            line1=line1,
            line2=line2,
            distance=distance,
            speed_limit=speed_limit
        )
        record = Detection(

            video_name=video,

            average_speed=result["average_speed"],

            max_speed=result["max_speed"],

            vehicle_count=result["vehicle_count"],

            overspeed_count=result["overspeed_count"]

        )

        db.session.add(record)

        db.session.commit()

        return jsonify({
            "success": True,
            "output_video": result["output_video"],
            "snapshots": result["snapshots"]
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500