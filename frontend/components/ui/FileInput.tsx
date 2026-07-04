import { Button } from "antd";
import { ChangeEvent, useRef, useState } from "react";
import { BsCloudUploadFill, BsPaperclip } from "react-icons/bs";

interface FileInputProps {
  onChange?: any;
  className?: string;
  id?: string;
  inputProps?: any;
  ariaInvalid?: any;
  ariaDescribedby?: string;
  onBlur?: any;
  disabled?: boolean;
  defaultValue?: string;
}

const FileInput = ({
  className,
  onChange,
  id,
  inputProps,
  ariaDescribedby,
  ariaInvalid,
  onBlur,
  disabled,
  defaultValue,
}: FileInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");

  const {
    ref: registerRef,
    onChange: registerChange,
    ...restProps
  } = inputProps;

  const handleClick = () => {
    fileInputRef?.current?.click();
    console.log(fileInputRef?.current?.files?.length);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const fileName = e?.target?.files && e?.target?.files[0].name;
    if (fileName) {
      setFileName(fileName);
      onChange(e);
    }
  };

  return (
    <>
      <input
        style={{ display: "none" }}
        defaultValue={defaultValue}
        className={className}
        type={"file"}
        onChange={(e) => {
          registerChange?.(e);
          handleChange(e);
        }}
        id={id}
        disabled={disabled ?? false}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedby}
        onBlur={onBlur}
        ref={(e) => {
          registerRef?.(e);
          fileInputRef.current = e;
        }}
        {...restProps}
      />
      <div className="flex flex-row gap-3 items-center text-sm">
        <Button icon={<BsCloudUploadFill />} onClick={handleClick}>
          Upload File
        </Button>
        {fileName && (
          <div className="flex flex-row gap-2 items-center">
            <BsPaperclip />
            <p>{fileName}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default FileInput;
