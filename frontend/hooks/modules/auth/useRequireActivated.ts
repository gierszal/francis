import { notification } from "antd";
import { useGetUser } from "../user/useUser";

export const useRequireActivated = () => {
  const { data } = useGetUser();
  const user = data?.data?.data;

  const isActivated = !!user?.is_activated;

  const requireActivated = (action: () => void) => {
    if (!user) {
      notification.warning({
        title: "Sign in first!",
        description: "Sign in to get more features!",
      });
      return false;
    }
    if (!isActivated) {
      notification.warning({
        title: "Verify your profile!",
        description:
          "Visit Profile page and verify your email address to unlock this feature.",
      });
      return false;
    }
    action();
    return true;
  };
  return { isActivated, requireActivated };
};
