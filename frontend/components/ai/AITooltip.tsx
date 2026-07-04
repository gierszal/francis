"use client";

import { useAskAI } from "@/hooks/modules/ai/useAi";
import { useQueryClient } from "@tanstack/react-query";
import { Button, notification, Popconfirm, Spin, Tooltip } from "antd";
import { useEffect, useState } from "react";
import {
  FieldPath,
  FieldValues,
  useFormContext,
  UseFormSetValue,
} from "react-hook-form";
import { BsArrowRepeat } from "react-icons/bs";

interface AITooltipProps<T extends FieldValues> {
  topic: string;
  item: any;
  fieldName?: FieldPath<T>;
  setValue: UseFormSetValue<T>;
}

const isItemEmpty = (item: any) => {
  return Object.keys(item).every(
    (key) => item[key] === "" || item[key] === undefined || item[key] === null,
  );
};

const AITooltip = <T extends FieldValues>({
  item,
  topic,
  fieldName = "description" as FieldPath<T>, // пока только description
  setValue,
}: AITooltipProps<T>) => {
  const [isEnable, setIsEnable] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [hasResponse, setHasResponse] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    isFetched,
    isRefetching,
    refetch,
    isFetching,
  } = useAskAI(topic, item, isEnable);

  const handleClick = () => {
    if (isItemEmpty(item))
      notification.error({
        title:
          "No fields provided! Write down something to get pricise response!",
      });
    else if (!topic)
      notification.error({
        title: "No topic provided!",
      });
    else {
      setHasResponse(false);
      setIsEnable(true);
    }
  };

  const closeTooltip = () => {
    queryClient.removeQueries({ queryKey: ["ai", { topic }] });
    setHasResponse(false);
    setShowTooltip(false);
    setIsEnable(false);
  };

  const saveResponse = () => {
    setValue(fieldName, data?.data.response);
    closeTooltip();
  };

  useEffect(() => {
    if (isSuccess && data?.data.response) {
      setIsEnable(false);
      setHasResponse(true);
      setShowTooltip(true);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (isError) setShowTooltip(true);
  }, [isError]);

  const mayRefetch = hasResponse && !isLoading && !isFetching;

  return (
    <div className="flex items-center gap-2">
      <Tooltip
        open={showTooltip && !isFetching && !isLoading}
        onOpenChange={setShowTooltip}
        trigger={[]}
        arrow={false}
        placement="top"
        color={"white"}
        title={
          <div className="w-full max-w-sm">
            {isError && (
              <div className="flex flex-col p-3 gap-2">
                <p className="font-bold text-red-400">
                  Error occured while trying quering AI
                </p>
                <p className="text-sm text-gray-500">
                  You may try again or close the window
                </p>
                <Button
                  onClick={closeTooltip}
                  className="mt-2"
                  size="small"
                  danger
                >
                  Close
                </Button>
              </div>
            )}
            {!isError && hasResponse && (
              <div className="p-3">
                <h2 className="text-md font-semibold">AI response:</h2>
                <p className="mt-3 text-gray-700">{data.data.response}</p>
                <div className="flex flex-row gap-3 mt-5 mb-2">
                  <Button size="small" type="primary" onClick={saveResponse}>
                    Accept
                  </Button>
                  <Button size="small" onClick={closeTooltip}>
                    Close
                  </Button>
                </div>
              </div>
            )}
          </div>
        }
      >
        {mayRefetch ? (
          <Button
            type="primary"
            disabled={isRefetching}
            onClick={() => refetch()}
            loading={isLoading}
            className="flex items-center gap-2 border-1 border-black"
            color="orange"
            variant="filled"
            icon={<BsArrowRepeat />}
          >
            Refetch
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={handleClick}
            loading={isLoading}
            disabled={isLoading || isRefetching}
            className="flex items-center gap-2"
          >
            {isLoading || isRefetching ? "Generating..." : "Generate"}
          </Button>
        )}
      </Tooltip>
    </div>
  );
};

export default AITooltip;
