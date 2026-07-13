import { useState } from "react";
import UploadVideo from "./components/UploadVideo";

function App() {

    const [video,setVideo] = useState("");

    return (

        <div
        style={{
            padding:30
        }}
        >

            <h1>VelocisAI</h1>

            <UploadVideo
                setVideo={setVideo}
            />

            {
                video && (

                    <video
                        controls
                        width="900"
                        src={video}
                    />

                )
            }

        </div>

    );

}

export default App;