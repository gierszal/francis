import { useCallback } from "react";

import Tags from "@yaireo/tagify/react";
import "@yaireo/tagify/dist/tagify.css";

interface TagsBuilderProps {
  onChange?: any;
  className?: string;
  inputProps?: any;
  onBlur?: any;
  disabled?: boolean;
  placeholder?: string;
  value?: unknown;
}

const TagsBuilder = ({
  onChange,
  className,
  inputProps,
  onBlur,
  disabled,
  placeholder,
  value,
}: TagsBuilderProps) => {
  return (
    <Tags
      value={value as string[]}
      className={className}
      onBlur={onBlur}
      disabled={disabled}
      //   whitelist={["item 1", "another item", "item 3"]}
      placeholder={placeholder ?? "Add some tags"}
      settings={{
        blacklist: ["xxx"],
        maxTags: 4,
        dropdown: {
          enabled: 0,
        },
      }}
      onChange={onChange}
    />
  );
};

export default TagsBuilder;
