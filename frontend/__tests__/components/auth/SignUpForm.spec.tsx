import "@testing-library/jest-dom";

import { SignUpForm } from "@/components/auth/SignUpForm";
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
    get: (key: string) => (key === "callbackUrl" ? "/dashboard" : null),
  }),
}));

jest.mock("next-intl", () => ({
  useTranslations: (namespace: string) => (key: string) =>
    `${namespace}.${key}`,
}));

jest.mock("@/hooks/modules/auth/useAuth", () => ({
  useSignUp: () => ({
    mutate: mockMutate,
    isError: false,
    error: null,
  }),
  useSignIn: () => ({
    mutate: jest.fn(),
    isError: false,
    error: null,
  }),
}));

const t = (key: string) => `components.SignUpForm.${key}`;

const fillValidForm = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByPlaceholderText(t("firstNamePlaceholder")), "ye");
  await user.type(screen.getByPlaceholderText(t("lastNamePlaceholder")), "ye");
  await user.type(
    screen.getByPlaceholderText(t("emailPlaceholder")),
    "ye@example.com",
  );
  await user.type(
    screen.getByPlaceholderText(t("passwordPlaceholder")),
    "1111",
  );
  await user.type(
    screen.getByPlaceholderText(t("confirmPasswordPlaceholder")),
    "1111",
  );
  await user.click(screen.getByLabelText(t("agreeLabel")));
};

describe("SignUpForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render all fields and submit button", () => {
    render(<SignUpForm />);

    expect(
      screen.getByPlaceholderText(t("firstNamePlaceholder")),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(t("lastNamePlaceholder")),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(t("emailPlaceholder")),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(t("passwordPlaceholder")),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(t("confirmPasswordPlaceholder")),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(t("agreeLabel"))).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: t("submit") }),
    ).toBeInTheDocument();
  });

  it("both password field hidden by default", () => {
    render(<SignUpForm />);

    const password = screen.getByPlaceholderText(
      t("passwordPlaceholder"),
    ) as HTMLInputElement;
    const confirmPassword = screen.getByPlaceholderText(
      t("confirmPasswordPlaceholder"),
    ) as HTMLInputElement;

    expect(password.type).toBe("password");
    expect(confirmPassword.type).toBe("password");
  });

  it("should change visibility of two password inputs by one click", () => {
    render(<SignUpForm />);

    const password = screen.getByPlaceholderText(
      t("passwordPlaceholder"),
    ) as HTMLInputElement;
    const confirmPassword = screen.getByPlaceholderText(
      t("confirmPasswordPlaceholder"),
    ) as HTMLInputElement;

    fireEvent.click(screen.getByTestId("toggle-password-visibility"));

    expect(password.type).toBe("text");
    expect(confirmPassword.type).toBe("text");

    fireEvent.click(screen.getByTestId("toggle-confirmPassword-visibility"));

    expect(password.type).toBe("password");
    expect(confirmPassword.type).toBe("password");
  });

  it("should throw errors if form with empty data sent", async () => {
    render(<SignUpForm />);

    fireEvent.click(screen.getByRole("button", { name: t("submit") }));

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText(t("firstNamePlaceholder")),
      ).toHaveAttribute("aria-invalid", "true");
    });

    expect(
      screen.getByPlaceholderText(t("lastNamePlaceholder")),
    ).toHaveAttribute("aria-invalid", "false");
    expect(screen.getByPlaceholderText(t("emailPlaceholder"))).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(
      screen.getByPlaceholderText(t("passwordPlaceholder")),
    ).toHaveAttribute("aria-invalid", "true");
    expect(
      screen.getByPlaceholderText(t("confirmPasswordPlaceholder")),
    ).toHaveAttribute("aria-invalid", "false");

    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("should not proceed further if passwords do not match", async () => {
    const user = userEvent.setup();
    render(<SignUpForm />);

    await user.type(
      screen.getByPlaceholderText(t("firstNamePlaceholder")),
      "ye",
    );
    await user.type(
      screen.getByPlaceholderText(t("lastNamePlaceholder")),
      "ye",
    );
    await user.type(
      screen.getByPlaceholderText(t("emailPlaceholder")),
      "ye@example.com",
    );
    await user.type(
      screen.getByPlaceholderText(t("passwordPlaceholder")),
      "1111",
    );
    await user.type(
      screen.getByPlaceholderText(t("confirmPasswordPlaceholder")),
      "2222",
    );
    await user.click(screen.getByLabelText(t("agreeLabel")));
    await user.click(screen.getByRole("button", { name: t("submit") }));

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText(t("confirmPasswordPlaceholder")),
      ).toHaveAttribute("aria-invalid", "true");
    });

    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("should not proceed further if user did not agree", async () => {
    const user = userEvent.setup();
    render(<SignUpForm />);

    await user.type(
      screen.getByPlaceholderText(t("firstNamePlaceholder")),
      "ye",
    );
    await user.type(
      screen.getByPlaceholderText(t("lastNamePlaceholder")),
      "ye",
    );
    await user.type(
      screen.getByPlaceholderText(t("emailPlaceholder")),
      "ye@example.com",
    );
    await user.type(
      screen.getByPlaceholderText(t("passwordPlaceholder")),
      "1111",
    );
    await user.type(
      screen.getByPlaceholderText(t("confirmPasswordPlaceholder")),
      "1111",
    );

    await user.click(screen.getByRole("button", { name: t("submit") }));

    await waitFor(() => {
      expect(screen.getByTestId("agree-checkbox")).toHaveAttribute(
        "aria-invalid",
        "true",
      );
      expect(mockMutate).not.toHaveBeenCalled();
    });
  });

  it("should proceed if form was filled with correct data", async () => {
    const user = userEvent.setup();
    render(<SignUpForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: t("submit") }));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledTimes(1);
    });

    const [submittedData, options] = mockMutate.mock.calls[0];

    expect(submittedData).toEqual(
      expect.objectContaining({
        firstName: "ye",
        lastName: "ye",
        email: "ye@example.com",
        password: "1111",
        confirmPassword: "1111",
        agree: true,
      }),
    );
    expect(options.onSuccess).toEqual(expect.any(Function));
  });

  it("should redirect on callback url if registration was successful", async () => {
    const user = userEvent.setup();
    render(<SignUpForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: t("submit") }));

    await waitFor(() => expect(mockMutate).toHaveBeenCalledTimes(1));

    const [, options] = mockMutate.mock.calls[0];
    options.onSuccess();

    expect(mockRouterReplace).toHaveBeenCalledWith("/dashboard");
  });
});
