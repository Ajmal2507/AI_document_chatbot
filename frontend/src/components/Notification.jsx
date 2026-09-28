import { CheckCircle2, AlertCircle } from "lucide-react";

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
          <CheckCircle2 size={16} className="text-success" />
        ) : (
          <AlertCircle size={16} className="text-danger" />
        )}
      </div>
      <div className="toast-body">
        <p className="toast-title">{isSuccess ? "System Notification" : "Error Occurred"}</p>
        <p className="toast-message">{notification.text}</p>
      </div>
    </div>
  );
}
