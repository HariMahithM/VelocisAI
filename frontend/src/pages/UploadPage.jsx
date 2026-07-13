import { useState } from "react";
import UploadBox from "../components/UploadBox";

function UploadPage() {

    const [videoURL, setVideoURL] = useState("");
    const [uploadedFile, setUploadedFile] = useState(null);

    return (

        <div className="container">

            <h1 className="title">
                VelocisAI
            </h1>

            <p className="subtitle">
                Intelligent Traffic Speed Monitoring
            </p>

            <UploadBox
                videoURL={videoURL}
                setVideoURL={setVideoURL}
                uploadedFile={uploadedFile}
                setUploadedFile={setUploadedFile}
            />

        </div>

    );

}

export default UploadPage;