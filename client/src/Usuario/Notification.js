import React, { useEffect } from 'react';

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 2000); // Close the notification after 2 seconds

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div className={`alert alert-${type}`} role="alert">
      {message}
    </div>
  );
};

export default Notification;
