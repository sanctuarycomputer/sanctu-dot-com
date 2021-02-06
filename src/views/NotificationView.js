import React from 'react';

const Style = {
  height: '100%',
  width: '100%',
  position: 'fixed',
  border: 0,
  margin: 0,
  padding: 0,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 9999
};

const NotificationView = () => {
  return (
    <iframe
      title="BLM Resource Embed"
      src="https://sanctuarycomputer.github.io/blm-resource-embed/iframe.html"
      style={Style}
    ></iframe>
  );
};

export default NotificationView;
