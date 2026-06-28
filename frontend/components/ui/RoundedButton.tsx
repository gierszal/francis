import clsx from "clsx";

interface RoundedButtonProps {
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: any;
  children: React.ReactNode;
}

const RoundedButton = ({
  className,
  onClick,
  type = "submit",
  children,
}: RoundedButtonProps) => {
  return (
    <button
      className={clsx(
        className,
        "cursor-pointer",
        "inline-flex items-center justify-center",
        "h-9 px-4",
        "rounded-full",
        "border border-gray-300",
        "bg-gray-200/50",
        "text-sm font-medium font-sans text-gray-700",
        "transition-colors duration-300",
        "hover:bg-gray-200",
        "hover:border-gray-400",
        "transform active:scale-95",
      )}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default RoundedButton;
