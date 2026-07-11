import React from "react";
import { Button, Flex, notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

const Notification = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (
    type: NotificationType,
    title: string,
    description: string,
  ) => {
    api[type]({
      title: title,
      description: description,
    });
  };
  return { openNotificationWithIcon };
};

export default Notification;
