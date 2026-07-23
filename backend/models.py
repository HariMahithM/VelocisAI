from database import db

class Detection(db.Model):

    id = db.Column(db.Integer, primary_key=True)

    video_name = db.Column(db.String(200))

    average_speed = db.Column(db.Float)

    max_speed = db.Column(db.Float)

    vehicle_count = db.Column(db.Integer)

    overspeed_count = db.Column(db.Integer)

    created_at = db.Column(db.DateTime,server_default=db.func.now())