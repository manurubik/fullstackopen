const Notification = ({ message }) => {
  const notificationStyle = {
    color: "green",
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
