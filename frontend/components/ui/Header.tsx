import clsx from "clsx";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

const Header = ({ children, className, ariaLabel }: HeaderProps) => {
  return (
    <h1
      aria-label={ariaLabel}
      className={clsx(
        className,
        "cursor-pointer",
        "bg-linear-to-r from-purple-400 to-blue-400",
        "bg-[length:0%_2px] bg-left-bottom bg-no-repeat",
        "hover:bg-[length:100%_2px]",
        "transition-all duration-400 ease-in-out",
      )}
    >
      {children}
    </h1>
  );
};

export default Header;
