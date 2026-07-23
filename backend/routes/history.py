from flask import Blueprint
from models import Detection

history_bp = Blueprint(
    "history",
    __name__
)

@history_bp.route("/history")

def history():

    data = Detection.query.order_by(
        Detection.created_at.desc()
    ).all()

    result=[]

    for row in data:

        result.append({

            "video":row.video_name,

            "average_speed":row.average_speed,

            "max_speed":row.max_speed,

            "vehicles":row.vehicle_count,

            "overspeed":row.overspeed_count,

            "date":str(row.created_at)

        })

    return result