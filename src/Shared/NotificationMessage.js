import React from 'react';
import { notification } from 'antd';

const openNotificationWithIcon = type => {
  notification[type]({
    message: 'Notification Title',
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
  });
};

const NotificationMessage = props => {
  return openNotificationWithIcon("success");
};

export default NotificationMessage;