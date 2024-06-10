const Notification = ({ message, styles }) => {
  const notificationStyle = {
    color: styles ? "green" : "red",
    background: "lightgrey",
    fontSize: 16,
    borderStyle: "solid",
    borderRadius: 4,
    padding: 5,
  };
  if (message === null) return null;

  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
