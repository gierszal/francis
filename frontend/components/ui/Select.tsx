import { Select } from "antd";

interface SelectProps {
  placeholder?: string;
  onChange?: any;
  className?: string;
  id?: string;
  inputProps?: any;
  ariaInvalid?: any;
  ariaDescribedby?: string;
  onBlur?: any;
  disabled?: boolean;
  defaultValue?: string;
  items: any[];
  value?: unknown;
}

const SelectItems = ({
  className,
  onChange,
  placeholder,
  id,
  inputProps,
  ariaDescribedby,
  ariaInvalid,
  onBlur,
  disabled,
  defaultValue,
  items,
  value,
}: SelectProps) => {
  return (
    // <div className="bg-gray-400/20 w-fit rounded-lg p-1">
    //   <select
    //     multiple={false}
    //     defaultValue={defaultValue}
    //     className={className}
    //     placeholder={placeholder}
    //     onChange={onChange}
    //     id={id}
    //     disabled={disabled ?? false}
    //     aria-invalid={ariaInvalid}
    //     aria-describedby={ariaDescribedby}
    //     onBlur={onBlur}
    //     {...inputProps}
    //   >
    //     <option>Select ...</option>
    //     {items?.map((item) => (
    //       <option value={item?.id} key={item?.id}>
    //         {item.name}
    //       </option>
    //     ))}
    //   </select>
    // </div>
    <Select
      {...inputProps}
      defaultValue={defaultValue}
      id={id}
      value={value}
      disabled={disabled ?? false}
      aria-invalid={ariaInvalid}
      aria-describedby={ariaDescribedby}
      onBlur={onBlur}
      showSearch={{ optionFilterProp: "label" }}
      placeholder={placeholder ?? "Select..."}
      onChange={onChange}
      options={items?.map((item) => ({ value: item?.id, label: item.name }))}
    />
  );
};

export default SelectItems;
