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
  disabled?: boolean;
  defaultValue?: string;
  dataTestId?: string;
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
  disabled,
  defaultValue,
  dataTestId,
}: InputProps) => {
  return (
    <input
      data-testid={dataTestId}
      defaultValue={defaultValue}
      className={className}
      type={type ?? "text"}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      id={id}
      disabled={disabled ?? false}
      checked={checked}
      aria-invalid={ariaInvalid}
      aria-describedby={ariaDescribedby}
      onBlur={onBlur}
      {...inputProps}
    />
  );
};

export default Input;
