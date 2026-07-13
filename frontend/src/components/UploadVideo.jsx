import { useState } from "react";
import api from "../services/api";

function UploadVideo({ setVideo }) {

    const [file, setFile] = useState(null);

    const uploadVideo = async () => {

        if (!file) {
            alert("Select a video");
            return;
        }

        const formData = new FormData();

        formData.append(
            "video",
            file
        );

        try {

            const res = await api.post(
                "/upload",
                formData,
                {
                    headers: {
                        "Content-Type":
                        "multipart/form-data"
                    }
                }
            );

            setVideo(
    "http://localhost:5000/uploads/" +
    res.data.filename
);

            alert("Upload Successful");

        }

        catch(err){

            alert(err.response.data.message);

        }

    };

    return (

        <div>

            <input
                type="file"
                accept="video/*"
                onChange={(e)=>
                    setFile(e.target.files[0])
                }
            />

            <button
                onClick={uploadVideo}
            >
                Upload
            </button>

        </div>

    );

}

export default UploadVideo;