import { CheckCircle2, AlertCircle, X } from "lucide-react";

export default function Notification({ notification }) {
  if (!notification) return null;

  const isSuccess = notification.type === "success";

  return (
    <div
      className={`notification-toast ${isSuccess ? "toast-success" : "toast-error"}`}
      role="alert"
      aria-live="polite"
    >
      <div className="toast-icon-wrapper">
        {isSuccess ? (
          <CheckCircle2 size={18} className="toast-icon" />
        ) : (
          <AlertCircle size={18} className="toast-icon" />
        )}
      </div>
      <div className="toast-body">
        <p className="toast-title">{isSuccess ? "Success" : "Error"}</p>
        <p className="toast-message">{notification.text}</p>
      </div>
    </div>
  );
}
