import { notification } from "antd";
import { useGetUser } from "../user/useUser";
import { useTranslations } from "next-intl";

export const useRequireActivated = () => {
  const t = useTranslations("hooks.useRequireActivated");
  const { data } = useGetUser();
  const user = data?.data?.data;

  const isActivated = !!user?.is_activated;

  const requireActivated = (action: () => void) => {
    if (!user) {
      notification.warning({
        title: t("signInTitle"),
        description: t("signInDescription"),
      });
      return false;
    }
    if (!isActivated) {
      notification.warning({
        title: t("verifyTitle"),
        description: t("verifyDescription"),
      });
      return false;
    }
    action();
    return true;
  };
  return { isActivated, requireActivated };
};
