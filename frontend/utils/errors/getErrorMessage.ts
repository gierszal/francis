import { isAxiosError } from "axios";

export const getErrorMessage = (error: unknown): string => {
  if (isAxiosError(error)) {
    const serverMessage = error?.response?.data?.message;

    switch (error.response?.status) {
      case 401:
        return "Please sign in to continue.";
      case 403:
        return "You don't have access to this content.";
      case 404:
        return "This content doesn't exist or was removed.";
      case 500:
        return "Server error. Please try again later.";
      default:
        return "Something went wrong. Please try again.";
    }
  }
  return "Unexpected error occurred!";
};
