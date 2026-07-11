/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";

import { SignInForm } from "@/components/auth/SignInForm";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockRouterReplace = jest.fn();
const mockMutate = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mockRouterReplace,
    push: jest.fn(),
  }),
  useSearchParams: () => ({
    get: (key: string) => {
      if (key === "callbackUrl") return "/dashboard";
      return null;
    },
  }),
}));

jest.mock("next-intl", () => ({
  useTranslations: (namespace: string) => (key: string) => {
    return `${namespace}.${key}`;
  },
}));

jest.mock("@/hooks/modules/auth/useAuth", () => ({
  useSignIn: () => ({
    mutate: mockMutate,
    isError: false,
    error: null,
  }),
}));

const t = (key: string) => `components.SignInForm.${key}`;

describe("SignInForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("email, password and submit button rendered successfully", () => {
    render(<SignInForm />);
    expect(
      screen.getByPlaceholderText(t("emailPlaceholder")),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(t("passwordPlaceholder")),
    ).toBeInTheDocument();
  });

  it("password is not visible by default, toggle on icon", async () => {
    render(<SignInForm />);

    const passwordInput = screen.getByPlaceholderText(
      t("passwordPlaceholder"),
    ) as HTMLInputElement;

    const getToggleIcon = () =>
      passwordInput.parentElement?.querySelector("svg:last-of-type") as Element;

    expect(passwordInput.type).toBe("password");

    fireEvent.click(getToggleIcon());
    expect(passwordInput.type).toBe("text");

    fireEvent.click(getToggleIcon());
    expect(passwordInput.type).toBe("password");
  });

  it("should show errors if empty form sent", async () => {
    render(<SignInForm />);
    const submitButton = screen.getByRole("button", { name: t("submit") });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText(t("emailPlaceholder")),
      ).toHaveAttribute("aria-invalid", "true");
    });

    expect(
      screen.getByPlaceholderText(t("passwordPlaceholder")),
    ).toHaveAttribute("aria-invalid", "true");

    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("should proceed to sign in if data is valid", async () => {
    const user = userEvent.setup();
    render(<SignInForm />);

    await user.type(
      screen.getByPlaceholderText(t("emailPlaceholder")),
      "test@example.com",
    );
    await user.type(
      screen.getByPlaceholderText(t("passwordPlaceholder")),
      "1111",
    );

    await user.click(screen.getByRole("button", { name: t("submit") }));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledTimes(1);
    });

    expect(mockMutate).toHaveBeenCalledWith(
      {
        email: "test@example.com",
        password: "1111",
      },
      expect.objectContaining({ onSuccess: expect.any(Function) }),
    );
  });

  it("should redirect to callback link if successfully sign in", async () => {
    const user = userEvent.setup();
    render(<SignInForm />);

    await user.type(
      screen.getByPlaceholderText(t("emailPlaceholder")),
      "test@example.com",
    );
    await user.type(
      screen.getByPlaceholderText(t("passwordPlaceholder")),
      "Password123!",
    );
    await user.click(screen.getByRole("button", { name: t("submit") }));

    await waitFor(() => expect(mockMutate).toHaveBeenCalledTimes(1));

    // достаём onSuccess колбэк, который передали в mutate, и дёргаем его руками
    const onSuccess = mockMutate.mock.calls[0][1].onSuccess;
    onSuccess();

    expect(mockRouterReplace).toHaveBeenCalledWith("/dashboard");
  });
});
