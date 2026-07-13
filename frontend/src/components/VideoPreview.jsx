function VideoPreview({ videoURL }) {

    if (!videoURL) {

        return (

            <div className="preview-empty">

                No Preview Available

            </div>

        );

    }

    return (

        <video
            className="preview"
            controls
            src={videoURL}
        />

    );

}

export default VideoPreview;