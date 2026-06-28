interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string | number | boolean;
  onChange?: any;
  className?: string;
  id?: string;
  checked?: boolean;
  inputProps?: any;
  ariaInvalid?: any;
  ariaDescribedby?: string;
  onBlur?: any;
}

const Input = ({
  className,
  onChange,
  placeholder,
  type,
  value,
  id,
  checked,
  inputProps,
  ariaDescribedby,
  ariaInvalid,
  onBlur,
}: InputProps) => {
  return (
    <input
      className={className}
      type={type ?? "text"}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      id={id}
      checked={checked}
      aria-invalid={ariaInvalid}
      aria-describedby={ariaDescribedby}
      onBlur={onBlur}
      {...inputProps}
    />
  );
};

export default Input;
