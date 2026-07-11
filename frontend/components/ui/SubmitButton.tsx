import clsx from "clsx";

interface SubmitButtonProps {
  onClick?: any;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

const SubmitButton = ({
  children,
  className,
  disabled,
  onClick,
}: SubmitButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "mt-3 w-full rounded-2xl bg-white py-4 font-semibold text-black transition-all hover:bg-zinc-100 hover:scale-[1.01] active:scale-[0.99] cursor-pointer",
        className,
      )}
    >
      {children}
    </button>
  );
};

export default SubmitButton;
