function ProgressBar({ progress }) {

    return (

        <div className="progress-container">

            <div
                className="progress-fill"
                style={{
                    width: `${progress}%`
                }}
            />

            <span>

                {progress}%

            </span>

        </div>

    );

}

export default ProgressBar;