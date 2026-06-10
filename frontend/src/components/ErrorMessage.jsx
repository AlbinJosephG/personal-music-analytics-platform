import "./ErrorMessage.css";

function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="error-card">
      <strong>Error</strong>
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;