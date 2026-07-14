import os
import cv2
import numpy as np
from ultralytics import YOLO

model = YOLO("yolo11x.pt")

os.makedirs("snapshots", exist_ok=True)

def process_video(
    video_path,
    line1,
    line2,
    distance,
    speed_limit
):
    
    line1 = [
        (line1[0]["x"], line1[0]["y"]),
        (line1[1]["x"], line1[1]["y"])
    ]

    line2 = [
        (line2[0]["x"], line2[0]["y"]),
        (line2[1]["x"], line2[1]["y"])
    ]

    MARGIN = 8
    
    LINE_COLOR   = (0, 255, 255)    # Neon Yellow
    BOX_COLOR    = (0, 255, 0)      # Neon Green
    TEXT_COLOR   = (255, 0, 0)    # Bright Yellow
    CENTER_COLOR = (255, 255, 0)    # Pink

    cap = cv2.VideoCapture(video_path)
    fps = cap.get(cv2.CAP_PROP_FPS)
    delay = int(1000 / fps)

    fourcc = cv2.VideoWriter.fourcc(*'mp4v')
    os.makedirs("outputs", exist_ok=True)

    output_path = "outputs/output.mp4"

    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    out = cv2.VideoWriter(
        output_path,
        fourcc,
        fps,
        (width,height)
    )
    frame_id = 0

    saved_vehicles = set()
    snapshots = []


    cross_time = {}
    LINE_Y1 = line1[0][1]
    LINE_Y2 = line2[0][1]
    while True:

        ret, frame = cap.read()
        if not ret:
            break

        frame_id += 1
        results = model.track(
                    # The current video frame on which detection + tracking is performed
                    frame,

                    # persist=True:
                    # Keeps object IDs consistent across frames
                    # (so the same vehicle keeps the same ID while moving)
                    persist=True,

                    # verbose=False:
                    # Disables console logs for every frame
                    # (keeps terminal clean and faster)
                    verbose=False
        )[0]

        cv2.line(frame,tuple(line1[0]),tuple(line1[1]),LINE_COLOR,3)
        cv2.putText(frame, "Line A",
                    (line1[0][0], LINE_Y1 - 12),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7,
                    LINE_COLOR, 2)

        cv2.line(frame,tuple(line2[0]),tuple(line2[1]),LINE_COLOR,3)
        cv2.putText(frame, "Line B",
                    (line2[0][0], LINE_Y2 - 12),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7,
                    LINE_COLOR, 2)

        if results.boxes is not None:

            for box in results.boxes:

                # STEP 10.1 : FILTER VEHICLE CLASSES
                cls = int(box.cls[0])

                # COCO IDs: car=2, motorcycle=3, bus=5, truck=7
                if cls not in [2, 3, 5, 7]:
                    continue


                # STEP 10.2 : BOUNDING BOX
                x1, y1, x2, y2 = map(int, box.xyxy[0])


                # STEP 10.3 : TRACKING ID
                if box.id is None:
                    continue

                track_id = int(box.id[0])


                # STEP 11 : CENTER POINT
                cx = (x1 + x2) // 2
                cy = (y1 + y2) // 2


                # STEP 12 : INITIALIZE TRACK ENTRY
                if track_id not in cross_time:
                    cross_time[track_id] = {
                        "A": None,
                        "B": None,
                        "speed": None
                    }


                # ---- Line A ----
                # cross_time[3]["A"] = None  → object ID 3 has not crossed Line A before
                if cross_time[track_id]["A"] is None:

                    # Define the crossing tolerance range around Line A
                    # Suppose:
                    # LINE_Y1 = 300   → Y-position of Line A
                    # MARGIN  = 8     → allowed error margin
                    #
                    # Lower bound = LINE_Y1 - MARGIN = 300 - 8 = 292
                    # Upper bound = LINE_Y1 + MARGIN = 300 + 8 = 308
                    #
                    # So valid crossing range becomes: 292 ≤ cy ≤ 308
                    if (LINE_Y1 - MARGIN) <= cy <= (LINE_Y1 + MARGIN):
                        cross_time[track_id]["A"] = frame_id

                # ---- Line B ----
                if cross_time[track_id]["A"] is not None and cross_time[track_id]["B"] is None:

                    if (LINE_Y2 - MARGIN) <= cy <= (LINE_Y2 + MARGIN):
                        cross_time[track_id]["B"] = frame_id

                        # STEP 14 : SPEED CALCULATION
                        f1 = cross_time[track_id]["A"]
                        f2 = cross_time[track_id]["B"]

                        time_s = (f2 - f1) / fps
                        if time_s > 0:
                            speed = (distance / time_s) * 3.6
                            cross_time[track_id]["speed"] = speed
                            if speed > speed_limit and track_id not in saved_vehicles:

                                saved_vehicles.add(track_id)

                                snapshot = frame[y1:y2, x1:x2]

                                timestamp = frame_id / fps

                                filename = f"snapshots/vehicle_{track_id}_{speed:.1f}_{timestamp:.2f}.jpg"

                                cv2.imwrite(filename, snapshot)

                                snapshots.append({
                                    "vehicle_id": track_id,
                                    "speed": round(speed, 1),
                                    "timestamp": round(timestamp, 2),
                                    "image": filename
                                })


                # ------------------------------------------------
                # STEP 15 : DRAW RESULTS
                # ------------------------------------------------
                cv2.rectangle(frame, (x1, y1), (x2, y2), BOX_COLOR, 3)

                label = f"ID {track_id}"
                
                color =TEXT_COLOR
                if cross_time[track_id]["speed"] is not None:
                    label = f"{cross_time[track_id]['speed']:.1f} km/h"
                    color = (0,0,255)

                cv2.putText(frame, label,
                            (x1, y1 - 10),
                            cv2.FONT_HERSHEY_SIMPLEX,
                            0.8, color, 2)

                cv2.circle(frame, (cx, cy), 6, CENTER_COLOR, -1)
                color = TEXT_COLOR

        out.write(frame)

    cap.release()
    out.release()

    return {
    "output_video": output_path,
    "snapshots": snapshots
    }