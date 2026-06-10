import "./ProgressLoader.css";

function ProgressLoader({ progress, message }) {
  return (
    <div className="progress-loader-card">
      <div className="progress-loader-header">
        <h3>{message}</h3>
        <strong>{progress}%</strong>
      </div>

      <div className="progress-bar-bg">
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressLoader;