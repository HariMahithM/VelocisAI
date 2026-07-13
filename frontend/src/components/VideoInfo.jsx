function formatSize(size){

    return (size/(1024*1024)).toFixed(2)+" MB";

}

function VideoInfo({file,metadata}){

    if(!file) return null;

    return(

        <div className="video-info">

            <h3>

                {file.name}

            </h3>

            <p>

                📦 {formatSize(file.size)}

            </p>

            {

                metadata &&

                <>

                    <p>

                        🎥 {metadata.width} × {metadata.height}

                    </p>

                    <p>

                        ⏱ {metadata.duration.toFixed(1)} sec

                    </p>

                </>

            }

        </div>

    );

}

export default VideoInfo;