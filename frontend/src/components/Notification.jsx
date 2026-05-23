export default function Notification({ notification }) {
  if (!notification) return null;

  return (
    <div
      className={`notification notification-${notification.type}`}
      role="alert"
      aria-live="polite"
    >
      <span className="notification-icon">
        {notification.type === "success" ? "✅" : "❌"}
      </span>
      <span className="notification-text">{notification.text}</span>
    </div>
  );
}
