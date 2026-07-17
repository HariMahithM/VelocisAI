function DownloadButtons({ video }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        marginTop: "30px",
      }}
    >
      <a
        href={`http://localhost:5000/${video}`}
        download
      >
        <button>Download Video</button>
      </a>

      <button>
        Download PDF
      </button>
    </div>
  );
}

export default DownloadButtons;